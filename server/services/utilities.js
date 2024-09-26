const { format } = require("date-fns");

const reorderObject = (item) => {
  return {
    id: item.id,
    userName: item.userName,
    message: item.message,
    createAt: item.createAt
  };
};

const getCurrentTime = () => {
  return format(new Date(), 'dd-MM-yyyy HH:mm');
}

const formatDateString = (date) => {
  return format(date, 'dd-MM-yyyy HH:mm');
}

const parseDate = (dateStr) => {
  const [day, month, yearAndTime] = dateStr.split('-');
  const [year, time] = yearAndTime.split(' ');
  return new Date(`${year}-${month}-${day}T${time}`);
}

const processMessages = (items) => {
  return items.map(item => {
    const reordered = reorderObject(item);
    return {
      ...reordered,
      createAt: parseDate(reordered.createAt)
    };
  });
};

const formatMessages = (messages) => {
  return messages.map(item => ({
    ...item,
    createAt: formatDateString(item.createAt)
  }));
};

module.exports = { reorderObject, getCurrentTime, parseDate, formatDateString, processMessages, formatMessages };