import { useState, useEffect } from 'react';
import NewMessage from './components/NewMessage.jsx';
import SearchUserMessage from './components/SearchUserMessage.jsx';
import Button from './components/Button.jsx';
import axios from 'axios';

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllMsg = async () => {
    try {
      const response = await axios.get(
        'https://ggjgn976y7.execute-api.eu-north-1.amazonaws.com/messages',
      );

      const { data } = response;

      if (data?.data?.messages) {
        setData(data.data.messages);
        setError(null);
      } else {
        setData([]);
        setError('No messages found');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setData([]);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
    fetchAllMsg();
  };

  useEffect(() => {
    fetchAllMsg();
  }, []);

  return (
    <main className="max-w-screen-xxl flex min-h-screen flex-col items-center justify-center bg-blue-950 p-5">
      <Button
        onClick={handleToggle}
        className="mb-2 bg-indigo-500 text-white hover:bg-indigo-600"
      >
        {!toggle ? 'Search User Message' : 'New Message'}
      </Button>

      {!toggle ? (
        <NewMessage data={data} error={error} fetchData={fetchAllMsg} />
      ) : (
        <SearchUserMessage />
      )}
    </main>
  );
};

export default App;
