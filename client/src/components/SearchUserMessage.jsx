import { useState } from 'react';
import ListItems from './ListItems.jsx';
import Button from './Button.jsx';
import axios from 'axios';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchUserMessage = ({ fetchData }) => {
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchInput) {
      setError('Please enter a valid username');
      setData([]);
      return;
    }

    setError(null);

    try {
      const response = await axios.get(
        `https://s96wqm3xt5.execute-api.eu-north-1.amazonaws.com/messages/${searchInput}`,
      );

      const { data } = response;
      if (data?.data?.messages) {
        setData(data.data.messages);
      } else {
        setData([]);
        setError(`username: "${searchInput}" not found`);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || `username: "${searchInput}" not found`,
      );
      setData([]);
    }
  };

  const refetchUserMessages = async () => {
    setError(null);

    try {
      const response = await axios.get(
        `https://s96wqm3xt5.execute-api.eu-north-1.amazonaws.com/messages/${searchInput}`,
      );

      const { data } = response;
      if (data?.data?.messages) {
        setData(data.data.messages);
      } else {
        setData([]);
        setError(`username: "${searchInput}" not found`);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || `username: "${searchInput}" not found`,
      );
      setData([]);
    }
  };

  return (
    <>
      <section className="flex w-full max-w-[25rem] flex-col items-center justify-center">
        <h1 className="text-center text-3xl font-bold text-white">
          Search User Message
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center sm:min-w-[25rem]"
        >
          <label
            htmlFor="SearchUserMessage"
            className="my-2 self-start font-bold text-white"
          >
            Enter Username:
          </label>
          <div className="flex w-full items-center justify-center">
            <input
              className="mr-auto w-3/4 rounded-md py-2 pl-2 sm:w-3/4"
              type="text"
              name="userId"
              value={searchInput}
              placeholder="Username"
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              className="bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
            >
              <FaMagnifyingGlass className="size-6" />
            </Button>
          </div>
        </form>
      </section>
      <ListItems data={data} error={error} fetchData={refetchUserMessages} />
    </>
  );
};

export default SearchUserMessage;
