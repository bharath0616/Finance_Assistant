import React, { useEffect, useState } from 'react'
import tcs from './../../assets/lr/tcs.jpg'
import hdfcbank from './../../assets/lr/hdfc.jpg'
import hul from './../../assets/lr/hul.jpg'
import ril from './../../assets/lr/reliance.jpg'
import StockRecommendation from '../../components/recommendations/stockRecommendation'
import 'aos/dist/aos.css'; 
import AOS from 'aos';
const stocksData = {
    'TCS': {
      graph: tcs, 
      marketCap: '₹ 13,84,353 Cr.',
      stockPE: '29.7',
      cmp: '₹ 3,826',
      cagr: '23.03%',
    },
    'HDFC Bank': {
      graph: hdfcbank, 
      marketCap:'₹ 11,63,315 Cr.',
      stockPE:'18.2',
      cmp:'₹ 1531',
      cagr: '-8.25%',
    },
    'HUL': {
        graph: hul, 
        marketCap:'₹ 5,24,335 Cr.',
        stockPE:'50.8',
        cmp:'₹ 2,232',
        cagr: '-6.63%',
      },
    'Reliance Industries': {
        graph: ril, 
        marketCap:'₹ 19,89,282 Cr.',
        stockPE:'28.5',
        cmp:'₹ 2,940',
        cagr: '25.28%',
      },
   
  };  
  export default function ReLR() {
    return (
        <StockRecommendation
            title="RECOMMENDED PICKS"
            description="Here are our recommendations for the Low risk level investment selected. Browse through the options and find associated details below."
            stocksData={stocksData}
        />
    );
}