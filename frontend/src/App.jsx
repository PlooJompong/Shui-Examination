import { useState, useEffect } from 'react';
import ListItems from './components/ListItems.jsx';
import NewMessage from './components/NewMessage.jsx';
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
      <NewMessage fetchData={fetchAllMsg} />
      <ListItems data={data} error={error} fetchData={fetchAllMsg} />
    </main>
  );
};

export default App;
