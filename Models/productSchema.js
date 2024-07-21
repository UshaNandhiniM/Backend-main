import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please enter car name"],
        trim: true,
        maxLength: [200, "Product name cannot exceed 200 characters"]
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    ratings: {
        type: String,
        default: 0
    },
    images: {
        type:String,
        default:"https://tse3.mm.bing.net/th?id=OIP.-bw9l3F0hfYIg3hOmeW1uAHaEq&pid=Api&P=0&h=180",
        default:"https://tse3.mm.bing.net/th?id=OIP.xUDmOYjDR1zMaufaqaq4zwHaDX&pid=Api&P=0&h=180",
        default:"https://tse1.mm.bing.net/th?id=OIP.cSgFK7kW4h_DZTUTMoeg7QHaEK&pid=Api&P=0&h=180",
        required:true
    }
  },{
    timestamps: true 
  });
  
  const Product = mongoose.model("Product", productSchema);
  
  export default Product;
  