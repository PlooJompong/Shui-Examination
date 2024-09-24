const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { formatMessages, processMessages } = require("../../services/utilities");

exports.handler = async () => {
  try {
    const messages = await db.send(new ScanCommand({
      TableName: "Messages"
    }));

    const processedMessages = processMessages(messages.Items);
    const sortedMessages = processedMessages.sort((a, b) => b.createAt - a.createAt);
    const formattedMessages = formatMessages(sortedMessages);

    return sendResponse({ messages: formattedMessages });

  } catch (error) {
    return sendError(500, error);
  }
};