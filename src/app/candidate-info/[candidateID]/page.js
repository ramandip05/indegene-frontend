"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PaySearchFilter from "@/components/PaySearchFilter/PaySearchFilter";
import SalaryBreakup from "@/components/SalaryBreakup/SalaryBreakup";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
// import ReactApexChart from "react-apexcharts";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CandidateInfo = () => {
    const {candidateID} = useParams();
    const [candidateInfo,setCandidateInfo] = useState(null);
    const [interviewData,setInterviewData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [candidateCTCID,setCandidateCTCID] = useState(null)
    const [candidateCTC,setCandidateCTC] = useState(null)
    const fetchCandidateData = async () => {
      try {
        setLoading(true); // Start loading
        console.log("Fetching candidate details...");
        const response = await fetch(
          `https://prod-07.centralindia.logic.azure.com:443/workflows/85cfeb76a9ad4dda80d514641662554e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vFkwXNhC_xAGCLuYu0yUBk2Hl-CtH8wLihBSxRHVCH0&candidate_id=${candidateID}`
        );
        const data = await response.json();
        console.log("Fetched Data:", data);
  
        setCandidateInfo(data?.data?.candidate_details[0] || null);
        setCandidateCTC(data?.data?.candidate_ctc[0] || null);
        setInterviewData(data?.data?.interview || [])
        // setInterviewDetails(data?.data?.candidate_interview_list || [])
        // setCandidateId(data?.data?.candidate_data[0]?.candidate_id)
        // Modify candidate data by adding name and score
        // const updatedCandidates = (data?.data?.jd_resume_list || []).map(
        //   (candidate, index) => ({
        //     ...candidate,
        //  // Assign from list
        //     score: candidate?.ai_score || Math.floor(Math.random() * 30) + 50, // Random score between 50-80
        //   })
        // );
  
        // setCandidates(updatedCandidates);
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };
  
    // ✅ **UseEffect to trigger the POST request first**
    useEffect(() => {
      fetchCandidateData();
    }, [candidateID]);
 
    // Values for the candidateInfo
    const candidateData = {
        "Notice Period (days)": 30,
        "Total Tenure": 2,
        "Average Tenure": 0.8,
        "Allocated CTC": 14,
        "Offered CTC": 8,
        "Saved CTC": 6
    };
  
    const [offerAccepted, setOfferAccepted] = useState(null); // State for Offer Accepted
 
    // Handle Offer Accepted Change
    const handleOfferChange = async (response) => {
        setOfferAccepted(response);
    
        const payload = {
            offer_accepted: response.toLowerCase(), // Convert to lowercase
            candidate_id: candidateID, // Ensure candidateID is used dynamically
        };
    
        try {
            const res = await fetch(
                "https://prod-23.centralindia.logic.azure.com:443/workflows/3636c4fb91264bbd8f96fd2212be883e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ypjiI9QVxpBseTmV6bK1fwS8cszThov9hpAQNygHYXg",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
    
            if (!res.status) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
    
            const result = await res.json();
            setCandidateCTCID(result?.data?.candidate_ctc_list_id)
            console.log("Offer acceptance response:", result);
        } catch (error) {
            console.error("Error sending offer acceptance:", error);
        }
    };
    
    if (loading) {
        return (
          <div className="flex flex-col justify-center items-center h-40">
            <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
            <span className="ml-3 text-gray-700 text-lg">Fetching Candidate Details...</span>
          </div>
        );
      }
    // Define colors
    const colors = ["#9370db", "#da70d6", "#b0e0e6"];
 
    // ApexChart Component for the Bar Chart
    const ApexBarChart = () => {
        const [state, setState] = useState({
            series: [{
                data: [candidateInfo?.current_salary, 0, candidateInfo?.expected_salary]
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
    // const ApexChart = () => {
    //     const [state, setState] = React.useState({
    //         series: [{
    //             name: 'Series 1',
    //             data: [80, 50, 65, 40, 66],
    //         }],
    //         options: {
    //             chart: {
    //                 height: 350,
    //                 type: 'radar',
    //             },
    //             title: {
    //                 text: ''
    //             },
    //             yaxis: {
    //                 stepSize: 20
    //             },
    //             xaxis: {
    //                 categories: ['figma',
    //                     'marvel',
    //                     'information architecture',
    //                     'user research',
    //                     'sketch']
    //             }
    //         }
    //     });
 
    //     return (
 
 
    //         <div className="col-span-1 sm:col-span-2 lg:col-span-1">
    //             <Card className="shadow-md border rounded-lg w-full h-full p-4">
    //                 <CardContent className="flex flex-col items-center">
    //                     <div id="chart" className="w-full">
    //                         <ReactApexChart options={state.options} series={state.series} type="radar" height={350} />
    //                     </div>
    //                     <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills & Tools</h2>
 
    //                 </CardContent>
    //             </Card>
    //         </div>
    //     );
    // };
    const ApexChart = () => {
        // Extract skills from candidateInfo (fallback to empty array if missing)
        const skills = candidateInfo?.skills ? candidateInfo.skills.split(",").map(skill => skill.trim()) : [];
    
        // Generate random proficiency scores (if actual scores are unavailable)
        const skillProficiency = skills.map(() => Math.floor(Math.random() * 50) + 50); // Random between 50-100
    
        const state = {
            series: [{ name: "Skills", data: skillProficiency }],
            options: {
                chart: { height: 350, type: "radar", toolbar: { show: false } },
                xaxis: { categories: skills.length > 0 ? skills : ["Skill 1", "Skill 2", "Skill 3"] }, // Default if empty
            },
        };
    
        return (
            <Card className="shadow-md border rounded-lg p-4">
                <CardContent className="flex flex-col items-center">
                    <ReactApexChart options={state.options} series={state.series} type="radar" height={380} />
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills & Tools</h2>
                </CardContent>
            </Card>
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
                show: false
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
     
   
    const ApexRadialBarChart = () => {
        // Sort the data by round number (assuming rounds are numeric strings)
       
        const sortedData = [...interviewData].sort(
          (a, b) => parseInt(a.round) - parseInt(b.round)
        );
      
        // Extract ratings and convert them to numbers
        const ratings = sortedData.map((item) => parseFloat(item.rating));
        // Compute average rating
        const averageRating =
          ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
      
        // Build the series array: overall average first, then individual round ratings.
        const series = [averageRating, ...ratings];
        // Labels corresponding to the series values.
        const labels = ["Overall Score", ...sortedData.map((item, i) => `Round ${item.round}`)];
      
        // Set up the chart state
        const [state, setState] = React.useState({
          series: series,
          options: {
            chart: {
              height: 390,
              type: "radialBar",
            },
            plotOptions: {
              radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                  margin: 5,
                  size: "30%",
                  background: "transparent",
                },
                dataLabels: {
                  name: {
                    show: false,
                  },
                  value: {
                    show: true,
                  },
                },
                barLabels: {
                  enabled: true,
                  useSeriesColors: true,
                  offsetX: -8,
                  fontSize: "16px",
                  formatter: function (seriesName, opts) {
                    return seriesName + ": " + opts.w.globals.series[opts.seriesIndex];
                  },
                },
              },
            },
            colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
            labels: labels,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    show: false,
                  },
                },
              },
            ],
          },
        });
      
        return (
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Card className="shadow-md border rounded-lg w-full h-full p-4">
              <CardContent className="flex flex-col items-center">
                <div id="chart" className="w-full">
                  <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="radialBar"
                    height={390}
                  />
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
                    <div className="flex flex-1 flex-wrap gap-10 items-center">
                        <Avatar className="w-28 h-28">
                            <AvatarImage src={candidateInfo?.image} alt={candidateInfo[0]?.name} />
                            <AvatarFallback>{candidateInfo?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-4 text-gray-700 text-base w-full max-w-4xl">
                            <p><strong>Name:</strong> {candidateInfo?.name}</p>
                            <p><strong>Industry:</strong> {candidateInfo?.industry}</p>
                            <p><strong>Role:</strong> {candidateInfo?.role}</p>
                            <p><strong>Job Type:</strong> {candidateInfo?.job_type}</p>
                            <p><strong>Job ID:</strong> {candidateInfo?.job_id}</p>
                            <p><strong>Job Level:</strong> {candidateInfo?.job_level}</p>
                            <p><strong>Salary:</strong> {candidateInfo?.current_salary}</p>
                            <p><strong>Experience:</strong> {candidateInfo?.experience}</p>
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
                            {Object.entries(candidateData).map(([info, value], index) => (
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
 
                {/* <div>
                    <PaySearchFilter></PaySearchFilter>
                </div>
  */}
              <div className="flex justify-center">
                <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center space-y-4 w-72">

                    {/* Show Accept/Decline buttons only if offer is not decided */}
                    {offerAccepted === null ? (
                        <div className="flex space-x-4">
                            <Button onClick={() => handleOfferChange("Yes")} className="bg-green-500 hover:bg-green-700 cursor-pointer">
                                Yes
                            </Button>
                            <Button onClick={() => handleOfferChange("No")} className="bg-red-500 hover:bg-red-700 cursor-pointer">
                                No
                            </Button>
                        </div>
                    ) : (
                        <p className={`text-lg font-semibold ${offerAccepted === "Yes" ? "text-green-600" : "text-red-600"}`}>
                            {offerAccepted === "Yes" ? "Offer has been accepted!" : "Offer has been declined!"}
                        </p>
                    )}
                </div>
            </div>
                {/* Salary Breakup */}
                {offerAccepted === "Yes" && <SalaryBreakup candidateCTCID={candidateCTCID} candidateCTC={candidateCTC} candidateID={candidateID}/>}
            </div>
        </>
    );
};
 
export default CandidateInfo;