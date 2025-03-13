"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import PaySearchFilter from "@/components/PaySearchFilter/PaySearchFilter";
import SalaryBreakup from "@/components/SalaryBreakup/SalaryBreakup";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CandidateInfo = () => {
    const candidate = {
        name: "Amruth",
        role: "UI/UX Designer",
        jobID: "12ERFCSD",
        salary: "7L",
        industry: "IT",
        jobType: "Full Time",
        jobLevel: "Experienced",
        experience: "1 - 2 years",
        image: "/default-avatar.png",
    };
 
    // Values for the candidateInfo
    const candidateInfo = {
        "Notice Period (days)": 30,
        "Total Tenure": 2,
        "Average Tenure": 0.8,
        "Allocated CTC": 14,
        "Offered CTC": 8,
        "Saved CTC": 6
    };
    const [offerAccepted, setOfferAccepted] = useState(null); // State for Offer Accepted
 
    // Handle Offer Accepted Change
    const handleOfferChange = (response) => {
        setOfferAccepted(response);
    };
 
    // Define colors
    const colors = ["#9370db", "#da70d6", "#b0e0e6"];
 
    // ApexChart Component for the Bar Chart
    const ApexBarChart = () => {
        const [state, setState] = useState({
            series: [{
                data: [4, 6, 8]
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                    events: {
                        click: function (chart, w, e) {
                            // Handle click events if needed
                        }
                    }
                },
                colors: colors,
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                xaxis: {
                    categories: [
                        "Current Salary",
                        "Offer In Hand",
                        "Expected Salary"
                    ],
                    labels: {
                        style: {
                            colors: colors,
                            fontSize: '12px'
                        }
                    }
                }
            }
        });
 
        return (
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 ">
                <Card className="shadow-md border rounded-lg w-full h-full p-4">
                    <CardContent className="flex flex-col items-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Salary Comparison</h2>
                        <div id="chart" className="w-full">
                            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };
 
    // ApexChart Component for the Polar Area Chart
    const ApexPolarAreaChart = () => {
        const [state, setState] = useState({
            // Example dynamic data including 10 years
            series: [2, 7, 6, 4],
            options: {
                chart: {
                    type: 'polarArea',
                    height: '100%', // Make the chart take full height
                },
                stroke: {
                    colors: ['#fff']
                },
                fill: {
                    opacity: 0.8
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }],
                xaxis: {
                    categories: ['1 Year', '2 Years', '3 Years', '4 Years', '5 Years', '6 Years', '7 Years', '8 Years', '9 Years', '10 Years'], // Dynamic category labels
                }
            }
        });
 
        return (
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <Card className="shadow-md border rounded-lg w-full h-full flex flex-col">
                    <CardContent className="flex flex-col items-center flex-grow">
                        <div id="chart" className="w-full h-full">
                            <ReactApexChart options={state.options} series={state.series} type="polarArea" height="100%" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Retention</h2>
                    </CardContent>
                </Card>
            </div>
        );
    };
 
    // ApexChart Component for the Radar Chart
    const ApexChart = () => {
        const [state, setState] = React.useState({
            series: [{
                name: 'Series 1',
                data: [80, 50, 65, 40, 66],
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'radar',
                },
                title: {
                    text: ''
                },
                yaxis: {
                    stepSize: 20
                },
                xaxis: {
                    categories: ['figma',
                        'marvel',
                        'information architecture',
                        'user research',
                        'sketch']
                }
            }
        });
 
        return (
 
 
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <Card className="shadow-md border rounded-lg w-full h-full p-4">
                    <CardContent className="flex flex-col items-center">
                        <div id="chart" className="w-full">
                            <ReactApexChart options={state.options} series={state.series} type="radar" height={350} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills & Tools</h2>
 
                    </CardContent>
                </Card>
            </div>
        );
    };
 
    const ApexPercentChart = () => {
        const [state, setState] = React.useState({
          series: [67],
          options: {
            chart: {
              height: 180, // Decreased the height for a smaller chart
              type: 'radialBar',
              toolbar: {
                show: true
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.5
                  }
                },
                track: {
                  background: '#fff',
                  strokeWidth: '67%',
                  margin: 0,
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.7
                  }
                },
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    show: true,
                    color: '#888',
                    fontSize: '17px'
                  },
                  value: {
                    formatter: function (val) {
                      return parseInt(val);
                    },
                    color: '#111',
                    fontSize: '36px',
                    show: true
                  }
                }
              }
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#ABE5A1'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
              }
            },
            stroke: {
              lineCap: 'round'
            },
            labels: ['Percent']
          }
        });
     
        return (
          <div>
            <div id="card">
              <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="radialBar" height={180} />
              </div>
            </div>
            <div id="html-dist"></div>
          </div>
        );
      };
     
 
    // ApexChart Component for the Radial Bar Chart
    const ApexRadialBarChart = () => {
        const [state, setState] = React.useState({
            series: [76, 67, 61, 90],
            options: {
                chart: {
                    height: 390,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        offsetY: 0,
                        startAngle: 0,
                        endAngle: 270,
                        hollow: {
                            margin: 5,
                            size: '30%',
                            background: 'transparent',
                            image: undefined,
                        },
                        dataLabels: {
                            name: {
                                show: false,
                            },
                            value: {
                                show: false,
                            }
                        },
                        barLabels: {
                            enabled: true,
                            useSeriesColors: true,
                            offsetX: -8,
                            fontSize: '16px',
                            formatter: function (seriesName, opts) {
                                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                            },
                        },
                    }
                },
                colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
                labels: ['Over ALL Score', 'Round3', 'Round2', 'Round1',],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            show: false
                        }
                    }
                }]
            }
        });
        return (
 
 
 
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                <Card className="shadow-md border rounded-lg w-full h-full p-4">
                    <CardContent className="flex flex-col items-center">
                        <div id="chart" className="w-full">
                            <ReactApexChart options={state.options} series={state.series} type="radialBar" height={390} />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Interviewer Review</h2>
                    </CardContent>
                </Card>
            </div>
        );
    };
 
    return (
        <>
            <div className="bg-white p-8 shadow-md rounded-lg w-full mx-auto space-y-10">
                {/* Candidate Details Section */}
                <h2 className="text-3xl font-bold text-gray-800">Candidate Details</h2>
                <div className="flex flex-1 flex-wrap gap-10 items-center">
                    <div className="flex flex-wrap gap-10 items-center">
                        <Avatar className="w-28 h-28">
                            <AvatarImage src={candidate.image} alt={candidate.name} />
                            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-4 text-gray-700 text-base w-full max-w-4xl">
                            <p><strong>Name:</strong> {candidate.name}</p>
                            <p><strong>Industry:</strong> {candidate.industry}</p>
                            <p><strong>Role:</strong> {candidate.role}</p>
                            <p><strong>Job Type:</strong> {candidate.jobType}</p>
                            <p><strong>Job ID:</strong> {candidate.jobID}</p>
                            <p><strong>Job Level:</strong> {candidate.jobLevel}</p>
                            <p><strong>Salary:</strong> {candidate.salary}</p>
                            <p><strong>Experience:</strong> {candidate.experience}</p>
                        </div>
                    </div>
                    <div>
                        <ApexPercentChart />
                    </div>
                </div>
                {/* Candidate Info Section and Chart in Same Row */}
                <Card className="p-4 px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                        {/* Candidate Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                            {Object.entries(candidateInfo).map(([info, value], index) => (
                                <Card key={index} className="shadow-md border rounded-lg w-full h-32 flex flex-col items-center justify-center text-sm p-4">
                                    <CardContent className="flex flex-col items-center">
                                        <h1 className="text-3xl font-semibold">{value}</h1>
                                        <p className="font-medium text-sm mt-2 text-center">{info}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
 
                        {/* Chart Section */}
                        <ApexBarChart />
                        <ApexPolarAreaChart />
                        <ApexRadialBarChart />
                        <ApexChart />
                    </div>
                </Card>
 
                <div>
                    <PaySearchFilter></PaySearchFilter>
                </div>
 
                <div className="flex justify-center items-center">
                    <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center space-y-4 w-72">
                        <h3 className="text-xl font-semibold text-gray-800">Offer Accepted</h3>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleOfferChange("Yes")}
                                className={`py-2 px-4 rounded-md text-white ${offerAccepted === "Yes" ? "bg-green-600" : "bg-green-500"} hover:bg-green-700 focus:outline-none`}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => handleOfferChange("No")}
                                className={`py-2 px-4 rounded-md text-white ${offerAccepted === "No" ? "bg-red-600" : "bg-red-500"} hover:bg-red-700 focus:outline-none`}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
 
                {/* Salary Breakup */}
                {offerAccepted === "Yes" && <SalaryBreakup />}
            </div>
        </>
    );
};
 
export default CandidateInfo;