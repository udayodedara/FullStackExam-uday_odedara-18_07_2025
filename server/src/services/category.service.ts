import Category, { ICategory } from '../models/Category';

export const createCategory = async (name: string): Promise<ICategory> => {
  const category = await Category.create({ name: name.toLowerCase() });
  return category;
};

export const getCategoryById = async (id: string): Promise<ICategory> => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Category not found');
  }
  return category;
};

export const getAllCategories = async (): Promise<ICategory[]> => {
  const categories = await Category.find();
  return categories;
};

export const updateCategory = async (id: string, name: string): Promise<ICategory> => {
  const category = await Category.findByIdAndUpdate(
    id,
    { name: name.toLowerCase() },
    { new: true }
  );
  if (!category) {
    throw new Error('Category not found');
  }
  return category;
};

export const deleteCategory = async (id: string): Promise<ICategory> => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new Error('Category not found');
  }
  return category;
};

export const findCategoryByName = async (name: string): Promise<ICategory | null> => {
  const category = await Category.findOne({ name: name.toLowerCase() });

  return category;
};
