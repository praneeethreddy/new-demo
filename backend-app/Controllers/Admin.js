const { dbValidateAdmin,dbRegisterAdmin } = require("../DAO/dbconnect");

async function validateAdmin(adminData) {
  const {mail,pass} = adminData
  console.log("admin  login data : ",{...adminData})
  const data = await dbValidateAdmin(adminData)
  .then( (data) => data  == null ? "error" : data)
  .catch(data => "error");
console.log(data)
  return data;
}



async function registerAdmin(adminData) {
  const { name, pass, mail } = adminData
  console.log("register admin page : ",{...adminData})
  const data = await dbRegisterAdmin(adminData)
  .then( (data) => data)
  .catch(data => null);
  return data;
}

module.exports = {
  validateAdmin,
  registerAdmin
}