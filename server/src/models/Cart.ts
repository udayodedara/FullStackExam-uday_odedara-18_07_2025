import mongoose, { Schema } from 'mongoose';
import { IProduct } from './Product';

export interface ICart {
  _id: string;
  userId: number;
  products?: IProduct[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

cartSchema.index({ userId: 1 }, { unique: true });

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;
