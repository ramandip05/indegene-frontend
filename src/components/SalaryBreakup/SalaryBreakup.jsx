"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const SalaryBreakup = ({ candidateCTCID,candidateID,candidateCTC }) => {
    console.log("candidateCTC",candidateCTC)
    const router = useRouter();

    // Consolidated State for Salary Components
    const [salaryData, setSalaryData] = useState({
        basicSalary: 0,
        houseRentAllowance: 0,
        conveyanceAllowance: 0,
        medicalAllowance: 0,
        specialAllowance: 0,
        perAnnumBasicSalary: 0,
        perAnnumHouseRentAllowance: 0,
        perAnnumConveyanceAllowance: 0,
        perAnnumMedicalAllowance: 0,
        perAnnumSpecialAllowance: 0,
    });

    // Generic Handler for Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSalaryData((prev) => ({
            ...prev,
            [name]: parseFloat(value) || 0,
        }));
    };

    // Automatically Update Monthly Values when Per Annum Values Change
    useEffect(() => {
        setSalaryData((prev) => ({
            ...prev,
            basicSalary: (prev.perAnnumBasicSalary / 12).toFixed(2),
            houseRentAllowance: (prev.perAnnumHouseRentAllowance / 12).toFixed(2),
            conveyanceAllowance: (prev.perAnnumConveyanceAllowance / 12).toFixed(2),
            medicalAllowance: (prev.perAnnumMedicalAllowance / 12).toFixed(2),
            specialAllowance: (prev.perAnnumSpecialAllowance / 12).toFixed(2),
        }));
    }, [
        salaryData.perAnnumBasicSalary,
        salaryData.perAnnumHouseRentAllowance,
        salaryData.perAnnumConveyanceAllowance,
        salaryData.perAnnumMedicalAllowance,
        salaryData.perAnnumSpecialAllowance,
    ]);

    // Derived Salary Calculations
    const grossMonthlyPay = Object.values(salaryData)
        .slice(0, 5)
        .reduce((acc, val) => acc + parseFloat(val), 0).toFixed(2);

    const totalBase = grossMonthlyPay;
    const totalCTC = (grossMonthlyPay * 12).toFixed(2);
    const allocatedBudget = (totalCTC * 2.3).toFixed(2);
    const amountSaved = (allocatedBudget - totalCTC).toFixed(2);

    // API Call to Update Salary Breakup
    const updateSalaryBreakup = async () => {
        const payload = {
            candidate_ctc_id: candidateCTCID,
            basic_salary: Number(salaryData.basicSalary),
            house_rent_allowence: Number(salaryData.houseRentAllowance),
            conveyance_allowence: Number(salaryData.conveyanceAllowance),
            medical_allowence: Number(salaryData.medicalAllowance),
            special_allowence: Number(salaryData.specialAllowance),
            gross_monthly_pay: Number(grossMonthlyPay),
            total_base: Number(totalBase),
            total_ctc: Number(totalCTC),
        };

        try {
            const response = await fetch(
                "https://prod-20.centralindia.logic.azure.com:443/workflows/db7ebc12301848b2adef7c96921c1de7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a1nyipvqpYovzs3pw8-cKXaF3gl6y14MwiZEknTmYp4",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.status) throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            console.log("Salary breakup updated successfully:", result);
        } catch (error) {
            console.error("Error updating salary breakup:", error);
        }
    };

    return (
        <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-lg mx-auto space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Salary Breakup</h2>

            {/* Salary Breakup Table */}
            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left bg-gray-100">Breakup</th>
                        <th className="px-4 py-2 text-left bg-gray-100">Monthly</th>
                        <th className="px-4 py-2 text-left bg-gray-100">Per Annum</th>
                    </tr>
                </thead>
                <tbody>
                    {["basicSalary", "houseRentAllowance", "conveyanceAllowance", "medicalAllowance", "specialAllowance"].map((key, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2 capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
                            <td className="border px-4 py-2">{salaryData[key]}</td>
                            <td className="border px-4 py-2">
                                <input
                                    type="number"
                                    name={`perAnnum${key.charAt(0).toUpperCase() + key.slice(1)}`}
                                    value={salaryData[`perAnnum${key.charAt(0).toUpperCase() + key.slice(1)}`]}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                    placeholder="Enter Amount"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Total Calculations */}
            <div className="text-center font-semibold mt-4">
                <p>Gross Monthly Pay: {grossMonthlyPay}</p>
                <p>Total Base: {totalBase}</p>
                <p>Total CTC: {totalCTC}</p>
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={updateSalaryBreakup}
                    className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 cursor-pointer"
                >
                    Save
                </button>
            </div>

            {/* Budget Summary */}
            <div className="bg-gray-100 p-6 shadow-md rounded-lg w-full text-center">
                <p><span className="font-bold">Allocated Budget -</span> {allocatedBudget}</p>
                <p><span className="font-bold">Final Agreed CTC -</span> {totalCTC}</p>
                <p><span className="font-bold">Amount Saved -</span> {amountSaved}</p>
            </div>

            {/* Document Process Button */}
            <div className="bg-blue-700 p-3 shadow-md rounded-lg w-full text-center">
                <button className="text-white" onClick={() => router.push(`/candidate-details/${candidateID}`)}>
                    Initiate Document Process
                </button>
            </div>
        </div>
    );
};

export default SalaryBreakup;
