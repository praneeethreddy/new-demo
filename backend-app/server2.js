const express = require("express")
const multer = require("multer")
const { GridFsStorage } = require("multer-gridfs-storage")


const app = express()
const url = "mongodb+srv://sxp17390:root123@cluster0.6bf1a1k.mongodb.net/mongodb?retryWrites=true&w=majority";


// Create a storage object with a given configuration
// const storage = new GridFsStorage({
//   url,
//   file: (req, file) => {
//     //If it is an image, save to photos bucket
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//       return {
//         bucketName: "photos",
//         filename: `${Date.now()}_${file.originalname}`,
//       }
//     } else {
//       //Otherwise save to default bucket
//       return `${Date.now()}_${file.originalname}`
//     }
//   },
// })

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+'.jpeg')
    }
});
 
// Set multer storage engine to the newly created object
const upload = multer({ storage })

app.use(express.json());


app.post("/upload/image", upload.single("avatar"), (req, res) => {
    // var obj = {
    //     name: req.body.name,
    //     desc: req.body.desc,
    //     img: {
    //         data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    //         contentType: 'image/png'
    //     }
    // }
  const file = req.file
  // Respond with the file details
  res.send({
    message: "Uploaded",
    id: file.id,
    name: file.filename,
    contentType: file.contentType,
  })
})

const server = app.listen(process.env.PORT || 8000, function () {
  const port = server.address().port

  console.log("App started at port:", port)
})