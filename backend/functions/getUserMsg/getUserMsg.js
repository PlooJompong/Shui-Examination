const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { reorderObject } = require("../../services/utilities")

exports.handler = async (event) => {
  try {
    const userName = event.pathParameters && event.pathParameters.id

    if (!userName) {
      return sendError(400, "userName is required!")
    }

    const userMessages = await db.send(new QueryCommand({
      TableName: "Messages",
      IndexName: "userName-index",
      KeyConditionExpression: "userName = :userName",
      ExpressionAttributeValues: {
        ":userName": userName
      }
    }))

    if (userMessages.Items.length === 0) {
      return sendError(404, "Username not found!")
    }

    const reorderMessage = userMessages.Items.map(item => reorderObject(item))

    return sendResponse({ messages: reorderMessage })

  } catch (error) {
    return sendError(500, error)
  }
}
