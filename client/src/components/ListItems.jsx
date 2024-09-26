import { useState, useCallback } from 'react';
import Button from './Button.jsx';
import axios from 'axios';
import {
  FaUser,
  FaPenToSquare,
  FaRegTrashCan,
  FaMinus,
  FaCheck,
  FaXmark,
} from 'react-icons/fa6';

const ListItems = ({ data = [], error, fetchData }) => {
  const [expandedMessages, setExpandedMessages] = useState({});
  const [editingMessages, setEditingMessages] = useState({});
  const [editedMessages, setEditedMessages] = useState({});

  const handleToggleMessage = useCallback((id) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const handleDeleteMessage = useCallback(
    async (id) => {
      try {
        await axios.delete(
          `https://dewrtfmmdl.execute-api.eu-north-1.amazonaws.com/messages/${id}`,
        );
        fetchData();
      } catch (error) {
        console.error(error);
      }
    },
    [fetchData],
  );

  const handleEditMessage = (id) => {
    setEditingMessages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    const currentMessage = data.find((item) => item.id === id)?.message || '';
    setEditedMessages((prev) => ({
      ...prev,
      [id]: currentMessage,
    }));
  };

  const handleSaveMessage = useCallback(
    async (id) => {
      const originalMessage = data.find((item) => item.id === id)?.message;
      const editedMessage = editedMessages[id];

      if (editedMessage !== originalMessage && editedMessage.trim() !== '') {
        try {
          await axios.put(
            `https://dewrtfmmdl.execute-api.eu-north-1.amazonaws.com/messages/${id}`,
            { message: editedMessage },
          );

          setEditingMessages((prev) => ({ ...prev, [id]: false }));
          fetchData();
        } catch (error) {
          console.error('Error saving message:', error);
        }
      } else {
        setEditingMessages((prev) => ({ ...prev, [id]: false }));
      }
    },
    [editedMessages, data, fetchData],
  );

  const renderActionButtons = useCallback(
    (id, isEditing) => (
      <>
        {isEditing ? (
          <>
            <Button
              className="bg-green-400 text-white hover:bg-green-600"
              onClick={() => handleSaveMessage(id)}
            >
              <FaCheck className="size-6" />
            </Button>
            <Button
              className="ml-2 bg-red-400 px-3 text-white hover:bg-red-600"
              onClick={() => handleEditMessage(id)}
            >
              <FaXmark className="size-6" />
            </Button>
          </>
        ) : (
          <>
            <Button
              className="bg-gray-300 px-3 text-gray-800 hover:bg-gray-400"
              onClick={() => handleEditMessage(id)}
            >
              <FaPenToSquare className="size-6" />
            </Button>
            <Button
              className="ml-2 bg-red-400 px-3 text-white hover:bg-red-600"
              onClick={() => handleDeleteMessage(id)}
            >
              <FaRegTrashCan className="size-6" />
            </Button>
          </>
        )}
      </>
    ),
    [handleSaveMessage, handleEditMessage, handleDeleteMessage],
  );

  const renderMessage = (message, id, isEditing) => {
    const isExpanded = expandedMessages[id];
    const shouldTruncate = message.length > 80;

    if (isEditing) {
      return (
        <textarea
          className="h-28 w-full rounded-md border p-1"
          value={editedMessages[id] || ''}
          onChange={(e) =>
            setEditedMessages((prev) => ({ ...prev, [id]: e.target.value }))
          }
        />
      );
    }

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
    return <p className="mt-2 text-red-500">{error}</p>;
  }

  return (
    <section className="mt-4 flex w-full flex-wrap items-start justify-center gap-4">
      {data.map(({ id, message, userName, createAt }) => {
        const isEditing = editingMessages[id];

        return (
          <div
            key={id}
            className="text-80 min-w-lg flex min-h-56 w-full max-w-[25rem] flex-col rounded-md bg-white px-5 py-4 sm:max-w-[25rem]"
          >
            <p className="mb-4 text-sm text-gray-500">{createAt}</p>
            {renderMessage(message, id, isEditing)}
            <div className="mt-auto flex items-center">
              <FaUser className="size-5" />
              <FaMinus className="mx-2 size-5" />
              <p className="mr-auto italic">
                <strong> {userName}</strong>
              </p>
              {renderActionButtons(id, isEditing)}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ListItems;
