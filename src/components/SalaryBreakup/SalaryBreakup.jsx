"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner"; // Import Sonner Toast

const SalaryBreakup = ({ candidateCTCID, candidateID, candidateCTC, fetchCandidateData }) => {
    const router = useRouter();

    // Initial Salary Data
    const initialSalaryData = {
        basicSalary: candidateCTC?.basic_salary ? (candidateCTC.basic_salary / 12).toFixed(2) : 0,
        houseRentAllowance: candidateCTC?.house_rent_allowence ? (candidateCTC.house_rent_allowence / 12).toFixed(2) : 0,
        conveyanceAllowance: candidateCTC?.conveyance_allowence ? (candidateCTC.conveyance_allowence / 12).toFixed(2) : 0,
        medicalAllowance: candidateCTC?.medical_allowence ? (candidateCTC.medical_allowence / 12).toFixed(2) : 0,
        specialAllowance: candidateCTC?.special_allowence ? (candidateCTC.special_allowence / 12).toFixed(2) : 0,
        perAnnumBasicSalary: candidateCTC?.basic_salary || 0,
        perAnnumHouseRentAllowance: candidateCTC?.house_rent_allowence || 0,
        perAnnumConveyanceAllowance: candidateCTC?.conveyance_allowence || 0,
        perAnnumMedicalAllowance: candidateCTC?.medical_allowence || 0,
        perAnnumSpecialAllowance: candidateCTC?.special_allowence || 0,
    };

    const [salaryData, setSalaryData] = useState(initialSalaryData);

    // Handle Input Change for Per Annum Fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = parseFloat(value) || 0;

        setSalaryData((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));
    };

    // Update Monthly Values when Per Annum Fields Change
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

    // Calculate Derived Salary Values
    const grossMonthlyPay = Object.values(salaryData)
        .slice(0, 5)
        .reduce((acc, val) => acc + parseFloat(val), 0)
        .toFixed(2);

    const totalBase = grossMonthlyPay;
    const totalCTC = (grossMonthlyPay * 12).toFixed(2);
    const allocatedBudget = (totalCTC * 2.3).toFixed(2);
    const amountSaved = (allocatedBudget - totalCTC).toFixed(2);

    // Update Salary Breakup API Call
    const updateSalaryBreakup = async () => {
        const payload = {
            candidate_ctc_id: candidateCTCID,
            basic_salary: Number(salaryData.perAnnumBasicSalary),
            house_rent_allowence: Number(salaryData.perAnnumHouseRentAllowance),
            conveyance_allowence: Number(salaryData.perAnnumConveyanceAllowance),
            medical_allowence: Number(salaryData.perAnnumMedicalAllowance),
            special_allowence: Number(salaryData.perAnnumSpecialAllowance),
            gross_monthly_pay: Number(grossMonthlyPay),
            total_base: Number(totalBase),
            total_ctc: Number(totalCTC),
        };

        try {
            const response = await fetch(
                "https://prod-20.centralindia.logic.azure.com:443/workflows/db7ebc12301848b2adef7c96921c1de7/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a1nyipvqpYovzs3pw8-cKXaF3gl6y14MwiZEknTmYp4",
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const result = await response.json();
            console.log("Salary breakup updated successfully:", result);

            // Show success toast
            toast.success("Salary breakup updated successfully!", { duration: 2000 });

            // Fetch Updated Candidate Data
            fetchCandidateData();
        } catch (error) {
            console.error("Error updating salary breakup:", error);
            toast.error("Failed to update salary breakup. Please try again.");
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
        </div>
    );
};

export default SalaryBreakup;
