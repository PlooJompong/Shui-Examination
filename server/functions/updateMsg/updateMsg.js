const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const { UpdateCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");
const { reorderObject } = require("../../services/utilities")

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

    const body = JSON.parse(event.body)

    const result = await db.send(new UpdateCommand({
      TableName: "Messages",
      Key: { id: messageId },
      UpdateExpression: "set message = :message",
      ExpressionAttributeValues: {
        ":message": body.message
      },
      ReturnValues: "ALL_NEW"
    }))

    const updateMessage = reorderObject(result.Attributes)

    return sendResponse({ updateMessage })

  } catch (error) {
    return sendError(500, error)
  }
}
