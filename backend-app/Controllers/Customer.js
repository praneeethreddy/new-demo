const {  dbValidateCustomer, dbRegisterCustomer } = require("../DAO/dbconnect");

async function validateCustomer(customerData) {
  const {mail,pass} = customerData
  console.log({...customerData})
  const data = await dbValidateCustomer(customerData)
  .then( (data) => data  == null ? "error" : data)
  .catch(data => "error");
    return data;
}



async function registerCustomer(customerData) {
  const { first_name, last_name,mail,pass,phone,address} = customerData
  console.log("register customerData page : ",{...customerData})

  const data = await dbRegisterCustomer(customerData)
  .then( (data) => data)
  .catch(data => null);
  return data;
}

module.exports = {
    validateCustomer,
    registerCustomer
}