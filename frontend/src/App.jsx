import { useState, useEffect } from 'react';
import Button from './components/Button.jsx';
import ListItems from './components/ListItems.jsx';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllMsg = async () => {
    try {
      const response = await axios.get(
        'https://dewrtfmmdl.execute-api.eu-north-1.amazonaws.com/messages',
      );

      const { data } = response;

      if (data?.data?.messages) {
        setData(data.data.messages);
      } else {
        setData([]);
        setError('No messages found');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchAllMsg();
  }, []);

  return (
    <main className="max-w-screen-xxl flex min-h-screen flex-col items-center justify-center bg-blue-950 p-5">
      <Button
        onClick={fetchAllMsg}
        className="bg-white hover:bg-gray-400 hover:text-white"
      >
        Fetch all messages
      </Button>
      <ListItems data={data} error={error} />
    </main>
  );
};

export default App;
