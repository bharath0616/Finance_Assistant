import React from 'react'
import steelcast from '../assets/steelcast.png'
export default function Recommend() {
  return (
    <div  className='flex flex-col justify-center items-stretch'>
      <div className='flex flex-col justify-center items-center mt-20'>
        <h className='text-white font-heading text-4xl font-bold'>
        RECOMMENDED PICKS
        </h>
        <p className='text-white font-heading text-sm font-extralight text-center'>
        Here are our recommendations for the <span className='text-[#00FF38]'>Low</span> risk level<br/> investment selected. 
        Browse through the options<br/>and find associated details below.
        </p>
      </div>

      <div className='flex justify-around gap-4 ml-24 mr-24 mt-20 ' >
  <div id='content' className='flex flex-col gap-10 items-stretch bg-[#010D50] p-10 rounded-xl' style={{ flex: 0.5, marginRight: '20px', padding: '30px' }} >
  <div className='flex'>
    <div className='text-white  font-heading py-1 px-3 mt-4 flex items-stretch justify-center rounded-full bg-[#0328EE] text-xs uppercase font-light'>
      <p>Top Stocks</p>
    </div>
    </div>
    <div className='flex flex-col gap-4'>
      <div>
        <h className='text-[#7B7676] text-lg lg:xl font-heading'>Jyoti Resins</h>
        <hr className="bg-white mb-2 w-full" style={{ height: '0px' }} />
      </div>
      <div>
        <h className='text-[#7B7676] text-lg lg:xl font-heading'>Steelcast</h>
        <hr className="bg-white mb-2 w-full" style={{ height: '0px' }} />
      </div>
      <div>
        <h className='text-[#7B7676] text-lg lg:xl font-heading'>Tania Platforms</h>
        <hr className="bg-white mb-2 w-full" style={{ height: '0px' }} />
      </div>
      <div>
        <h className='text-[#7B7676] text-lg lg:xl font-heading'>Nitta Gelatin</h>
        <hr className="bg-white mb-2 w-full" style={{ height: '0px' }} />
      </div>
      <div>
        <h className='text-[#7B7676] text-lg lg:xl font-heading'>Narayana Hrudaya</h>
        <hr className="bg-white mb-2 w-full" style={{ height: '0px' }} />
      </div>

    </div>
  </div>

  <div id='graph' style={{ flex: 1.2, marginLeft: '20px', padding: '10px' }}>
    <img src={steelcast} alt="Graphical Representation" style={{ width: '100%', height: 'auto' }} />
  </div>

</div>

<div className=" text-white font-heading font-semibold ml-52 mr-20 mt-10 p-6 w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 justify-start">
          <span className="font-semibold">Market Cap - ₹ 1259 Cr.</span>
          <span className="font-semibold">Stock P/E - 16.6</span>
        </div>
        <div className="flex flex-col gap-4 justify-start">
          <span className="font-semibold">CMP - ₹ 622</span>
          <span className="font-semibold">CAGR - 27.4% (5 Years)</span>
        </div>
      </div>
    </div>

<div className='text-white font-heading font-extralight text-xs mt-20 flex justify-center'>
  <i>All information provided is as-per financial industry experts. However, ensure to read all scheme related information carefully and conclusively.</i>
</div>
    </div>
  )
}
