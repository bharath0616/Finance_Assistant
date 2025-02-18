import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import toast, { Toaster } from "react-hot-toast";

export default function SalaryCalculator() {
  const [formData, setFormData] = useState({
    ctc: 2000000,
    basicPayPercentage: 45.95,
    hraPercentage: 40,
    rentPaid: 0,
    bonusPercentage: 15,
    monthlyProfessionalTax: 200,
    monthlyEmployerPF: 1800,
    monthlyEmployeePF: 1800,
    monthlyGratuity: 0,
    monthlyAdditionalDeduction1: 0,
    monthlyAdditionalDeduction2: 0,
  });

  const [results, setResults] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, offset: 100 });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: parseFloat(e.target.value),
    });
  };

  const calculateSalary = () => {
    const {
      ctc,
      basicPayPercentage,
      hraPercentage,
      rentPaid,
      bonusPercentage,
      monthlyProfessionalTax,
      monthlyEmployerPF,
      monthlyEmployeePF,
      monthlyGratuity,
      monthlyAdditionalDeduction1,
      monthlyAdditionalDeduction2,
    } = formData;

    const basicPay = (basicPayPercentage / 100) * ctc;
    const hra = (hraPercentage / 100) * basicPay;
    const bonus = (bonusPercentage / 100) * ctc;
    const annualGrossSalary = ctc - bonus;

    const monthlyDeductions =
      monthlyProfessionalTax +
      monthlyEmployerPF +
      monthlyEmployeePF +
      monthlyGratuity +
      monthlyAdditionalDeduction1 +
      monthlyAdditionalDeduction2;
    const annualDeductions = monthlyDeductions * 12;

    const monthlyTakeHome = (annualGrossSalary / 12) - monthlyDeductions;
    const annualTakeHome = monthlyTakeHome * 12;

    setResults({
      basicPay,
      hra,
      monthlyDeductions,
      annualDeductions,
      monthlyTakeHome,
      annualTakeHome,
    });

    toast.success("Salary calculated successfully!");
  };

  return (
    <div className="ml-20 mr-20 mt-20" data-aos="fade-down">
      <Toaster />
      <h1 className="text-white font-bold text-5xl tracking-tight mb-20">
        Salary Calculator
      </h1>
      <p className="text-white text-md mt-8">
        Enter the details to calculate your take-home salary, monthly, and annual deductions.
      </p>

      <div className="container mx-auto px-4 mt-20">
        <form className="flex flex-col gap-10 p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2" data-aos="fade-right">
              <label htmlFor="ctc" className="text-white text-md">
                Cost to Company (CTC)
              </label>
              <input
                type="number"
                className="border p-4 bg-[#010D50] border-transparent shadow-md rounded-full text-white"
                id="ctc"
                value={formData.ctc}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2" data-aos="fade-left">
              <label htmlFor="basicPayPercentage" className="text-white text-md">
                Basic Pay Percentage (%)
              </label>
              <input
                type="number"
                className="border p-4 bg-[#010D50] shadow-md border-transparent rounded-full text-white"
                id="basicPayPercentage"
                value={formData.basicPayPercentage}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2" data-aos="fade-right">
              <label htmlFor="hraPercentage" className="text-white text-md">
                HRA Percentage (%)
              </label>
              <input
                type="number"
                className="border p-4 bg-[#010D50] border-transparent shadow-md rounded-full text-white"
                id="hraPercentage"
                value={formData.hraPercentage}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2" data-aos="fade-left">
              <label htmlFor="rentPaid" className="text-white text-md">
                Rent Paid (Monthly)
              </label>
              <input
                type="number"
                className="border p-4 bg-[#010D50] shadow-md border-transparent rounded-full text-white"
                id="rentPaid"
                value={formData.rentPaid}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2" data-aos="fade-right">
              <label htmlFor="bonusPercentage" className="text-white text-md">
                Bonus Percentage (%)
              </label>
              <input
                type="number"
                className="border p-4 bg-[#010D50] border-transparent shadow-md rounded-full text-white"
                id="bonusPercentage"
                value={formData.bonusPercentage}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2" data-aos="fade-left">
              <label htmlFor="monthlyProfessionalTax" className="text-white text-md">
                Monthly Professional Tax
              </label>
              <input
                type="number"
                className="border p-4 bg-[#010D50] shadow-md border-transparent rounded-full text-white"
                id="monthlyProfessionalTax"
                value={formData.monthlyProfessionalTax}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2" data-aos="fade-right">
              <label htmlFor="monthlyEmployerPF" className="text-white text-md">
                Monthly Employer PF
              </label>
              <input
                type="number"
                className="border p-4 bg-[#010D50] border-transparent shadow-md rounded-full text-white"
                id="monthlyEmployerPF"
                value={formData.monthlyEmployerPF}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2" data-aos="fade-left">
              <label htmlFor="monthlyEmployeePF" className="text-white text-md">
                Monthly Employee PF
              </label>
              <input
                type="number"
                className="border p-4 bg-[#010D50] shadow-md border-transparent rounded-full text-white"
                id="monthlyEmployeePF"
                value={formData.monthlyEmployeePF}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2" data-aos="fade-right">
              <label htmlFor="monthlyGratuity" className="text-white text-md">
                Monthly Gratuity
              </label>
              <input
                type="number"
                className="border p-4 bg-[#010D50] border-transparent shadow-md rounded-full text-white"
                id="monthlyGratuity"
                value={formData.monthlyGratuity}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2" data-aos="fade-left">
              <label htmlFor="monthlyAdditionalDeduction1" className="text-white text-md">
                Monthly Additional Deduction (Optional)
              </label>
              <input
                type="number"
                className="border p-4 bg-[#010D50] shadow-md border-transparent rounded-full text-white"
                id="monthlyAdditionalDeduction1"
                value={formData.monthlyAdditionalDeduction1}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2" data-aos="fade-right">
              <label htmlFor="monthlyAdditionalDeduction2" className="text-white text-md">
                Monthly Additional Deduction (Optional)
              </label>
              <input
                type="number"
                className="border p-4 bg-[#010D50] border-transparent shadow-md rounded-full text-white"
                id="monthlyAdditionalDeduction2"
                value={formData.monthlyAdditionalDeduction2}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={calculateSalary}
              className="bg-red-800 text-white p-3 rounded-full border-transparent hover:bg-gray-700 text-xs uppercase"
            >
              Calculate
            </button>
          </div>
        </form>
      </div>

      {results && (
        <div className="flex flex-col justify-center mt-10">
          <div className="flex justify-around gap-4 mt-10 text-white">
            <div className="text-lg font-heading">
              <p>Basic Pay: ₹{results.basicPay.toLocaleString()}</p>
              <p>HRA: ₹{results.hra.toLocaleString()}</p>
              <p>Total Monthly Deductions: ₹{results.monthlyDeductions.toLocaleString()}</p>
              <p>Total Annual Deductions: ₹{results.annualDeductions.toLocaleString()}</p>
              <p>Take Home Monthly Salary: ₹{results.monthlyTakeHome.toLocaleString()}</p>
              <p>Take Home Annual Salary: ₹{results.annualTakeHome.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Salary Components Explanation */}
      <div className="mt-20 text-white">
        <h3 className="text-2xl font-bold mb-4">What are the Components of the Salary Structure?</h3>
        <ul className="list-disc list-inside text-lg">
          <li><strong>Basic Salary:</strong> Fixed component, 40-50% of the CTC.</li>
          <li><strong>HRA:</strong> Housing Rent Allowance, partially exempt from tax if in a rented house.</li>
          <li><strong>LTA:</strong> Leave Travel Allowance for travel expenses.</li>
          <li><strong>Professional Tax:</strong> State-imposed tax, maximum Rs 2,500 annually.</li>
          <li><strong>Special Allowance:</strong> Taxable component for various purposes.</li>
          <li><strong>Bonus:</strong> Performance-linked incentive, fully taxable.</li>
          <li><strong>EPF:</strong> Provident Fund contributions by employer and employee, deductible under Section 80C.</li>
        </ul>
      </div>
    </div>
  );
}