const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { formatMessages, processMessages } = require("../../services/utilities");

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

    if (!userMessages.Items.length) {
      return sendError(404, `No messages found for user ${userName}`)
    }

    const processedMessages = processMessages(userMessages.Items);
    const sortedMessages = processedMessages.sort((a, b) => b.createAt - a.createAt);
    const formattedMessages = formatMessages(sortedMessages);

    return sendResponse({ messages: formattedMessages });

  } catch (error) {
    return sendError(500, error)
  }
}
