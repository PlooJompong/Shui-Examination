// const { sendError } = require("../responses/index");
// const { db } = require("./db");
// const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { format } = require("date-fns");

const reorderObject = (item) => {
  return {
    id: item.id,
    userName: item.userName,
    message: item.message,
    createAt: item.createAt
  };
};

function getCurrentTime() {
  return format(new Date(), 'dd-MM-yyyy HH:mm:ss');
}

module.exports = { reorderObject, getCurrentTime };