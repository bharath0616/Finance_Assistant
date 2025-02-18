import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmiCalculator() {
  const [loanDetails, setLoanDetails] = useState({
    principal: 1000000,
    interestRate: 6.5,
    tenure: 5,
  });

  const [results, setResults] = useState({
    monthlyEMI: 0,
    totalInterest: 0,
    totalAmount: 0,
  });

  const calculateEMI = () => {
    const { principal, interestRate, tenure } = loanDetails;

    const monthlyRate = interestRate / (12 * 100);
    const numberOfMonths = tenure * 12;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    const totalAmount = emi * numberOfMonths;
    const totalInterest = totalAmount - principal;

    setResults({
      monthlyEMI: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoanDetails({ ...loanDetails, [id]: parseFloat(value) });
  };

  const chartData = {
    labels: ["Principal amount", "Interest amount"],
    datasets: [
      {
        data: [loanDetails.principal, results.totalInterest],
        backgroundColor: ["#4CAF50", "#2196F3"],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#FFFFFF",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="ml-20 mr-20 mt-20 text-white" data-aos="fade-down">
      <h1 className="font-bold text-5xl tracking-tight mb-10">EMI Calculator</h1>

      <div className="grid grid-cols-2 gap-10">
        <div>
          <div className="flex flex-col gap-6">
            <label className="text-lg">
              Loan amount: ₹{loanDetails.principal.toLocaleString()}
            </label>
            <input
              type="range"
              id="principal"
              min="10000"
              max="50000000"
              step="10000"
              value={loanDetails.principal}
              onChange={handleInputChange}
              className="w-full"
            />

            <label className="text-lg">
              Rate of interest (p.a): {loanDetails.interestRate}%
            </label>
            <input
              type="range"
              id="interestRate"
              min="0.1"
              max="15"
              step="0.1"
              value={loanDetails.interestRate}
              onChange={handleInputChange}
              className="w-full"
            />

            <label className="text-lg">Loan tenure: {loanDetails.tenure} Yr</label>
            <input
              type="range"
              id="tenure"
              min="1"
              max="30"
              step="1"
              value={loanDetails.tenure}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <button
            onClick={calculateEMI}
            className="mt-8 bg-green-600 text-white p-3 rounded-full w-full hover:bg-green-700"
          >
            Calculate
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-64 h-64 mb-10">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className="text-center">
            <p className="text-lg">Monthly EMI: ₹{results.monthlyEMI}</p>
            <p className="text-lg">Principal amount: ₹{loanDetails.principal.toLocaleString()}</p>
            <p className="text-lg">Total interest: ₹{results.totalInterest}</p>
            <p className="text-lg">Total amount: ₹{results.totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
