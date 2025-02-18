  import React, { useEffect, useState } from 'react'
  import motilal from './../../assets/mr/motilal.jpg'
  import bajaj from './../../assets/mr/bajaj.jpg'
  import jindal from './../../assets/mr/jindal.jpg'
  import ongc from './../../assets/mr/ongc.jpg'
  import StockRecommendation from '../../components/recommendations/stockRecommendation'
  import 'aos/dist/aos.css'; 
  import AOS from 'aos';
  const stocksData = {
      'Motilal Oswal Financial services': {
        graph: motilal, 
        marketCap: '₹ 30,197 Cr.',
        stockPE: '16.0',
        cmp: '₹ 2,027',
        cagr: '173%',
      },
      'Bajaj Fin': {
        graph: bajaj, 
        marketCap:'₹ 2,58,230 Cr.',
        stockPE:'33.1',
        cmp:'₹ 1,618',
        cagr: '113%',
      },
      'Jindal Steel': {
          graph: jindal, 
          marketCap:'₹ 91,992 Cr.',
          stockPE:'16.6',
          cmp:'₹ 902',
          cagr: '373%',
        },
        'ONGC': {
          graph: ongc, 
          marketCap:'₹ 3,56,211 Cr.',
          stockPE:'7.77',
          cmp:'₹ 283',
          cagr: '76.03%',
        },
    };  
    export default function RecMR() {
      return (
          <StockRecommendation
              title="RECOMMENDED PICKS"
              description="Here are our recommendations for the Medium risk level investment selected. Browse through the options and find associated details below."
              stocksData={stocksData}
          />
      );
  }