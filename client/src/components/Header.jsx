import { faBars } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  return (
    <header className='bg-transparent shadow-lg backdrop-blur-md border-b border-gray-200'>
      <div className='flex items-center justify-between max-w-6xl mx-auto px-4 py-2'>
        <div className='flex items-center gap-8'>
          <Link to='/' className='no-underline text-white'>
            <h1 className='text-white font-bold text-md sm:text-lg font-heading cursor-pointer p-3'>
              <span className=''>Finance Fix</span>
            </h1>
          </Link>

          <button onClick={toggleMenu} className={`ml-60 sm:hidden ${isOpen ? 'transform rotate-180' : ''}`}>
            <FontAwesomeIcon icon={faBars} className="rounded-full" />
          </button>


          <ul className={`absolute sm:relative bg-black sm:bg-transparent transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 ease-in-out top-full left-0 w-full sm:w-auto flex-col sm:flex-row gap-4 list-none px-4 sm:px-0 z-20 sm:flex ${!isOpen && 'hidden'}`}>
            {['/expense-tracker', '/chatbot', '/stocks','/holdings','/contact-us',].map((path, index) => (
              <Link key={index} to={path} className='no-underline'>
                <li className='text-white text-sm sm:text-md font-heading font-light cursor-pointer p-3 hover:bg-[#0328EE] sm:hover:bg-transparent sm:hover:text-[#0328EE]' onClick={toggleMenu}>
                  {path.substring(1).toUpperCase()}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      
        <ul className='flex gap-4'>
          <Link to={currentUser ? 'profile' : 'signin'}>
            {currentUser ? (
              <img src={currentUser.avatar} alt='profile' className='rounded-full h-8 w-8 object-cover' />
            ) : (
              <li className='text-white text-sm sm:text-md font-heading font-light cursor-pointer p-3 hover:bg-[#0328EE] sm:hover:bg-transparent sm:hover:text-[#0328EE]'>
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
