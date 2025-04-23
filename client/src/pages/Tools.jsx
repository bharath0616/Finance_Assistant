import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import salary from '../assets/salary.png'
import sip from '../assets/sip.png'
import glow from '../assets/glow.png'
import tax from '../assets/tax.png'
import planet from '../assets/planet.png'
import portfolio from '../assets/portfolio.png'
import 'aos/dist/aos.css';
import AOS from 'aos';
export default function Tools() {
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 100 })
  })
  return (

    <div className='mt-20 relative z-10'>
      <img src={glow} className="absolute top-12 left-[-10%] bg-transparent w-1/2 opacity-40 z-[-1] mix-blend-screen" alt="Glow" />


      <div className='flex flex-col gap-2 ml-80 mr-80 justify-center relative items-center' data-aos="fade-left">
        <h className='text-white text-4xl font-heading font-bold' >
          PFA EXPENSE TRACKER
        </h>
        <p className='text-white text-lg font-heading font-light text-center' >
          Based on the collected data we provide personalized financial recommendations such as salary breakdown, investment options, etc. The website will also include supplementary financial tools like salary take-home calculator, and investment return calculator.
        </p>
      </div>

      {/*section----->2 */}

      <div className='flex flex-col justify-center items-start '>

        <h className='text-white text-3xl font-heading font-bold mb-10 ml-40 mt-20' data-aos="zoom-in-right">
          What drives a financially smart individual?
        </h>
        <div className='flex flex-col gap-4 ml-40 mr-40'>
          <div className='flex justify-around gap-8 '>
            <div className='w-1/2 p-4' data-aos="fade-down-right">
              <Link to='/data' className='flex bg-[#010D50] p-6
         no-underline rounded-3xl justify-center gap-4'>
                <div>
                  <img src={salary} className='rounded-lg' />
                </div>
                <div className='flex flex-col justify-center '>
                  <h className='text-white font-heading font-semibold text-sm'>SALARY BREAKDOWN</h>
                  <p className='text-white font-heading font-light text-sm '>Understand how to spend your take-home pay with our clear breakdown of the suggestions as per your data.</p>
                </div>
              </Link>
            </div>

            <div className='w-1/2 p-4' data-aos="fade-down-left">
              <Link to='/sipCalculator' className='flex bg-[#010D50] p-6 no-underline 
        rounded-3xl justify-center gap-4'>
                <div>
                  <img src={sip} className='rounded-lg' />
                </div>
                <div className='flex flex-col justify-center '>
                  <h className='text-white font-heading font-semibold text-sm'>SIP CALCULATOR</h>
                  <p className='text-white font-heading font-light text-sm '>
                    Plan your future with our SIP calculator. Estimate returns and achieve your financial goals through Systematic Investment Plans.
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className='flex justify-around gap-8 '>
            <div className='w-1/2 p-4' data-aos="fade-down-left">
              <Link to='/salaryCalculator' className='flex bg-[#010D50] p-6 no-underline 
        rounded-3xl justify-center gap-4'>
                <div>
                  <img src={sip} className='rounded-lg' />
                </div>
                <div className='flex flex-col justify-center '>
                  <h className='text-white font-heading font-semibold text-sm'>SALARY CALCULATOR</h>
                  <p className='text-white font-heading font-light text-sm '>
                    Plan your finances with our Salary Calculator. Calculate your take-home pay and deductions to manage your budget effectively.
                  </p>
                </div>
              </Link>
            </div>

            <div className='w-1/2 p-4' data-aos="fade-down-left">
              <Link to='/emiCalculator' className='flex bg-[#010D50] p-6 no-underline 
        rounded-3xl justify-center gap-4'>
                <div>
                  <img src={sip} className='rounded-lg' />
                </div>
                <div className='flex flex-col justify-center '>
                  <h className='text-white font-heading font-semibold text-sm'>EMI CALCULATOR</h>
                  <p className='text-white font-heading font-light text-sm '>
                    Simplify your loan planning with our EMI Calculator. Calculate monthly installments and repayment details effortlessly for informed financial decisions.
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className='flex justify-around gap-8 '>
            <div className='w-1/2 p-4' data-aos="fade-down-left">
              <Link to='/stockanalyzer' className='flex bg-[#010D50] p-6 no-underline 
        rounded-3xl justify-center gap-4'>
                <div>
                  <img src={sip} className='rounded-lg' />
                </div>
                <div className='flex flex-col justify-center '>
                  <h className='text-white font-heading font-semibold text-sm'>Stock Analyzer</h>
                  <p className='text-white font-heading font-light text-sm '>
                    Simply enter the name of an Indian stock market company, and our tool will fetch the latest data to analyze the stock's performance. Based on real-time market trends, you'll receive a clear recommendation to Buy, Hold, or Sell the stock. Make informed investment decisions with ease.
                  </p>
                </div>
              </Link>
            </div>
            <div className='w-1/2 p-4' data-aos="fade-down-left">
              <Link to='/predictor' className='flex bg-[#010D50] p-6 no-underline 
        rounded-3xl justify-center gap-4'>
                <div>
                  <img src={sip} className='rounded-lg' />
                </div>
                <div className='flex flex-col justify-center '>
                  <h className='text-white font-heading font-semibold text-sm'>Predictor</h>
                  <p className='text-white font-heading font-light text-sm '>
                    Simply enter the name of an Indian stock market company, and our tool will fetch the latest data to analyze the stock's performance. Based on real-time market trends, you'll receive a clear recommendation to Buy, Hold, or Sell the stock. Make informed investment decisions with ease.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/*section----->3 */}
      <div className='flex ml-10 justify-between items-center mt-20 space-x-4'>
        <div className='flex-1 flex flex-col justify-center p-10 mr-20'>
          <div className='flex flex-col justify-center items-start mb-32' data-aos="zoom-in-right">
            <h1 className='text-white text-3xl font-heading font-bold'>Our mission</h1>
            <p className='text-white font-heading text-md  leading-6'>
              Empowering individuals to achieve financial well-being through personalized AI guidance. We provide a user-friendly platform with educational content and interactive tools to help you make informed decisions about budgeting, saving, investing, and overall financial planning.
            </p>
          </div>
          <div className='flex flex-col justify-center' data-aos="zoom-in-right">
            <h1 className='text-white text-3xl font-heading font-bold'>Our story</h1>
            <p className='text-white font-heading text-md leading-6'>
              We believe financial literacy is the key to a secure and fulfilling future. Our story began with the desire to bridge the gap between complex financial concepts and everyday people. Fueled by this passion, we developed an AI-powered financial assistant that personalizes your financial journey. From data collection and analysis to interactive tools and educational content, we strive to be your one-stop shop for achieving financial freedom.
            </p>
          </div>
        </div>

        <div className='flex-1'>
          <img src={planet} className='w-full h-full object-cover' data-aos="zoom-in-left" />
        </div>
      </div>

    </div>

  )
}
