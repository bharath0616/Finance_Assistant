import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';

import pc from '../assets/pc.png';
import glow from '../assets/glow.png';
import g1 from '../assets/g1.png';
import g2 from '../assets/g2.png';
import g3 from '../assets/g3.png';
import g4 from '../assets/g4.png';
import g5 from '../assets/g5.png';
import robo from '../assets/robo.png';
import s41 from '../assets/s4-1.png';
import s42 from '../assets/s4-2.png';
import s43 from '../assets/s4-3.png';
import s44 from '../assets/s4-4.png';
import s45 from '../assets/s4-5.png';
import video from '../assets/video.png';
import investment from '../assets/investment.png';
import debt from '../assets/debt.png';
import credit from '../assets/credit.png';
import face from '../assets/face.png';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 100 });
  });

  return (
    <div className='flex flex-col w-full overflow-hidden'>
      {/* First section */}
      <div className='flex flex-col lg:flex-row justify-around items-center my-8 px-4 lg:px-40'>
        <div className='flex flex-col mb-10 lg:mb-0' data-aos='fade-right'>
          <h1 className='text-white font-heading font-bold text-3xl lg:text-5xl'>
            Welcome to Personalized Financial Assistant
          </h1>
          <p className='text-white font-heading font-light mt-4'>
            An all-in-one solution integrating personalized recommendations,
            interactive chatbot support, and comprehensive content management for
            enhanced financial literacy.
          </p>
          <Link to='/data' className='no-underline bg-[#0328EE] p-3 w-40 flex items-center justify-center rounded-full mt-4'>
            <li className='text-white list-none bg-[#0328EE] text-sm lg:text-md font-heading font-bold cursor-pointer'>
              Enter Data
            </li>
          </Link>
        </div>

        <div className='relative flex justify-center items-end mt-10 lg:mt-0'>
          <img src={glow} className="absolute top-[-20%] right-32 bg-transparent h-xl w-full opacity-70 z-0" alt="Glow"/>
          <img src={pc} className="relative bg-transparent z-10 h-auto max-w-sm lg:max-w-lg" data-aos='fade-left' alt="PC"/>
        </div>
      </div>

      {/* Second section */}
      <div className='flex flex-col items-center mt-20 px-4 lg:px-40' data-aos='fade-down'>
        <h1 className='text-white text-center font-heading font-bold text-xl'>
          A few services we offer
        </h1>
        <p className='text-white font-heading font-light mt-2'>
          Feel free to click on the desired tool to start using it today!!!
        </p>
        <div className="p-5 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Service cards */}
            {[
              { img: g1, title: "FINANCIAL RECOMMENDER", desc: "Input your amount to invest and risk tolerance, and receive a tailored investment plan based on the current market trends" },
              { img: g2, title: "CHATBOT", desc: "Converse with our in-house chatbot to clarify on any questions you may have, be it from a previous conversation or a new query" },
              { img: g3, title: "EXPENSE TRACKER", desc: "Our tool categorizes your spending into different baskets, offering visual insights into your expenditure pattern" },
              { img: g4, title: "SALARY CALCULATOR", desc: "Calculate your net take-home salary after considering taxes and inflation" }, 
            ].map((service, index) => (
              <div className="flex flex-col items-start justify-around rounded-xl p-8 bg-[#010D50] shadow-md" data-aos={index % 2 === 0 ? 'fade-up-right' : 'fade-up-left'} key={index}>
                <img src={service.img} alt="" className="w-12"/>
                <h2 className="mt-2 text-white font-heading font-bold">{service.title}</h2>
                <p className="mt-1 text-white font-heading font-light text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third section */}
      <div className='flex flex-col lg:flex-row justify-between items-center bg-[#0328EE] w-full h-auto mt-20 mb-20 px-4 lg:px-40' data-aos='zoom-in-up'>
        <div className='flex flex-col mb-10 lg:mb-0'>
          <h1 className='text-white font-heading font-bold text-3xl lg:text-4xl'>
            Explore endless possibilities with PFA your Personalized Financial Assistant
          </h1>
          <p className='text-white font-heading font-light mt-4'>
            The future of investing is here. Are you ready for it?
          </p>
          <div className='flex justify-start '>
          <Link to='/signin' className=' no-underline bg-white p-4 rounded-full mt-4 text-[#0328EE] font-heading font-bold cursor-pointer shadow-lg transition-all hover:bg-opacity-90'>
            EXPLORE NOW
          </Link>
          </div>
        </div>
        
        <div className='flex justify-center items-center mt-10 lg:mt-0'>
          <img src={robo} className='w-48 lg:w-96 h-auto' alt="Robo Assistant" />
        </div>
      </div>

      
    </div>
  );
}
