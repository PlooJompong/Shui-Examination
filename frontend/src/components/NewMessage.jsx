import { useState, useEffect } from 'react';
import Button from './Button.jsx';
import axios from 'axios';

const NewMessage = ({ fetchData }) => {
  const [formData, setFormData] = useState({ userName: '', message: '' });
  const [status, setStatus] = useState({ success: null, error: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ success: null, error: null });

    try {
      await axios.post(
        'https://dewrtfmmdl.execute-api.eu-north-1.amazonaws.com/messages',
        formData,
      );

      setStatus({ success: 'Message created!', error: null });
      setFormData({ userName: '', message: '' });

      if (fetchData) fetchData();
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
      }, 3000);

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
          className="bg-indigo-500 text-white hover:bg-indigo-600"
        >
          Create
        </Button>
      </div>
    </>
  );

  return (
    <section className="flex w-full max-w-[25rem] flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white">New Message</h1>
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

        {status.error && <p className="mt-1 text-red-500">{status.error}</p>}
        {status.success && (
          <p className="mt-1 text-green-500">{status.success}</p>
        )}
      </form>
    </section>
  );
};

export default NewMessage;
