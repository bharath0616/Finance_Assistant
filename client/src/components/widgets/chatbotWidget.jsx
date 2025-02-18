import React, { useState } from 'react';
import Chatbot from '../../pages/Chatbot';
import Draggable from 'react-draggable';
import chatbot from '../../assets/chatbot.png'
export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleHover = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <Draggable>
    <>
 
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)} 
        ></div>
      )}

      <div
        className="fixed bottom-5 right-5 z-50"
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >

        <div
          className="w-16 h-16 bg-blue-500 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-600"
          title="Chat with us"
        >
          <img
            src={chatbot}
            alt="Chatbot Icon"
            className="w-10 h-10"
          />
        </div>

        {isOpen && (
          <div
            className="absolute bottom-12 right-0  shadow-lg rounded-lg w-96 p-4 animate-fadeIn z-50"
          >
            <Chatbot />
          </div>
        )}
      </div>
      
    </>
    </Draggable>
  );
}
