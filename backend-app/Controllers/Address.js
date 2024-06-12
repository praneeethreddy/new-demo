const { dbRegisterAddress,dbUpdateAddress,dbGetAddress} = require("../DAO/dbconnect");


async function registerAddress(customerData) {
  const data = await dbRegisterAddress(customerData)
  .then( (data) => data)
  .catch(data => null);
  return data;
}

async function getAddress(addressId) {
  const data = await dbGetAddress(addressId)
  .then( (data) => data == null ? "error" : data)
  .catch(data => null);
  return data;
}

async function updateAddress(addressData) {
  const {address_one, city, country, pin, state, addressId } = addressData
  console.log("update address page : ",{...addressData})
  const data = await dbUpdateAddress(addressData)
  .then( (data) => data)
  .catch(data => null);
  return data;
}
module.exports = {
    registerAddress,
    getAddress,
    updateAddress
}