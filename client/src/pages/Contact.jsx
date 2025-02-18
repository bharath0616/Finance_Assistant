import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('/api/contact', formData);
      if (response.status === 200) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      toast.error('Failed to send the message. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="ml-20 mr-20 mt-20" data-aos="fade-down">
      <h className="text-white font-bold text-5xl tracking-tight mb-20">
        Contact Us
      </h>
      <p className="text-white text-md mt-8">
        We would love to hear from you. Please fill in the details below.
      </p>

      <div className="container mx-auto px-4 mt-20">
        <form className="flex flex-col gap-10 p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2" data-aos="fade-right">
              <label htmlFor="name" className="text-white text-md">Name</label>
              <input
                type="text"
                className="border p-4 bg-[#010D50] border-transparent shadow-md rounded-full text-white"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2" data-aos="fade-left">
              <label htmlFor="email" className="text-white text-md">Email</label>
              <input
                type="email"
                className="border p-4 bg-[#010D50] shadow-md border-transparent rounded-full text-white"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2" data-aos="fade-right">
            <label htmlFor="message" className="text-white text-md">Message</label>
            <textarea
              className="border p-4 bg-[#010D50] border-transparent shadow-md rounded-lg text-white"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-red-800 text-white p-3 rounded-full border-transparent hover:bg-gray-700 text-xs uppercase"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
