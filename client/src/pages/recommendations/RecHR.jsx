import React from 'react';
import jyoti from './../../assets/hr/jyoti.jpg';
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
