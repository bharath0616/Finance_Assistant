import React from 'react';
import newsletter from '../assets/newsletter.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <div className='mt-32 bg-[#010D50] p-10 w-full'>
      <div className='flex flex-col md:flex-row justify-between items-center mx-4 md:mx-20 mb-10'>
        <Link to="/" className='no-underline text-xl font-bold font-heading text-white'>
          Finance Fix
        </Link>
        <div className='flex gap-2 mt-4 md:mt-0'>
          <a href="https://www.instagram.com/bharath0616/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="bg-gray-400 rounded-full p-1" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="bg-gray-400 rounded-full p-1" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedinIn} className="bg-gray-400 rounded-full p-1" />
          </a>
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-around items-start mx-4 md:mx-20'>
        <div className='flex flex-col md:flex-row gap-3 mb-4 md:mb-0'>
          <div className='flex flex-col gap-2 items-start'>
            <h2 className='text-white text-sm font-heading font-light'>MENU</h2>
            
            <p className='text-white font-heading font-light text-xs'>HOME</p>
            <p className='text-white font-heading font-light text-xs'>CHATBOT</p>
            <p className='text-white font-heading font-light text-xs'>SUPPORT</p>
          </div>
          <div className='flex flex-col gap-2 items-start'>
            <p className='text-white font-heading font-light text-xs'>TOOLS</p>
            <p className='text-white font-heading font-light text-xs'>CONTACT US</p>
          </div>
        </div>
        {/* <div className='flex flex-col gap-3 items-start mt-4 md:mt-0'>
          <div className='flex items-center gap-3'>
            <img src={newsletter} alt="Subscribe to Newsletter" className="w-24 md:w-36 lg:w-48 rounded-xl" />
            <h2 className='text-white font-heading text-lg md:text-xl lg:text-3xl font-bold'>Subscribe to our finance <br/>news weekly newsletter!</h2>
          </div>
          <div className='relative w-full max-w-lg'>
            <input 
              className='bg-white font-heading rounded-full text-md p-4 pr-16 w-full' 
              placeholder='Enter email address'
            />
            <Link 
              to="/subscribe" 
              className='absolute inset-y-0 right-0 flex items-center justify-center bg-[#0328EE] px-4 py-2 rounded-r-full text-white font-heading text-xs cursor-pointer no-underline'
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              Subscribe
            </Link>
          </div>
        </div> */}
      </div>
      <p className='text-white font-heading mt-10 text-center font-light text-xs'>Ⓒ Bharath, Harshith and Saksham- All rights reserved</p>
    </div>
  )
}
