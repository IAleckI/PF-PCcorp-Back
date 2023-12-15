import ProductModel from "../database/model/productModel";
import UserModel from "../database/model/userModel";
import sequelize from "../database/db";
import UserProductsModel from "../database/model/userProductModel";
import { IUserProductsAttributes } from "../types/userProducts";
import { IProducts } from "../types/products";
import { Transaction } from "sequelize";

export default class UserProducts {
  static async getAll (id: string): Promise<IUserProductsAttributes[]> {

    const userProducts = await UserModel.findByPk(id);
    if (userProducts === null) throw new Error("User not found");

    return await UserProductsModel.findAll({ where: { userId: id } });
  }

  static async addProduct (id: string, productId: string) {
    await sequelize.transaction(async (t: Transaction) => {

      const cart = await UserProductsModel.findOne({ where: { userId: id, productId: productId }, transaction: t });
      const user = await UserModel.findByPk(id, { transaction: t, include: [ProductModel] });
      const product = await ProductModel.findByPk(productId, { transaction: t });

      if (!user || !product) throw new Error("User or product not found");
      
      if (product.stock >= 1) {
        const productFind: IProducts = user.dataValues.products.find((product: IProducts) => 
          product.dataValues.id === productId);
        const totalPrice = productFind ? 
          productFind.dataValues.price * (cart?.amount ? cart.amount + 1 : 1)
          : product.price;

        await user.addProduct(product, { through: { 
          amount: cart ? cart.amount + 1 : 1,
          total: totalPrice } });

        await product.decrement("stock", { by: 1, transaction: t });
      } else throw new Error("Not enough stock");
    });

    return await ProductModel.findByPk(productId);
  }

  static async deleteProduct (id: string, productId: string): Promise<IProducts | null> {
    await sequelize.transaction(async (t: Transaction) => {
      const cart = await UserProductsModel.findOne({ where: { userId: id, productId: productId }, transaction: t });
      const user = await UserModel.findByPk(id, { transaction: t });
      const product = await ProductModel.findByPk(productId, { transaction: t });

      if (!product || !user || !cart) throw new Error("User or product not found");

      if (cart.amount >= 1 ) {
        await cart.decrement("amount", { by: 1, transaction: t });
        await cart.decrement("total", { by: product.price, transaction: t });
        await product.increment("stock", { by: 1, transaction: t });
      }

      if (cart.amount === 0 ) await UserProductsModel.destroy({ where: { userId: id, productId: productId }, transaction: t });
    });

    return await ProductModel.findByPk(productId);

  }
}