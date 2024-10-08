import { useState, useEffect } from 'react';
import ListItems from './ListItems.jsx';
import Button from './Button.jsx';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa6';

const NewMessage = ({ data, error, fetchData }) => {
  const [formData, setFormData] = useState({ userName: '', message: '' });
  const [status, setStatus] = useState({ success: null, error: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ success: null, error: null });

    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (!formData.message && !formData.userName) {
      setStatus({
        success: null,
        error: 'Message and username are required!',
      });
      return;
    }

    if (!formData.message) {
      setStatus({
        success: null,
        error: 'Message is required!',
      });
      return;
    }

    if (formData.userName.length < 2) {
      setStatus({
        success: null,
        error: 'Username must be at least 2 characters long!',
      });
      return;
    }

    if (!usernameRegex.test(formData.userName)) {
      setStatus({
        success: null,
        error: 'Username can only contain letters and numbers!',
      });
      return;
    }

    try {
      await axios.post(
        'https://ggjgn976y7.execute-api.eu-north-1.amazonaws.com/messages',
        formData,
      );

      setStatus({ success: 'Message created!', error: null });
      setFormData({ userName: '', message: '' });

      if (fetchData) {
        fetchData();
      }
    } catch (error) {
      setStatus({
        success: null,
        error:
          error.response?.data?.message || 'Username and message are required!',
      });
    }
  };

  useEffect(() => {
    if (status.success) {
      const timer = setTimeout(() => {
        setStatus((prevStatus) => ({ ...prevStatus, success: null }));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status.success]);

  const renderInput = (label, name, value, placeholder, type = 'text') => (
    <>
      <label htmlFor={name} className="my-2 font-bold text-white">
        {label}
      </label>
      <div className="flex items-center justify-center">
        <input
          className="mr-auto w-3/4 rounded-md py-2 pl-2 sm:w-3/4"
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          className="bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
        >
          <FaPlus className="size-6" />
        </Button>
      </div>
    </>
  );

  return (
    <>
      <section className="flex w-full max-w-[25rem] flex-col items-center justify-center">
        <h1 className="text-center text-3xl font-bold text-white">
          New Message
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col sm:min-w-[25rem]"
        >
          <textarea
            name="message"
            className="mt-4 min-h-64 w-full rounded-md px-5 py-5 text-lg"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleInputChange}
          />

          {renderInput(
            'Enter username:',
            'userName',
            formData.userName,
            'Username',
          )}

          {status.error && (
            <p className="mt-1 text-center text-red-500">{status.error}</p>
          )}
          {status.success && (
            <p className="mt-1 text-center text-green-500">{status.success}</p>
          )}
        </form>
      </section>
      <ListItems data={data} error={error} fetchData={fetchData} />
    </>
  );
};

export default NewMessage;
