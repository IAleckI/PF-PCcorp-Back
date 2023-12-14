import { Request, Response } from 'express';
import { GraphQLError } from "graphql";
import { IProducts } from "../types/products";
import Products from "../models/products";
import { v2 as cloudinary } from 'cloudinary';

import dotenv from "dotenv"
dotenv.config();

const {
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
} = process.env;


cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

export default class ProductController {
  static async getAllProducts (): Promise<IProducts[]> {
    try {
      const products = await Products.GetAll();

      if (products.length === 0) throw new GraphQLError("Products not found", {
        extensions: { code: "NOT_FOUND" }
      });

      return products;
    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }

  static async getProductById (id: string): Promise<IProducts> {
    try {
      if (!id) throw new GraphQLError("Id is required", {
        extensions: { code: "BAD_USER_INPUT" } 
      });

      const product = await Products.GetById(id);
      if (product === null) throw new GraphQLError("Product not found", {
        extensions: { code: "NOT_FOUND" }
      });

      return product;

    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }

  static async createProduct(req: Request, res: Response): Promise<IProducts> {
    const {product} = req.body ;

    try {
        if (!product.name || !product.model || !product.family || !product.stock || !product.price || !product.brand || !product.image) {
        throw new GraphQLError("All fields are required", {
          extensions: { code: "BAD_USER_INPUT" } 
        });
      }

 
      const cloudinaryResponse = await cloudinary.uploader.upload(product.image, {
        folder: 'product_images',
      });

      product.image = cloudinaryResponse.secure_url;

      const newProduct = await Products.Create(product);
      return newProduct;

    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }

  }

  static async updateProduct(req: Request, res: Response): Promise<IProducts> {
    try {
        const {product} = req.body
        const {id} = req.body
      if (!id) {
        throw new GraphQLError("Id is required", {
          extensions: { code: "BAD_USER_INPUT" } 
        });
      }
      if (!product) {
        throw new GraphQLError("Product is required", {
          extensions: { code: "BAD_USER_INPUT" } 
        });
      }

   
      if (product.image) {
        // Upload new image to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(product.image, {
          folder: 'product_images',
        });

        product.image = cloudinaryResponse.secure_url;
      }

      const updateProduct = await Products.Update(id, product);

      return updateProduct;

    } catch (error: any) {
      throw new GraphQLError(error.message, { extensions: { code: error.extensions.code } });
    }
  }
  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        throw new GraphQLError('Id is required', { extensions: { code: 'BAD_USER_INPUT' } });
      }

      
      const productToDelete = await Products.GetById(id);

    
      if (productToDelete && productToDelete.image) {
        const publicId = productToDelete.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

    
      const deletedProduct = await Products.Delete(id);

      res.json(deletedProduct);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}