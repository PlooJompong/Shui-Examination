const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const { DeleteCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");

exports.handler = async (event) => {
  try {
    const messageId = event.pathParameters && event.pathParameters.id

    if (!messageId) {
      return sendError(400, "messageId is required!")
    }

    const message = await db.send(new GetCommand({
      TableName: "Messages",
      Key: { id: messageId }
    }))

    if (!message.Item) {
      return sendError(404, "messageId not found!")
    }

    await db.send(new DeleteCommand({
      TableName: "Messages",
      Key: { id: messageId }
    }))

    return sendResponse({ message: `Message with id ${messageId} deleted!` })

  } catch (error) {
    return sendError(500, error)
  }
}
