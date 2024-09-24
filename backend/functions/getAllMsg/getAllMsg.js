const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { reorderObject } = require("../../services/utilities");

exports.handler = async () => {
  try {
    const messages = await db.send(new ScanCommand({
      TableName: "Messages"
    }))

    const reorderMessages = messages.Items.map(reorderObject)

    return sendResponse({ messages: reorderMessages })

  } catch (error) {
    return sendError(500, error)
  }
}