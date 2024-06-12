const {  dbAddProduct, dbUpdateProduct, dbGetAllProducts,dbGetAllProductsWithImages } = require("../DAO/dbconnect");
const multer  = require('multer');
const { GridFsStorage } = require("multer-gridfs-storage");

const url = "mongodb+srv://sxp17390:root123@cluster0.6bf1a1k.mongodb.net/grocerySystem?retryWrites=true&w=majority";

// Create storage engine for GridFS
const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    return {
      bucketName: 'uploads',
      filename:file.originalname,
    };
  }
});
const ImageUpload = multer({ storage });

async function addProduct(productData) {
  const { description,img,price,quantity,timestamp,updatedTimestamp,title,company,canReturn  } = productData
  console.log("add product page : ",{...productData})
  const data = await dbAddProduct(productData)
  .then( (data) => data)
  .catch(data => null);
  return data;
}

async function updateProduct(productData) {
  const {price,quantity,updatedTimestamp,productId ,description } = productData
  console.log("update product page : ",{...productData})
  const data = await dbUpdateProduct(productData)
  .then( (data) => data)
  .catch(data => null);
  return data;
}
async function getAllProducts() {
  
  const data = await dbGetAllProducts()
  .then( (data) => data == null ? "error" : data)
  .catch(data => null);
  return data;
}


async function getAllProductsWithImages() {
  
  const data = await dbGetAllProductsWithImages()
  .then( (data) => data)
  .catch(data => null);
  return data;
}

module.exports = {
  addProduct,
  ImageUpload,
  updateProduct,
  getAllProducts,
  getAllProductsWithImages
}