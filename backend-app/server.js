const express = require('express');
const cors = require('cors');
const multer  = require('multer');
const bodyParser = require('body-parser');

const dbconnect = require('./DAO/dbconnect');
const { validateAdmin, registerAdmin } = require('./Controllers/Admin');
const { registerCustomer, validateCustomer } = require('./Controllers/Customer');
const { registerAddress,updateAddress, getAddress } = require('./Controllers/Address');
const { addProduct, ImageUpload, updateProduct, getAllProducts, getAllProductsWithImages} = require('./Controllers/Products');
const { addOrder,getOrderDetails,deliverOrder,getAllOrderDetails ,cancelOrder,cancelOrderAdmin} = require('./Controllers/Orders');


const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// app.use(upload.array());





app.get('/message', (req, res) => {

    res.json({ message: "Hello from server!" });
});

app.post('/admin',upload.any(), async (req, res) => {

    const { email, password } = req.body;

    const data = await validateAdmin({ mail: email, pass: password })
    res.json({ data: data });
});


app.post('/customer',upload.any(), async (req, res) => {
    const { email, password } = req.body;
    const data = await validateCustomer({ mail: email, pass: password }).then(e => e).catch(console.dir);
    res.json({ data: data });
});

app.post('/registerCustomer', upload.any(),async (req, res) => {
    //extract body data 
    const { 
        first_name, 
        last_name, 
        mail, 
        pass, 
        phone, 
        address 
    } = req.body;

    let addressId = null;
    
    if ((address)) {
        //extract address data
        const { 
            address_one, 
            city, 
            country, 
            pin, 
            state } = address;
        //register address
        const dataAddress = await registerAddress({ 
            address_one: address_one, 
            city: city, 
            country: country, 
            pin: pin, 
            state: state 
        }).then(e => e).catch(console.dir);
        addressId = dataAddress.insertedId;
    }

    const dataCustomer = await registerCustomer({ 
        first_name: first_name, 
        last_name: last_name, 
        pass: pass, 
        phone: phone, 
        address: addressId, 
        mail: mail 
    }).then(e => e).catch(console.dir);
    res.json({ data: dataCustomer });
});

app.post('/registerAddress', async (req, res) => {
    const { address_one, city, country, pin, state } = req.body;
    console.log(req.body);
    const data = await registerAddress({ 
        address_one: address_one, 
        city: city, 
        country: country, 
        pin: pin, 
        state: state 
    }).then(e => e).catch(console.dir);
    res.json({ message: data });
});





app.post('/addProduct', ImageUpload.single('productImage'),async (req, res) => {
    const { description, price, quantity,  title,company } = req.body;
    const timestamp = new Date(); 
  const fileId = req.file.id;
  
  const product = {
    description,
    price,
    quantity,
    timestamp:timestamp,
    updatedTimestamp:timestamp,
    title,
    company,
    img: fileId,
  };
    const data = await addProduct({ 
        ...product
    }).then(e => e).catch(console.dir);
    
    res.json({ data: data});
});

app.put('/updateProduct/:productId',upload.any(), async (req, res) => {
    const { productId } = req.params;
    const {  price, quantity,description  } = req.body;
    const timestamp = new Date(); 
  
  const product = {
    price,
    quantity,
    updatedTimestamp:timestamp,
    productId,
    description,
  };
    const data = await updateProduct({ 
        ...product
    }).then(e => e).catch(console.dir);
  
    res.json({ data: data});
});

app.get('/products', async (req, res) => {
    const data = await getAllProductsWithImages()
    .then(e => e).catch(console.dir);
    res.json({ data: data});
});

app.get('/address/:addressId',upload.any(), async (req, res) => {
    const { addressId } = req.params;
    console.log("address : ",addressId)
    const data = await getAddress(addressId)
    .then(e => e).catch(console.dir);

    res.json({ data: data});
});

app.put('/updateAddress/:addressId',upload.any() ,async (req, res) => {
    const { addressId } = req.params;
    const { address_one, city, country, pin, state } = req.body;
    console.log("hello : ",{ address_one, city, country, pin, state })
    console.log(req.body);
    const data = await updateAddress({ 
        address_one: address_one, 
        city: city, 
        country: country, 
        pin: pin, 
        state: state,
        addressId,
    }).then(e => e).catch(console.dir);
    res.json({ data: data });
});

app.post('/placeOrder',upload.any() ,async (req, res) => {
    
    const   {
        customer_id ,
        address_id ,
        cancel_done ,
        cancel_reason ,
        cancel_type ,
        card_number ,
        delivery_status ,
        delivery_type,
        payment_type ,
        products_details ,
        total ,
        canReturn,
      } = req.body;

    const data = await addOrder({
        customer_id ,
        address_id ,
        cancel_done ,
        cancel_reason ,
        cancel_type ,
        card_number ,
        delivery_status ,
        delivery_type,
        payment_type ,
        products_details ,
        total ,
        canReturn,
      } ).then(e => e).catch(console.dir);
    res.json({ data: data });
});

app.put('/cancelOrder/:cancelId',upload.any() ,async (req, res) => {
    const { cancelId } = req.params;
    const   {
        cancel_done,
        cancel_reason,
        cancel_type,
        delivery_status
      } = req.body;

    const data = await cancelOrder({
        cancel_done,
        cancel_reason,
        cancel_type,
        delivery_status,
        cancelId
      } ).then(e => e).catch(console.dir);
    res.json({ data: data });
});

app.put('/cancelOrderAdmin/:cancelId',upload.any() ,async (req, res) => {
    const { cancelId } = req.params;
    const   {
        cancel_done,
        cancel_reason,
        cancel_type,
        delivery_status,
  
      } = req.body;

    const data = await cancelOrderAdmin({
        cancel_done,
        cancel_reason,
        cancel_type,
        delivery_status,
        canReturn:"No",
        cancelId
      } ).then(e => e).catch(console.dir);
    res.json({ data: data });
});


app.put('/deliverOrder/:orderId',upload.any() ,async (req, res) => {
    const { orderId } = req.params;
    const   {
        delivery_status
      } = req.body;

    const data = await deliverOrder({
        delivery_status,
        orderId
      } ).then(e => e).catch(console.dir);
    res.json({ data: data });
});

app.get('/getOrderDetails/:custId',upload.any() ,async (req, res) => {
    const { custId } = req.params;
    const data = await getOrderDetails(custId).then(e => e).catch(console.dir);
    res.json({ data: data });
});

app.get('/getAllOrderDetails',upload.any() ,async (req, res) => {
    
    const data = await getAllOrderDetails().then(e => e).catch(console.dir);
    res.json({ data: data });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});