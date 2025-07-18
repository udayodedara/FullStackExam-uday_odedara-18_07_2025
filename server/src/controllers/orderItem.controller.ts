import { Request, Response } from 'express';
import * as orderItemService from '../services/orderItem.service';

export const createOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = await orderItemService.createOrderItem(req.body);
    res.status(201).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order item', error });
  }
};

export const getOrderItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = await orderItemService.getOrderItemById(req.params.id);
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order item', error });
  }
};

export const getOrderItemByOrderId = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = await orderItemService.getOrderItemByOrderId(req.params.orderId);
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order item', error });
  }
};

export const addProductToOrderItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = await orderItemService.addProductToOrderItems(
      req.params.orderId,
      req.params.productId,
      req.body.quantity,
      req.body.price
    );
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to order', error });
  }
};

export const removeProductFromOrderItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = await orderItemService.removeProductFromOrderItems(
      req.params.orderId,
      req.params.productId
    );
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from order', error });
  }
};

export const updateOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = await orderItemService.updateOrderItem(req.params.id, req.body);
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order item', error });
  }
};

export const deleteOrderItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItem = await orderItemService.deleteOrderItem(req.params.id);
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order item', error });
  }
};
