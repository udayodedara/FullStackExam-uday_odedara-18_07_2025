import { Request, Response } from 'express';
import * as orderService from '../services/order.service';
import { AuthRequest } from '../middleware/auth.middleware';
import * as orderItemService from '../services/orderItem.service';
import * as productService from '../services/product.service';
import { IProduct } from '../models/Product';

interface IOrderItems {
  product_id: string;
  quantity: number;
}

interface IProductWithQuantity extends IProduct {
  quantity: number;
}

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const { order_items }: { order_items: IOrderItems[] } = req.body;

    const products: IProductWithQuantity[] = [];
    for (const item of order_items) {
      const product = await productService.getProductById(item.product_id);
      products.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        quantity: item.quantity,
        description: product.description,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });
    }

    const total_amount = products.reduce((acc, product) => {
      const productPrice = product.price * product.quantity;
      return acc + productPrice;
    }, 0);

    const status = 'Success';

    const order = await orderService.createOrder({
      user_id: userId,
      status,
      total_amount,
    });

    for (const item of products) {
      await orderItemService.createOrderItem({
        order_id: order.id,
        product_id: item._id.toString(),
        quantity: item.quantity,
        price: item.price,
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

export const getOrderList = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const orders = await orderService.getOrderList(userId);
    if (orders.length === 0) {
      res.status(404).json({ message: 'No orders found' });
      return;
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order list', error });
  }
};
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    const orderItems = await orderItemService.getOrderItemByOrderId(req.params.id);
    const products = await Promise.all(
      orderItems.map(async (item) => {
        const product = await productService.getProductById(item.product_id);
        return product;
      })
    );
    res.status(200).json({ order, orderItems, products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await orderService.deleteOrder(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};
