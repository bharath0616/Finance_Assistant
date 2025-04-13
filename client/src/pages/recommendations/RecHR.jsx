/* import React from 'react'; */
/* import jyoti from './../../assets/hr/jyoti.jpg';
import zomato from './../../assets/hr/zomato.jpg';
import triveni from './../../assets/hr/triveni.jpg';
import StockRecommendation from '../../components/recommendations/stockRecommendation'

const stocksData = {
    'JYOTI RESINS': {
        graph: jyoti,
        marketCap: '₹ 1,611 Cr.',
        stockPE: '24.9',
        cmp: '₹ 1,343',
        cagr: '2,386%',
    },
    'ZOMATO': {
        graph: zomato,
        marketCap: '₹ 1,64,445 Cr.',
        stockPE: 'NIL',
        cmp: '₹ 186',
        cagr: '62.3%',
    },
    'TRIVENI ENGINEERING': {
        graph: triveni,
        marketCap: '₹ 7,152 Cr.',
        stockPE: '16.8',
        cmp: '₹ 327',
        cagr: '403%',
    },
};

export default function RecHR() {
    return (
        <StockRecommendation
            title="RECOMMENDED PICKS"
            description="Here are our recommendations for the High risk level investment selected. Browse through the options and find associated details below."
            stocksData={stocksData}
        />
    );
}
 */

import React, { useEffect } from 'react';
import StockRecommendation from '../../components/recommendations/stockRecommendation';

const RecHR = () => {
    return (
        <StockRecommendation
            title="High Confidence Sectors"
            description="Top 2 sectors based on probability."
            indices={[0, 1]}
        />
    );
};

export default RecHR;

//endpoint test------->

/* export default function RecHR() {
    const api="https://sector-analysis-hqaucfc9b2b3gves.eastus-01.azurewebsites.net/recommend-sectors"
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('https://sector-analysis-hqaucfc9b2bgves.eastus-01.azurewebsites.net/recommend-sectors');
                    const data = await response.json();
                    console.log('API Response:', data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
    
            fetchData();
        }, []);
  return (
    <div>
      
    </div>
  )
}
 */
