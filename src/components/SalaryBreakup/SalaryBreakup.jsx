"use client";
import React, { useState } from "react";
 
const SalaryBreakup = () => {
    // State for user inputs
    const [basicSalary, setBasicSalary] = useState(0);
    const [houseRentAllowance, setHouseRentAllowance] = useState(0);
    const [conveyanceAllowance, setConveyanceAllowance] = useState(0);
    const [medicalAllowance, setMedicalAllowance] = useState(0);
    const [specialAllowance, setSpecialAllowance] = useState(0);
 
    // State to hold Per Annum values (editable)
    const [perAnnumBasicSalary, setPerAnnumBasicSalary] = useState(0);
    const [perAnnumHouseRentAllowance, setPerAnnumHouseRentAllowance] = useState(0);
    const [perAnnumConveyanceAllowance, setPerAnnumConveyanceAllowance] = useState(0);
    const [perAnnumMedicalAllowance, setPerAnnumMedicalAllowance] = useState(0);
    const [perAnnumSpecialAllowance, setPerAnnumSpecialAllowance] = useState(0);
 
    // Function to handle the Per Annum input change and update Monthly, Base, and CTC
    const handlePerAnnumChange = () => {
        const monthlyBasicSalary = (perAnnumBasicSalary / 12).toFixed(2);
        const monthlyHouseRentAllowance = (perAnnumHouseRentAllowance / 12).toFixed(2);
        const monthlyConveyanceAllowance = (perAnnumConveyanceAllowance / 12).toFixed(2);
        const monthlyMedicalAllowance = (perAnnumMedicalAllowance / 12).toFixed(2);
        const monthlySpecialAllowance = (perAnnumSpecialAllowance / 12).toFixed(2);
 
        setBasicSalary(parseFloat(monthlyBasicSalary));
        setHouseRentAllowance(parseFloat(monthlyHouseRentAllowance));
        setConveyanceAllowance(parseFloat(monthlyConveyanceAllowance));
        setMedicalAllowance(parseFloat(monthlyMedicalAllowance));
        setSpecialAllowance(parseFloat(monthlySpecialAllowance));
    };
 
    // Calculate monthly salary and CTC based on user inputs
    const monthlySalary = (
        basicSalary +
        houseRentAllowance +
        conveyanceAllowance +
        medicalAllowance +
        specialAllowance
    ).toFixed(2);
 
    const totalBase = (
        basicSalary +
        houseRentAllowance +
        conveyanceAllowance +
        medicalAllowance +
        specialAllowance
    ).toFixed(2);
 
    const totalCTC = (totalBase * 12).toFixed(2);
    const allocatedBudget = (totalCTC * 2.3).toFixed(2)
 
 
    // Handle Save
    const handleSave = () => {
        console.log("Saved Data:", {
            basicSalary,
            houseRentAllowance,
            conveyanceAllowance,
            medicalAllowance,
            specialAllowance,
            monthlySalary,
            totalBase,
            totalCTC,
            perAnnumBasicSalary,
            perAnnumHouseRentAllowance,
            perAnnumConveyanceAllowance,
            perAnnumMedicalAllowance,
            perAnnumSpecialAllowance,
        });
 
    };
 
 
    return (
        <>
            <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-lg mx-auto space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">Salary Breakup</h2>
 
                {/* Table for displaying breakups */}
                <table className="w-full table-auto mt-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left bg-gray-100">Breakup</th>
                            <th className="px-4 py-2 text-left bg-gray-100">Monthly</th>
                            <th className="px-4 py-2 text-left bg-gray-100">Per Annum</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">Basic Salary</td>
                            <td className="border px-4 py-2">{basicSalary.toFixed(2)}</td>
                            <td className="border px-4 py-2">
                                <input
                                    type="number"
                                    value={perAnnumBasicSalary}
                                    onChange={(e) => {
                                        setPerAnnumBasicSalary(parseFloat(e.target.value));
                                        handlePerAnnumChange();
                                    }}
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                    placeholder="Enter Basic Salary"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">House Rent Allowance</td>
                            <td className="border px-4 py-2">{houseRentAllowance.toFixed(2)}</td>
                            <td className="border px-4 py-2">
                                <input
                                    type="number"
                                    value={perAnnumHouseRentAllowance}
                                    onChange={(e) => {
                                        setPerAnnumHouseRentAllowance(parseFloat(e.target.value));
                                        handlePerAnnumChange();
                                    }}
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                    placeholder="Enter HRA"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Conveyance Allowance</td>
                            <td className="border px-4 py-2">{conveyanceAllowance.toFixed(2)}</td>
                            <td className="border px-4 py-2">
                                <input
                                    type="number"
                                    value={perAnnumConveyanceAllowance}
                                    onChange={(e) => {
                                        setPerAnnumConveyanceAllowance(parseFloat(e.target.value));
                                        handlePerAnnumChange();
                                    }}
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                    placeholder="Enter Conveyance Allowance"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Medical Allowance</td>
                            <td className="border px-4 py-2">{medicalAllowance.toFixed(2)}</td>
                            <td className="border px-4 py-2">
                                <input
                                    type="number"
                                    value={perAnnumMedicalAllowance}
                                    onChange={(e) => {
                                        setPerAnnumMedicalAllowance(parseFloat(e.target.value));
                                        handlePerAnnumChange();
                                    }}
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                    placeholder="Enter Medical Allowance"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">Special Allowance</td>
                            <td className="border px-4 py-2">{specialAllowance.toFixed(2)}</td>
                            <td className="border px-4 py-2">
                                <input
                                    type="number"
                                    value={perAnnumSpecialAllowance}
                                    onChange={(e) => {
                                        setPerAnnumSpecialAllowance(parseFloat(e.target.value));
                                        handlePerAnnumChange();
                                    }}
                                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                                    placeholder="Enter Special Allowance"
                                />
                            </td>
                        </tr>
                        <tr className="font-semibold">
                            <td className="border px-4 py-2">Total Base</td>
                            <td className="border px-4 py-2">{basicSalary.toFixed(2)}</td>
                            <td className="border px-4 py-2">{perAnnumBasicSalary}</td>
                        </tr>
                        <tr className="font-semibold">
                            <td className="border px-4 py-2">Total CTC</td>
                            <td className="border px-4 py-2">{(totalCTC / 12).toFixed(2)}</td>
                            <td className="border px-4 py-2">{totalCTC}</td>
                        </tr>
                    </tbody>
                </table>
 
                {/* Save Button */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleSave}
                        className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
                    >
                        Save
                    </button>
                </div>
 
 
            </div>
            <div className="bg-gray-100 p-6 shadow-md rounded-lg w-full max-w-lg mx-auto space-y-6 text-center">
                <p>
                    <span className="font-bold">Allocated Budget -</span> {allocatedBudget}
                </p>
                <p>
                    <span className="font-bold">Final Agreed CTC -</span> {totalCTC}
                </p>
                <p>
                    <span className="font-bold">Amount Saved -</span> {allocatedBudget - totalCTC}
                </p>
            </div>
 
<div className ="bg-blue-700 p-3 shadow-md rounded-lg w-full max-w-lg mx-auto space-y-6 text-center">
            <button className="text-white">Initiale Document Process</button>
            </div>
 
        </>
    );
};
 
export default SalaryBreakup;