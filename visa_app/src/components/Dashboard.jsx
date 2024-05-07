import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  // Dummy data for visa applications
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [action, setAction] = useState(0);
  const [textLoad, setLoad] = useState(false);
  const visaApplications = [
    {
      id: 1,
      email: "example1@example.com",
      visaType: "Tourist",
      purpose: "Vacation",
    },
    {
      id: 2,
      email: "example2@example.com",
      visaType: "Work",
      purpose: "Job opportunity",
    },
    {
      id: 3,
      email: "example3@example.com",
      visaType: "Student",
      purpose: "Educational program",
    },
    {
      id: 4,
      email: "example4@example.com",
      visaType: "Business",
      purpose: "Meeting with clients",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await fetch("http://localhost:5000/api/fetchall");

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        // Parse the JSON response
        const jsonData = await response.json();

        // Update state with the fetched data
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        // Update state if an error occurs

        setIsLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Cleanup function to cancel the fetch request if the component unmounts
    return () => {
      // Cleanup logic here (if needed)
    };
  }, [action]);
  const handleAccept = async (id) => {
    // Handle accept action here
    setLoad(true);
    console.log("Accepted application with ID:", id);
    try {
      // Fetch data from the API
      const response = await fetch(
        `http://localhost:5000/api/editStatus/${id}/accept`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Parse the JSON response
      const jsonData = await response.json();

      setAction(1);
      setLoad(false);
      // Update state with the fetched data
    } catch (error) {
      // Update state if an error occurs
    }
  };

  const handleReject = async (id) => {
    // Handle reject action here
    setLoad(true);
    console.log("Rejected application with ID:", id);
    try {
      // Fetch data from the API
      const response = await fetch(
        `http://localhost:5000/api/editStatus/${id}/reject`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      // Parse the JSON response

      const jsonData = await response.json();
      setAction(2);
      setLoad(false);
      // Update state with the fetched data
    } catch (error) {
      // Update state if an error occurs
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto mt-8">
      <h2
        className="text-red-500 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        Visit Home
      </h2>
      <h2 className="text-2xl font-semibold mb-4">Visa Applications</h2>
      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Visa Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purpose
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((application) => (
              <tr key={application.applicant_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.visaType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {application.purpose}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleAccept(application.applicant_id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(application.applicant_id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
