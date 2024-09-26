import { useState, useCallback } from 'react';
import Button from './Button.jsx';

const ListItems = ({ data = [], error }) => {
  const [expandedMessages, setExpandedMessages] = useState({});

  const handleToggleMessage = useCallback((id) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const renderActionButtons = useCallback(
    () => (
      <>
        <Button className="bg-gray-300 text-gray-800 hover:bg-gray-400">
          Edit
        </Button>
        <Button className="ml-2 bg-red-400 text-white hover:bg-red-600">
          Delete
        </Button>
      </>
    ),
    [],
  );

  const renderMessage = (message, id) => {
    const isExpanded = expandedMessages[id];
    const shouldTruncate = message.length > 80;

    return (
      <div>
        <p className="mb-auto text-balance break-words font-light">
          {isExpanded || !shouldTruncate
            ? message
            : `${message.substring(0, 80)}...`}
        </p>
        {shouldTruncate && (
          <Button
            className="p-0 font-normal text-indigo-500 hover:text-indigo-700"
            onClick={() => handleToggleMessage(id)}
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        )}
      </div>
    );
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data.length) {
    return <p>No messages found</p>;
  }

  return (
    <section className="mt-4 flex flex-wrap items-start justify-center gap-4">
      {data.map(({ id, message, userName, createAt }) => (
        <div
          key={id}
          className="flex min-h-64 w-96 flex-col gap-3 rounded-md bg-white px-5 py-4 text-lg"
        >
          <p className="mb-4 text-sm text-gray-500">{createAt}</p>
          {renderMessage(message, id)}
          <div className="mt-auto flex items-center">
            <p className="mr-auto italic">
              <strong>{userName}</strong>
            </p>
            {renderActionButtons()}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ListItems;
