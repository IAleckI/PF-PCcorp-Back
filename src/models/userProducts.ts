import ProductModel from "../database/model/productModel";
import UserModel from "../database/model/userModel";
import { IUserModel } from "../types/user";
import { IProducts } from "../types/products";

export default class UserProducts {
  static async getAll (id: string): Promise<IUserModel | null> {
    const userProducts = await UserModel.findOne({
      where: { email: id },
      include: [ProductModel]
    });

    return userProducts;
  }

  static async getOne (id: string, productId: string): Promise<IUserModel | null> {
    const userProduct = await UserModel.findOne({
      where: {
        email: id
      },
      include: [{
        model: ProductModel,
        where: { id: productId }
      }]
    });

    return userProduct;
  }

  static async addProduct (id: string, productId: string): Promise<IProducts | null> {
    
    const product = await ProductModel.findByPk(productId);
    const user = await UserModel.findByPk(id);

    await user?.addProduct(product);

    return product;
  }

  static async deleteProduct (id: string, productId: string): Promise<IProducts | null> {
    const product = await ProductModel.findByPk(productId);
    const user = await UserModel.findByPk(id);

    await user?.removeProduct(product);
    const deleteProduct = await ProductModel.findOne({
      where: {
        id: productId,
      }
    });
  
    return deleteProduct;
  }
}