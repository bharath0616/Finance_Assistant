  import React from 'react';
  import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
  import { Toaster} from 'react-hot-toast';
  import Header from './components/Header';
  import Blog from './pages/Blog';
  import Home from './pages/Home';
import Tools from './pages/Tools';
import DataEntry from './pages/DataEntry';
import SalaryBreakdown from './pages/SalaryBreakdown';
import SipCalculator from './pages/SipCalculator';
import TaxCalculator from './pages/TaxCalculator';
import PortfolioManager from './pages/PortfolioManager';
import Footer from './components/Footer';
import SipLow from './pages/sip/SipLow';
import SipMedium from './pages/sip/SipMedium';
import SipHigh from './pages/sip/SipHigh';
import TaxLow from './pages/tax/TaxLow';
import TaxMedium from './pages/tax/TaxMedium';
import TaxHigh from './pages/tax/TaxHigh';
import Recommend from './pages/Recommend';
import RecLR from './pages/recommendations/RecLR';
import RecHR from './pages/recommendations/RecHR';
import RecMR from './pages/recommendations/RecMR';
import Contact from './pages/Contact.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import SignIn from './pages/Signin.jsx';
import SignUp from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import Chatbot from './pages/Chatbot.jsx';
import Stocks from './pages/Stocks.jsx';
import Portfolio from './pages/Portfolio.jsx';
import SalaryCalculator from './pages/SalaryCalculator.jsx';
import ChatbotWidget from './components/widgets/chatbotWidget.jsx';
import EmiCalculator from './pages/EmiCalculator.jsx';
import StockAnalyzer from './pages/StockAnalyzer.jsx';


  export default function App() {
    return (  
      <Router>
      <Header/>
      <ChatbotWidget/>
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route element={<PrivateRoute />} >
        <Route path='/data' element={<DataEntry/>} />
        <Route path='/blogs' element={<Blog />} />
        <Route path='/expense-tracker' element={<Tools />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/recommend' element={<Recommend />} />
        <Route path='/recommendations-lr' element={<RecLR />} />
        <Route path='/recommendations-hr' element={<RecHR />} />
        <Route path='/recommendations-mr' element={<RecMR />} />
        <Route path='/salarBreakdown' element={<SalaryBreakdown />} />
        <Route path='/sipCalculator' element={<SipCalculator />} />
        <Route path='/taxCalculator' element={<TaxCalculator />} />
        <Route path='/salaryCalculator' element={<SalaryCalculator />} />
        <Route path='/salaryCalculator' element={<SalaryCalculator />} />
        <Route path='/emiCalculator' element={<EmiCalculator/>} />
        <Route path='/portfolioManager' element={<PortfolioManager />} />
        <Route path='/holdings' element={<Portfolio />} />
        <Route path='/stocks' element={<Stocks />} />
        <Route path='/siplow' element={<SipLow />} />
        <Route path='/sipmedium' element={<SipMedium />} />
        <Route path='/stockanalyzer' element={<StockAnalyzer />} />
        <Route path='/siphigh' element={<SipHigh />} />
        <Route path='/taxlow' element={<TaxLow />} />
        <Route path='/taxmedium' element={<TaxMedium />} />
        <Route path='/taxhigh' element={<TaxHigh />} />
        <Route path='/chatbot' element={<Chatbot/>} />
        
        <Route path='profile' element={<Profile />} />
        </Route>
        </Routes>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Footer/>
      </Router>
    ) 
  }

