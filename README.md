# FinanceFix - Personal Finance Assistant

## Overview
**FinanceFix** is a comprehensive web application designed to help users manage their personal finances efficiently. It provides an intuitive platform where users can track income, expenses, investments, and receive personalized financial advice. The application also includes real-time stock and mutual fund recommendations tailored to the user’s financial profile, leveraging data from external APIs. An AI-powered chatbot offers interactive, dialogue-based assistance, making financial management more intuitive.

## Features
1. **Income and Expense Tracking**:
   - Monitor income and expenses easily.
   - Categorize transactions and visualize spending patterns over time.
  
2. **Investment Management**:
   - Track investments in stocks, mutual funds, and other assets.
   - Gain insights into portfolio performance and diversification.

3. **Personalized Financial Advice**:
   - Tailored advice based on user-specific data like spending habits and risk tolerance.
   - Receive recommendations to help achieve long-term financial goals.

4. **Stock and Mutual Fund Recommendations**:
   - Real-time stock and mutual fund recommendations.
   - Recommendations align with user’s risk appetite, time horizon, and other financial indicators.

5. **Interactive Chatbot**:
   - AI-powered chatbot for real-time, conversational financial assistance.
   - Assist users with financial queries and offer quick, reliable guidance.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **External APIs**: Integrated for real-time financial data (e.g., stock prices, mutual fund performance)
- **Chatbot**: Dialogflow or Rasa (for AI-based chatbot integration)

## Installation and Setup

### Prerequisites
- Node.js (>= 14.x.x)
- MongoDB (local or cloud instance)
- NPM (Node Package Manager) or Yarn

### Steps to Run the Application
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/financefix.git
   cd financefix
2. Navigate to the project directory:
    ```bash
    cd PFA

3. Install backend dependencies:
    ```bash
    cd api
    npm install

4. Install frontend dependencies:
    ```bash
    cd ../client
    npm install

5. Create a .env file in the backend directory and add the following:

    MONGODB_URI=<your-mongodb-uri>
    
    PORT=3000
   
    API_KEY=<your-external-api-key>


7. Start the frontend server:
    ```bash
    npm run dev

8. Start the backend server:
    ```bash
    cd ../api
    npm run dev
