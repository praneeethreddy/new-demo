// const { updateProduct } = require('../Controllers/Products');
const { DATABASE, ADMIN, CUSTOMER, ADDRESS, PRODUCTS, CHUNKS, ORDERDETAILS } = require('../util/databaseConstants');


const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const uri = "mongodb+srv://sxp17390:root123@cluster0.6bf1a1k.mongodb.net/mongodb?retryWrites=true&w=majority";

const client = new MongoClient(uri);


// data : {mail ,password}  of admin and will  check the database and returns data
async function dbValidateAdmin(adminData) {
  // const {mail,password} = adminData

  try {
    const database = client.db(DATABASE);
    const admin = database.collection(ADMIN);
    const query = { ...adminData };
    const data = await admin.findOne(query);
    return data;
  } catch (error) {
    return "error"
  }
}

// data : {mail ,password}  of admin and will  check the database and returns data
async function dbRegisterAdmin(adminData) {
  // const {mail,password} = adminData

  try {
    const database = client.db(DATABASE);
    const admin = database.collection(ADMIN);
    const query = { ...adminData };
    const data = await admin.insertOne(query);
    return data;
  } catch (error) {
    return "error"
  }
}




// CUSTOMER API 


// data : {mail ,pass,}  of customer and will  register in the database and returns data
async function dbRegisterCustomer(customerData) {
  const { first_name, last_name, mail, pass, phone, address } = customerData
  console.log("Data ", { first_name, last_name, mail, pass, phone, address })

  try {
    const database = client.db(DATABASE);
    const customer = database.collection(CUSTOMER);
    const query = { first_name, last_name, mail, pass, phone, address };
    const data = await customer.insertOne(query);
    return {...data,"msg":"success"};
  } catch (error) {
    return "error"
  }
}

async function dbRegisterAddress(address) {
  const {
    address_one,
    city,
    country,
    pin,
    state } = address
  try {
    const database = client.db(DATABASE);
    const address = database.collection(ADDRESS);
    const query = { address_one, city, country, pin, state };
    const data = await address.insertOne(query);
    return data;
  } catch (error) {
    return "error"
  }
}

async function dbUpdateAddress(address) {
  const {
    address_one,
    city,
    country,
    pin,
    state,
    addressId
  } = address
  try {
    const database = client.db(DATABASE);
    const address = database.collection(ADDRESS);
    const query = { address_one, city, country, pin, state };
    const data = await address.updateOne(
      { _id: new ObjectId(addressId) },
      { $set: { ...query } }
    );
    return data;
  } catch (error) {
    return "error"
  }
}

// data : {mail ,password}  of customer and will  check the database and returns data
async function dbValidateCustomer(data) {
  const { mail, pass } = data
  try {
    const database = client.db(DATABASE);
    const customer = database.collection(CUSTOMER);
    const query = { mail: mail, pass: pass };
    const data = await customer.findOne(query);
    return data;
  } catch (error) {
    return "error"
  }
}

// data : { description,img,price,quantity,timestamp,title,company } inserts product data into the database 
async function dbAddProduct(data) {
  const { description, img, price, quantity, timestamp, updatedTimestamp, title, company } = data
  try {
    const database = client.db(DATABASE);
    const product = database.collection(PRODUCTS);
    const query = { description: description, img: img, price: price, quantity: quantity, timestamp: timestamp, title: title, company: company, updatedTimestamp: updatedTimestamp,};
    const data = await product.insertOne(query);
    return {...data,"msg":"success"};
  } catch (error) {
    return "error"
  }
}

async function dbUpdateProduct(data) {
  const { price, quantity, updatedTimestamp, productId,description } = data
  try {
    const database = client.db(DATABASE);
    const product = database.collection(PRODUCTS);
    const query = { price: price, quantity: quantity, updatedTimestamp: updatedTimestamp,"description":description };
    const data = await product.updateOne(
      { _id: new ObjectId(productId) },
      { $set: { ...query } }
    );
    return {...data,"success":"true"};
  } catch (error) {
    return "error"
  }
}

async function dbGetAllProducts() {

  try {
    const database = client.db(DATABASE);
    const product = database.collection(PRODUCTS);
    const data = await product.find({}).toArray();

    return data;
  } catch (error) {
    return "error"
  }
}



async function dbGetAddress(addressId) {

  try {
    const database = client.db(DATABASE);
    const address = database.collection(ADDRESS);
    const query = { _id: new ObjectId(addressId) };
    const data = await address.findOne(query)
    console.log("data : ", data)
    return data;
  } catch (error) {
    return "error"
  }
}

async function dbGetAllProductsWithImages() {

  try {
    const database = client.db(DATABASE);
    const productsCollection = database.collection(PRODUCTS);
    const imagesCollection = database.collection(CHUNKS);

    const products = await productsCollection.find().toArray();
    console.log("products data  :", products)
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const image = await imagesCollection.findOne({ files_id: new ObjectId(product.img) });

        const binaryData = image.data;
        const base64Data = await binaryData.toString('base64');
        const imageUrl = `data:image/jpeg;base64,${base64Data}`;

        return { ...product, image: imageUrl };
      })
    );
    return productsWithImages;
  } catch (error) {
    console.log(error)
    return "error"
  }
}


