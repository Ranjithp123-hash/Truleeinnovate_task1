import React from "react";
import { useLocation } from "react-router-dom";

const CandidateView = () => {
  const location = useLocation();
  const position = location.state?.position || {}; 

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Positions / {position.title} </h3>
      
      <div className="flex gap-6 mb-6">
        <button className="text-blue-600 border-b-2 border-blue-600 px-4 pb-2 font-semibold">
          Position
        </button>
        <button className="text-gray-500 px-4 pb-2 font-semibold">Candidates</button>
      </div>
     
      <div className="bg-white p-6 shadow-md rounded-lg flex  flex-col">
     
      <h2 className="text-2xl font-bold mb-6 text-gray-800 ">Position Details:</h2>
      
      <div className=" flex  mb-2">
          <span className="font-semibold text-2xl text-black me-20 ">Title</span> 
          <p className="mb-4 text-gray-700 text-xl">{position.title || "N/A"}
        </p>
      </div>
        

      <div className=" flex mb-2">
          <span className="font-semibold text-2xl text-black me-20 ">Company</span> 
          <p className="mb-4 text-gray-700 text-xl">{position.companytitle || "N/A"}
        </p>
        </div>

        <div className=" flex mb-2">
       
          <span  className="font-semibold text-2xl text-black me-20 ">Skills</span> 
          <p className="mb-4 text-gray-700 text-xl">{position.skills || "N/A"}
        </p>
        </div>

        <div className=" flex mb-2">
       
          <span className="font-semibold text-2xl text-black me-20 ">Job Description</span> 
          <p className="mb-4 text-gray-700 text-xl">{position.jobdescription || "N/A"}
        </p>
        </div>

        <div className=" flex mb-2">

       
          <span className="font-semibold text-2xl text-black me-20 ">Experience</span> 
          <p className="mb-4 text-gray-700 text-xl">{position.experience || "N/A"}
        </p>
        </div>
        
        <div className=" mb-2">

      
        <h2 className="text-md text-black font-bold mb-5 mt-5 ps-2">System Details</h2>
        <div className="flex  justify-between ps-2 ">
        
        <div className="flex">

       
       
          <span className="font-semibold text-black ">Created By </span>
          <p className="mb-4 ps-2">  {position.dateAdded || "N/A"}
        </p>
        </div>
        <div className="flex">
          <span className="font-semibold text-black ">Modified By </span>
          <p className="mb-4 ps-2">  {position.dateAdded || "N/A"}
        </p>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateView;
