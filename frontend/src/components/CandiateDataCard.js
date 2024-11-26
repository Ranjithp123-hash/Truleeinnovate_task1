import React from 'react';

const CandidateDataCard = ({ candidates }) => {

    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {candidates.map((candidate, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-cyan-400">

          <h3 className=" text-center my-2 text-3xl font-semibold text-cyan-500">{candidate.title}</h3>
          <div className='flex flex-col   mx-5 '>
            <div  className='flex flex-row justify-between items-center'>
            <p className=" text-gray-500 text-xl">Company </p>
            <span className=' text-black'>{candidate.companytitle}</span>
                </div>
         
                <div  className='flex flex-row justify-between items-center'>
          <p className=" text-gray-500 text-xl">Experience </p>
          <span className=' text-black'>{candidate.experience} Years</span>
         </div> 
         <div  className='flex flex-row justify-between items-center'>
          <p className=" text-gray-500 text-xl">Skills:  </p>
          <span className=' text-black '>{candidate.skills}</span>
          </div>
          <div  className='flex flex-row justify-between items-center'>
          <p className=" text-gray-500 text-xl">jobDescription </p>
          <span className=' text-black mx-1 '>{candidate.jobdescription}</span>
          </div>
          
        </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateDataCard;
