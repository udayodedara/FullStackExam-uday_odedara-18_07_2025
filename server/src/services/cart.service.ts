import Cart, { ICart } from '../models/Cart';

export const createCart = async (userId: number): Promise<ICart> => {
  const cart = await Cart.create({ userId });
  return cart;
};

export const getUserCartsList = async (userId: number): Promise<ICart> => {
  const cart = await Cart.findOne({ userId }).populate('products');
  if (!cart) {
    throw new Error('Cart not found');
  }
  return cart;
};

export const addProductToCart = async (userId: number, productId: string): Promise<ICart> => {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $addToSet: { products: productId } },
    { new: true }
  );
  if (!cart) {
    throw new Error('Cart not found');
  }
  return cart;
};

export const removeProductFromCart = async (userId: number, productId: string): Promise<ICart> => {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { products: productId } },
    { new: true }
  );
  if (!cart) {
    throw new Error('Cart not found');
  }
  return cart;
};

export const clearCart = async (userId: number): Promise<ICart> => {
  const cart = await Cart.findOneAndUpdate({ userId }, { $set: { products: [] } }, { new: true });
  if (!cart) {
    throw new Error('Cart not found');
  }
  return cart;
};

export const deleteCart = async (userId: number): Promise<ICart> => {
  const cart = await Cart.findOneAndDelete({ userId });
  if (!cart) {
    throw new Error('Cart not found');
  }
  return cart;
};
