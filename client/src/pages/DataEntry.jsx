import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataStart, dataSuccess, dataFailure, resetData } from '../redux/user/userSlice';
import { PieChart } from 'react-minimal-pie-chart';
import { useNavigate } from 'react-router-dom';
import 'aos/dist/aos.css'; 
import AOS from 'aos';
import toast, { Toaster } from 'react-hot-toast'; 

export default function DataEntry() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const { loading, error, data: results } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, offset: 100 });
  }, []);

  useEffect(() => {
    dispatch(resetData());
  }, [dispatch]);

  const totalInvested = results
    ? results.shares + results.mutualFunds + results.bonds + results.savings
    : 0;

  const getPercentage = (value) => (value / totalInvested) * 100;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(dataStart());
    try {
      const response = await fetch('/api/calc/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(dataSuccess(data));
        setSubmitted(true);
        toast.success('Investment plan generated successfully!');
      } else {
        dispatch(dataFailure(data.message));
        toast.error(data.message); 
      }
    } catch (error) {
      dispatch(dataFailure(error.toString()));
      toast.error('Error submitting the form.'); 
    }
  };

  const handleNavigate = () => {
    switch (formData.riskTolerance) {
      case 'Very high':
      case 'High':
        navigate('/recommendations-hr');
        break;
      case 'Medium':
        navigate('/recommendations-mr');
        break;
      case 'Low':
      case 'Very low':
        navigate('/recommendations-lr');
        break;
      default:
        break;
    }
  };

  const handleNavigate2 = () => {
    navigate('/sipCalculator');
  };

  const radius = 50;
  const labelPosition = 60;
  const pieChartData = results
    ? [
        { title: 'Shares', value: getPercentage(results.shares), color: '#E38627' },
        { title: 'Mutual Funds', value: getPercentage(results.mutualFunds), color: '#C13C37' },
        { title: 'Bonds', value: getPercentage(results.bonds), color: '#6A2135' },
        { title: 'Savings', value: getPercentage(results.savings), color: '#3DA5D9' },
      ]
    : [];

  return (
    <div className='ml-20 mr-20 mt-20' data-aos='fade-down'>
      <h className='text-white font-bold font-heading text-5xl tracking-tight mb-20'>
        Let’s Build Your Investment Blueprint!
      </h>
      <p className='text-white font-heading text-md mt-8'>
        Please enter the following details for us to generate you an investment plan that fits your needs.
      </p>

      <div className='container mx-auto px-4 mt-20'>
        <form className='flex flex-col gap-10 p-6' onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2' data-aos='fade-right'>
              <label htmlFor='income' className='text-white font-heading text-md'>Income</label>
              <input
                type="number"
                className='border p-4 bg-[#010D50] border-transparent shadow-md rounded-full text-white'
                id='income'
                autoComplete='income'
                onChange={handleChange}
              />
              <p className='text-white font-heading font-bold text-sm'>
                Enter your annual cash inflow from all sources including salary, rental yield, passive incomes.
              </p>
            </div>

            <div className='flex flex-col gap-2' data-aos='fade-left'>
              <label htmlFor='monthlyExpenditure' className='text-white font-heading text-md'>Monthly Expense</label>
              <input
                type="number"
                className='border p-4 bg-[#010D50] shadow-md border-transparent rounded-full text-white'
                id='monthlyExpenditure'
                autoComplete='monthlyExpenditure'
                onChange={handleChange}
              />
              <p className='text-white font-heading font-bold text-sm'>
                Input your estimated annual fixed costs. The difference of these two inputs will be used for giving investment recommendations.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-6 mt-10'>
            <div className='flex flex-col gap-2' data-aos='fade-right'>
              <label htmlFor='name' className='text-white font-heading text-md'>Name</label>
              <input
                type="text"
                className='border p-4 bg-[#010D50] border-transparent shadow-md rounded-full text-white'
                id='name'
                autoComplete='name'
                onChange={handleChange}
              />
              <p className='text-white font-heading font-bold text-sm'>Enter your name.</p>
            </div>

            <div className='flex flex-col gap-2' data-aos='fade-up'>
              <label htmlFor='riskTolerance' className='text-white font-heading text-md'>Risk Tolerance</label>
              <select
                className='border p-4 bg-[#010D50] border-transparent shadow-md rounded-full text-white'
                id='riskTolerance'
                autoComplete='riskTolerance'
                onChange={handleChange}
              >
                <option value="">Select your risk tolerance</option>
                <option>Very high</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
                <option>Very low</option>
              </select>
              <p className='text-white font-heading font-bold text-sm'>
                Provide risk appetite. Remember, the greater the risk, the greater the returns.
              </p>
            </div>
          </div>

          <h className='text-white font-heading text-xl font-bold mt-16'>
            Try Out Our Specialized Financial Tools:
          </h>
          <div className='flex justify-center mt-10'>
            <button
              type="submit"
              data-aos='zoom-in-up'
              className='bg-red-800 text-white font-heading p-3 rounded-full border-transparent hover:bg-gray-700 disabled:bg-gray-500 text-xs uppercase mr-10'
            >
              Investment Breakdown
            </button>
            <button
              data-aos='zoom-in-up'
              className='bg-red-800 text-white font-heading p-3 rounded-full border-transparent hover:bg-gray-700 disabled:bg-gray-500 text-xs uppercase ml-10'
              onClick={handleNavigate2}
            >
              SIP Calculator
            </button>
          </div>
        </form>
      </div>

      {results && (
        <div className='flex flex-col justify-center'>
          <div className='flex justify-around gap-4 mt-10'>
            <div className='mt-6 text-white'>
              <h2 data-aos='fade-right' className='text-xl font-heading font-bold'>
                As per your requirements, the following <br />investment distribution would be optimal-
              </h2>
              <p data-aos='fade-right' className='text-white font-heading font-light'>
                Mutual Funds: {results.mutualFunds} ({getPercentage(results.mutualFunds)}%)
              </p>
              <p data-aos='fade-right' className='text-white font-heading font-light'>
                Shares: {results.shares} ({getPercentage(results.shares)}%)
              </p>
              <p data-aos='fade-right' className='text-white font-heading font-light'>
                Savings: {results.savings} ({getPercentage(results.savings)}%)
              </p>
              <p data-aos='fade-right' className='text-white font-heading font-light'>
                Bonds: {results.bonds} ({getPercentage(results.bonds)}%)
              </p>
            </div>
            <div data-aos='zoom-in-left' className='flex justify-center items-center w-md'>
              <PieChart
                data={pieChartData}
                label={({ dataEntry }) => `${Math.round(dataEntry.value)}%`}
                labelStyle={{
                  fontSize: '5px',
                  fontFamily: 'sans-serif',
                  fill: '#fff',
                }}
                radius={radius}
                labelPosition={labelPosition}
              />
            </div>
          </div>
          <div className='flex items-center justify-center '>
            <button
              data-aos='zoom-in-up'
              className='mt-4 bg-blue-500 hover:bg-blue-700 border-transparent text-white font- font-heading py-2 px-4 rounded-full'
              onClick={handleNavigate}
            >
              Your Recommended Stocks
            </button>
          </div>
        </div>
      )}
        {/* Toaster added for notifications */}
    </div>
  );
};
