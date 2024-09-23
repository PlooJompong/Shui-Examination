const { error } = require("console");

function sendResponse(data) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  };
};

function sendError(statusCode, errorMsg) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ error: errorMsg }),
  };
};

module.exports = { sendResponse, sendError }