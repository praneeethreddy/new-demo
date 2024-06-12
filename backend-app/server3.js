const express = require('express');
const multer = require('multer');
const { GridFsStorage } = require("multer-gridfs-storage");
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const url = "mongodb+srv://sxp17390:root123@cluster0.6bf1a1k.mongodb.net/grocerySystem?retryWrites=true&w=majority";

// Create storage engine for GridFS
const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    return {
      bucketName: 'uploads'
    };
  }
});
const upload = multer({ storage });


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.post('/addProduct', upload.single('product-image'), (req, res) => {
  const { description, price, quantity, timestamp, title } = req.body;

  const fileId = req.file.id;
  console.log("field Id : ",fileId);
  const product = {
    description,
    price,
    quantity,
    timestamp,
    title,
    img: fileId
  };

console.log({
  description,
  price,
  quantity,
  timestamp,
  title,
  img:fileId
})
  res.send({msg:"success"})
});

app.listen(8000, () => {
  console.log('Server running on port 3000');
});