// data : { description,img,price,quantity,timestamp,title,company } inserts product data into the database 
async function dbAddOrder(Orderdata) {
  try {

    const database = client.db(DATABASE);
    const orderCollection = database.collection(ORDERDETAILS);
    const productsCollection = database.collection(PRODUCTS);

    const {
      customer_id,
      address_id,
      cancel_done,
      cancel_reason,
      cancel_type,
      card_number,
      delivery_status,
      delivery_type,
      payment_type,
      products_details,
      total,
      canReturn,
    } = Orderdata
    const timestamp = new Date();
    let productOrderDetails = []

    for (let i = 0; i < products_details.length; i++) {
      productOrderDetails.push({
        "id": products_details[i]["id"],
        "qty": products_details[i]["qty"],
        "price": products_details[i]["price"],
        "title": products_details[i]["title"],
        "available":products_details[i]["available"]
      })     
    }

    const bulkOps = productOrderDetails.map(product => ({
      updateOne: {
        filter: { _id: new ObjectId(product.id) },
        update: { $set: { quantity:  (parseInt(product.available) - parseInt(product.qty)), updatedTimestamp:timestamp} },
      },
    }));
   
    const query = {
      customer_id: new ObjectId(customer_id),
      address_id: new ObjectId(address_id),
      cancel_done,
      cancel_reason,
      cancel_type,
      card_number,
      delivery_status,
      delivery_type,
      payment_type,
      products_details: productOrderDetails,
      total,
      canReturn,
      timestamp
    };

    const data = await orderCollection.insertOne(query);
    productsCollection.bulkWrite(bulkOps, (err, result) => {
      if (err) {
        console.error('Failed to update quantities:', err);

      }

      console.log(`Successfully updated ${result.modifiedCount} products`);
    });
    return { ...data, "msg": "success" };
  } catch (error) {
    return "error"
  }
}


async function dbGetOrderDetails(customerID) {
  console.log("address : ", customerID)
  try {
    const database = client.db(DATABASE);
    const orderCollection = database.collection(ORDERDETAILS);
    const query = { customer_id: new ObjectId(customerID) };
    const data = await orderCollection.find(query).toArray();
    console.log("data : ", data)
    return data;
  } catch (error) {
    return "error"
  }
}


async function dbCancelOrder(orderData) {
  console.log("  orderData : ", orderData)
  const { cancel_done,
    cancel_reason,
    cancel_type,
    delivery_status,
    cancelId } = orderData
  try {
    const database = client.db(DATABASE);
    const orderCollection = database.collection(ORDERDETAILS);
    const query = {
      cancel_done: cancel_done=="true"?true:false,
      cancel_reason: cancel_reason,
      cancel_type: cancel_type,
      delivery_status: delivery_status
    };

    const data = await orderCollection.updateOne(
      { _id: new ObjectId(cancelId) },
      { $set: { ...query } }
    );
    //  const data = await orderCollection.find(query).toArray();
    console.log("data : ", data)
    return {...data,msg : "success"};
  } catch (error) {
    return "error"
  }
}



async function dbCancelOrderAdmin(orderData) {
  console.log("  orderData : ", orderData)
  const { 
    cancel_done,
    delivery_status,
    cancelId,
    canReturn, 
    productsData
  } = orderData
  try {
    const database = client.db(DATABASE);
    const orderCollection = database.collection(ORDERDETAILS);




    let query = {
      cancel_done: cancel_done=="true"?true:false,
      delivery_status: delivery_status,
      canReturn:canReturn
    };

    if(canReturn=="Yes"){
      query = {
        cancel_done: cancel_done=="true"?true:false,
        delivery_status: delivery_status,
        canReturn:canReturn,
        cancel_reason:null,
        cancel_type:null,
      };



    }


    const data = await orderCollection.updateOne(
      { _id: new ObjectId(cancelId) },
      { $set: { ...query } }
    );
    //  const data = await orderCollection.find(query).toArray();
    console.log("data : ", data)
    return {...data,msg : "success"};
  } catch (error) {
    return "error"
  }
}


async function dbDeliverOrder(orderData) {
  console.log("  orderData : ", orderData)
  const { 
    delivery_status,
    orderId } = orderData
  try {
    const database = client.db(DATABASE);
    const orderCollection = database.collection(ORDERDETAILS);
    const query = {
      delivery_status: delivery_status
    };

    const data = await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { ...query } }
    );
    //  const data = await orderCollection.find(query).toArray();
    console.log("data : ", data)
    return {...data,msg : "success"};
  } catch (error) {
    return "error"
  }
}





async function dbGetAllOrderDetails() {
  
  try {
    const database = client.db(DATABASE);
    const orderCollection = database.collection(ORDERDETAILS);
    const query = {  };
    const data = await orderCollection.find({}).sort( { 'timestamp': -1 } ).toArray();
    console.log("data : ", data)
    return data;
  } catch (error) {
    return "error"
  }
}


module.exports = {
  dbValidateAdmin,
  dbValidateCustomer,
  dbRegisterAdmin,
  dbRegisterCustomer,
  dbRegisterAddress,
  dbAddProduct,
  dbUpdateProduct,
  dbGetAllProducts,
  dbGetAllProductsWithImages,
  dbUpdateAddress,
  dbGetAddress,
  dbAddOrder,
  dbGetOrderDetails,
  dbGetAllOrderDetails,
  dbCancelOrder,
  dbDeliverOrder,
  dbCancelOrderAdmin
}

