import { useState, useEffect } from 'react';
import Button from './components/Button.jsx';
import ListItems from './components/ListItems.jsx';

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllMsg = async () => {
    try {
      const response = await fetch(
        'https://dewrtfmmdl.execute-api.eu-north-1.amazonaws.com/messages',
      );

      const result = await response.json();

      if (result.data && result.data.messages) {
        setData(result.data.messages);
      } else {
        setData([]);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAllMsg();
  }, []);

  return (
    <main className="max-w-screen-xxl flex min-h-screen flex-col items-center justify-center bg-blue-950 p-5">
      <Button
        title="Fetch All Messages"
        onClick={fetchAllMsg}
        className="bg-white hover:bg-gray-400 hover:text-white"
      />
      <ListItems data={data} error={error} />
    </main>
  );
};

export default App;
