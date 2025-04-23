/* import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos'; */
/* 
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

export default StockRecommendation; */
import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const sectorDetails = {
    XLY: {
        name: "Consumer Discretionary Select Sector (XLY)",
        description: "Includes companies providing non-essential goods and services like automobiles, apparel, and entertainment. It thrives when consumer confidence and disposable income are high, making it suitable for moderate to high-risk investors."
    },
    XLP: {
        name: "Consumer Staples Select Sector (XLP)",
        description: "Comprises companies that produce essential items like food, beverages, and household goods. Known for low volatility and consistent demand, making it appealing for risk-averse investors."
    },
    XLE: {
        name: "Energy Select Sector (XLE)",
        description: "Represents oil, gas, and renewable energy companies. Benefits from rising energy prices and inflation trends. Suited for opportunistic investors looking to benefit from macroeconomic catalysts."
    },
    XLK: {
        name: "Technology Select Sector (XLK)",
        description: "Represents companies driving innovation through software, hardware, and IT services. Known for rapid growth and innovation, ideal for investors with a high-risk, high-reward appetite."
    },
    XLV: {
        name: "Health Care Select Sector (XLV)",
        description: "Includes pharmaceutical companies, biotech firms, and medical device manufacturers. A defensive sector that performs well across economic cycles, appealing to moderate-risk investors."
    },
    XLF: {
        name: "Financial Select Sector (XLF)",
        description: "Consists of banks, insurance companies, and investment firms. Sensitive to economic cycles and interest rate changes, fitting for investors who want to leverage economic rebounds."
    },
    XLI: {
        name: "Industrial Select Sector (XLI)",
        description: "Features companies in manufacturing, construction, aerospace, and logistics. Benefits from economic expansion and government spending, ideal for targeting cyclical growth opportunities."
    }
};

const StockRecommendation = ({ title, description, indices }) => {
    const [apiData, setApiData] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, offset: 100 });

        const fetchData = async () => {
            try {
                const res = await fetch("https://sector-analysis-hqaucfc9b2b3gves.eastus-01.azurewebsites.net/recommend-sectors");
                const data = await res.json();
                setApiData(data);
            } catch (err) {
                console.error("API Fetch error:", err);
            }
        };

        fetchData();
    }, []);

    const filteredData = apiData.filter((_, index) => indices.includes(index));

    const handleStockSelection = (stock) => {
        setSelectedStock(stock);
    };

    return (
        <div className='flex flex-col justify-center items-stretch'>
            <div className='flex flex-col justify-center items-center mt-20' data-aos='fade-right'>
                <h1 className='text-white font-heading text-4xl font-bold'>RECOMMENDED PICKS</h1>
                <p className='text-white font-heading text-sm font-extralight text-center'>
                    {description}
                </p>
            </div>

            <div className='flex justify-around gap-8 ml-24 mr-24 mt-20'>
                <div className='bg-[#010D50] p-10 rounded-xl' style={{ flexBasis: '30%' }} data-aos='fade-left'>
                    <div className='flex'>
                        <div className='text-white font-heading py-1 px-3 mt-4 rounded-full bg-[#0328EE] text-xs uppercase font-light'>
                            <p>Top Sectors</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 mt-6'>
                        {filteredData.map((stock, idx) => (
                            <div key={idx} onClick={() => handleStockSelection(stock)} className='cursor-pointer'>
                                <h2 className={`text-lg lg:xl font-heading ${selectedStock === stock ? 'text-white' : 'text-[#7B7676]'}`}>
                                    {stock.sector}
                                </h2>
                                <hr className="bg-white mb-2" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='rounded-lg overflow-hidden' style={{ flexGrow: 1, flexBasis: '100%', maxWidth: '100%' }}>
                    {selectedStock && (
                        <div className='text-white text-left text-md p-6'>
                            <h2 className='text-2xl font-bold mb-4'>
                                📈 {sectorDetails[selectedStock.sector]?.name || selectedStock.sector}
                            </h2>

                            <p className='mb-4'>
                                💡 <span className='font-semibold'>Why this recommendation?</span><br />
                                Based on recent market trends and sector dynamics, <b>{selectedStock.sector}</b> is showing a 
                                <b> {selectedStock.probability}%</b> chance of outperforming the market.
                            </p>

                            <p>
                                📊 <span className='font-semibold'>Sector Overview:</span><br />
                                {sectorDetails[selectedStock.sector]?.description || "Detailed description not available for this sector."}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className='text-white font-heading font-extralight text-xs mt-20 flex justify-center'>
                <i>All information provided is as-per financial industry experts. However, ensure to read all scheme related information carefully and conclusively.</i>
            </div>
        </div>
    );
};

export default StockRecommendation;
