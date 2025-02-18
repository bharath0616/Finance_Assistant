import React from 'react'
import { Link } from 'react-router-dom'

export default function TaxCalculator() {
  return (
    <div className='flex flex-col items-center mt-12 ml-10 mr-10'>
      <div className='flex flex-col items-center justify-center'>
      <h className='text-white text-5xl font-heading font-bold'>TAX CALCULATOR</h>
      <p className='text-white text-sm mb-10 font-extralight font-heading'>Plan your future with our SIP calculator. Estimate returns and<br/> achieve your financial goals through Systematic Investment Plans.</p>
      </div>
      <div className='flex justify-around items-center gap-8'>
        <div className='flex flex-col gap-3 bg-[#010D50] rounded-3xl p-8'>
          <div className='text-white font-heading  w-1/4  flex items-center 
          justify-center rounded-full bg-[#0328EE]'>
            <p>Basic</p>
          </div>
          <h className='text-white font-heading font-bold text-4xl'>
            LOW RISK
          </h>  
          <p className='text-white font-heading text-sm tracking-wider'>
          Want to grow your money slowly and steadily? Low-risk SIPs invest in things like savings accounts or short-term bonds. Think of it like a piggy bank that might earn a little extra.
          </p>
          <div className='flex flex-col gap-2'>
             <h className='text-white font-heading font-semibold'>FEATURES</h>
             <div className='flex flex-col '>
              <p className='text-white font-heading'> - Low and Steady Growth</p>
              <p className='text-white font-heading'> - Low and Steady Growth</p>
              <p className='text-white font-heading'> - Low and Steady Growth</p>
             </div>
          </div>
          <div className='flex justify-start'>
          <Link to='/taxlow' className=' no-underline flex items-center justify-center
           bg-white py-4 px-8 rounded-full mt-4 text-[#0328EE] font-heading 
           font-bold cursor-pointer shadow-lg transition-all hover:bg-opacity-90'>
                   GET STARTED
                </Link>
        </div>
        </div>

        <div className='flex flex-col gap-3 bg-[#010D50] rounded-3xl p-8'>
          <div className='text-white font-heading P-2 w-1/4  flex items-center 
          justify-center rounded-full bg-[#0328EE]'>
            <p>Pro</p>
          </div>
          <h className='text-white font-heading font-bold text-4xl'>
            MEDIUM RISK
          </h>  
          <p className='text-white font-heading text-sm tracking-wider'>
          Looking for a balance? Medium-risk SIPs invest in a bit of everything, like stocks and bonds. It's like having a fruit salad - some sweet, some not so sweet, but all good!
          </p>
          <div className='flex flex-col gap-2'>
             <h className='text-white font-heading font-semibold'>FEATURES</h>
             <div className='flex flex-col '>
              <p className='text-white font-heading'> - Balanced Approach</p>
              <p className='text-white font-heading'> - Moderate Growth</p>
              <p className='text-white font-heading'> - Diversification</p>
             </div>
          </div>
          <div className='flex justify-start'>
          <Link to='/taxmedium' className=' no-underline flex items-center justify-center
           bg-white py-4 px-8 rounded-full mt-4 text-[#0328EE] font-heading 
           font-bold cursor-pointer shadow-lg transition-all hover:bg-opacity-90'>
                   GET STARTED
                </Link>
        </div>
        </div>

        <div className='flex flex-col gap-3 bg-[#010D50] rounded-3xl p-8'>
          <div className='text-white font-heading P-2 w-1/4  flex items-center 
          justify-center rounded-full bg-[#0328EE]'>
            <p>Expert</p>
          </div>
          <h className='text-white font-heading font-bold text-4xl'>
            HIGH RISK
          </h>  
          <p className='text-white font-heading text-sm tracking-wider'>
          Feeling adventurous? High-risk SIPs invest mostly in stocks, aiming for big returns but with a chance of some bumps along the way. Think of it like a roller coaster-exciting, but scary
          </p>
          <div className='flex flex-col gap-2'>
             <h className='text-white font-heading font-semibold'>FEATURES</h>
             <div className='flex flex-col '>
              <p className='text-white font-heading'> - High Potential Returns</p>
              <p className='text-white font-heading'> - Stock Investment</p>
              <p className='text-white font-heading'> - Higher Volatility</p>
             </div>
          </div>
          <div className='flex justify-start'>
          <Link to='/taxhigh' className=' no-underline flex items-center justify-center
           bg-white py-4 px-8 rounded-full mt-4 text-[#0328EE] font-heading 
           font-bold cursor-pointer shadow-lg transition-all hover:bg-opacity-90'>
                   GET STARTED
                </Link>
        </div>
        </div>
        
      </div>
    </div>
  )
}
