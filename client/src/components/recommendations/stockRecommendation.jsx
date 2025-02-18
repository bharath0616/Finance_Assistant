import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const StockRecommendation = ({ title, description, stocksData }) => {
    useEffect(() => {
        AOS.init({ duration: 1000, offset: 100 });
    }, []);

    const [selectedStock, setSelectedStock] = useState(null);

    const handleStockSelection = (stockName) => {
        setSelectedStock(stocksData[stockName]);
    };

    return (
        <div className='flex flex-col justify-center items-stretch'>
            <div className='flex flex-col justify-center items-center mt-20' data-aos='fade-right'>
                <h1 className='text-white font-heading text-4xl font-bold'>
                    RECOMMENDED PICKS
                </h1>
                <p className='text-white font-heading text-sm font-extralight text-center'>
                    {description}
                </p>
            </div>

            <div className='flex justify-around gap-8 ml-24 mr-24 mt-20'>
                <div className='bg-[#010D50] p-10 rounded-xl' style={{ flexBasis: '30%' }} data-aos='fade-left'>
                    <div className='flex'>
                        <div className='text-white font-heading py-1 px-3 mt-4 rounded-full bg-[#0328EE] text-xs uppercase font-light'>
                            <p>Top Stocks</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 mt-6'>
                        {Object.keys(stocksData).map(stockName => (
                            <div key={stockName} onClick={() => handleStockSelection(stockName)} className='cursor-pointer'>
                                <h2 className={`text-lg lg:xl font-heading ${selectedStock && selectedStock === stocksData[stockName] ? 'text-white' : 'text-[#7B7676]'}`} >
                                    {stockName}
                                </h2>
                                <hr className="bg-white mb-2" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='rounded-lg overflow-hidden' style={{ flexGrow: 1, flexBasis: '100%', maxWidth: '100%' }}>
                    {selectedStock && (
                        <img src={selectedStock.graph} alt={`${selectedStock} Graphical Representation`} className="w-full h-full" />
                    )}
                </div>
            </div>

            {selectedStock && (
                <div className="text-white font-heading font-semibold mt-10 ml-40 p-6">
                    <div className="grid grid-cols-2 gap-4" data-aos='fade-up'>
                        <div className="flex flex-col gap-4 justify-start">
                            <span className="font-semibold">Market Cap - {selectedStock.marketCap}</span>
                            <span className="font-semibold">Stock P/E - {selectedStock.stockPE}</span>
                        </div>
                        <div className="flex flex-col gap-4 justify-start">
                            <span className="font-semibold">CMP - {selectedStock.cmp}</span>
                            <span className="font-semibold">CAGR - {selectedStock.cagr} (5 Years)</span>
                        </div>
                    </div>
                </div>
            )}

            <div className='text-white font-heading font-extralight text-xs mt-20 flex justify-center'>
                <i>All information provided is as-per financial industry experts. However, ensure to read all scheme related information carefully and conclusively.</i>
            </div>
        </div>
    );
};

export default StockRecommendation;
