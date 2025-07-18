import mongoose, { Schema } from 'mongoose';

export interface ICategory {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ name: 1 }, { unique: true });

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
