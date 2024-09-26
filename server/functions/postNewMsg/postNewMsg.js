const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { nanoid } = require("nanoid")
const { getCurrentTime } = require("../../services/utilities");

exports.handler = async (event) => {
  try {
    const { userName, message } = JSON.parse(event.body)
    const id = nanoid()

    if (!userName || !message) {
      return sendError(400, "userName and message are required!")
    }

    const newMessage = {
      id: id,
      userName: userName,
      message: message,
      createAt: getCurrentTime()
    }

    await db.send(new PutCommand({
      TableName: "Messages",
      Item: newMessage
    }))

    return sendResponse({ newMessage, messages: "New message created!" })

  } catch (error) {
    return sendError(500, error)
  }
}