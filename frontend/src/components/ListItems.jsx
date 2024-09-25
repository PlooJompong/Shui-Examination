import { useState } from 'react';
import Button from './Button.jsx';

const ListItems = ({ data, error }) => {
  // const [showMore, setShowMore] = useState(false);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No messages found</p>;
  }

  return (
    // <section className="mb-4 flex flex-col gap-4">
    <section className="mt-4 flex flex-wrap items-start justify-center gap-4">
      {data.map((item) => (
        // <div
        //   key={item.id}
        //   className="flex min-h-56 max-w-lg flex-col gap-3 rounded-md bg-white px-5 py-4 text-lg"
        // >
        <div
          key={item.id}
          className="flex min-h-64 w-96 flex-col gap-3 rounded-md bg-white px-5 py-4 text-lg"
        >
          <p className="mb-4 text-sm text-gray-500">{item.createAt}</p>
          <p className="mb-auto text-balance break-words font-light">
            {/* {showMore ? item.message.slice(0, 90) + ' ...' : item.message} */}
            {item.message}
          </p>
          <div className="mt-4 flex items-center">
            <p className="mr-auto italic">
              <strong>{item.userName}</strong>
            </p>
            <Button
              title="Edit"
              className="bg-gray-300 text-gray-800 hover:bg-gray-400"
            />
            <Button
              title="Delete"
              className="ml-2 bg-red-400 text-white hover:bg-red-600"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default ListItems;
