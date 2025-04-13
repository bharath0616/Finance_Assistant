/*   import React, { useEffect, useState } from 'react'
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
    };   */
    import React from 'react';
    import StockRecommendation from '../../components/recommendations/stockRecommendation';
    
    const RecMR = () => {
        return (
            <StockRecommendation
                title="Medium Confidence Sectors"
                description="Sectors with moderate probability."
                indices={[2, 3]}
            />
        );
    };
    
    export default RecMR;
    