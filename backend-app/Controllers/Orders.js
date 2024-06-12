
const {  dbCancelOrderAdmin,dbAddOrder,dbDeliverOrder,dbGetOrderDetails,dbGetAllOrderDetails,dbCancelOrder } = require("../DAO/dbconnect");

  async function addOrder(orderData) {
    const {
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
      } = orderData

      const sendOrderData = {
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
      }


    // console.log("register customerData page : ",{...orderData})
  
    const data = await dbAddOrder({...sendOrderData})
    .then( (data) => data)
    .catch(data => null);
    return data;
  }

  


  async function getOrderDetails(customerID) {
    const data = await dbGetOrderDetails(customerID)
    .then( (data) => data)
    .catch(data => null);
    return data;
  }

  async function cancelOrder(orderData) {
    const data = await dbCancelOrder(orderData)
    .then( (data) => data)
    .catch(data => null);
    return data;
  }
  
  
  async function cancelOrderAdmin(orderData) {
    const data = await dbCancelOrderAdmin(orderData)
    .then( (data) => data)
    .catch(data => null);
    return data;
  }

  async function deliverOrder(orderData) {
    const data = await dbDeliverOrder(orderData)
    .then( (data) => data)
    .catch(data => null);
    return data;
  }

  async function getAllOrderDetails() {
    const data = await dbGetAllOrderDetails()
    .then( (data) => data)
    .catch(data => null);
    return data;
  }


  module.exports = {
    addOrder,
    getOrderDetails,
    cancelOrder,
    getAllOrderDetails,
    deliverOrder,
    cancelOrderAdmin
}