import Product from "../Models/productSchema.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createProduct = async (req, res,next) => {
  const { name, price, description, ratings, images } = req.body;
  const newproduct = new Product({ name, price, description, ratings, images });
  try {
    await newproduct.save();
    res
      .status(200)
      .json({ message: "Product created successfully", result: newproduct });
  } catch (err) {
   next({ message: "Internal error creating a product" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Product details", result: products });
  } catch (err) {
    res.status(500).json({ message: "Internal error getting a product" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(errorHandler(404, "Product not found" ));
    }
    res.status(200).json({ message: "Product details", result: product });
  } catch (err) {
    res.status(500).json({ message: "Internal error getting a product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct=await Product.findByIdAndUpdate({_id:id},{
      name:req.body.name,
      price:req.body.price,
      description:req.body.description,
      ratings:req.body.ratings,
      images:req.body.images,

    })
    if (!updatedProduct) {
      return next(errorHandler(404, "Product not found" ));
    }
    res
      .status(200)
      .json({
        message: "Product updated successfully",result:updatedProduct
      });
  } catch (err) {
    res.status(500).json({ message: "Internal error updating a product" });
  }
};

export const deleteProduct = async (req, res) => {
  
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete({_id:id});
    res
      .status(200)
      .json({
        message: "Product deleted successfully"
      });
  } catch (err) {
    res.status(500).json({ message: "Internal error deleting a product" });
  }
};
