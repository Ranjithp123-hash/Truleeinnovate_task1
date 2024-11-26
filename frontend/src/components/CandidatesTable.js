import React, { useEffect, useState } from "react";
import AddPositionForm from "./AddPositionForm";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { LuFilter } from "react-icons/lu";
import { IoIosList } from "react-icons/io";

import { AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import CandidateDataCard from "./CandiateDataCard";
import { MdOutlineViewKanban } from "react-icons/md";

const CandidatesTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("table");

  const navigate = useNavigate();

  const handleViewDetails = (position) => {
    navigate("/position-details", { state: { position } });
  };
  
  const recordsPerPage = 10;

  useEffect(() => {
    handleCandidates();
  }, []);

  const onEdit = () => {

  }

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);
   

  const totalPages = Math.ceil(filteredCandidates.length / recordsPerPage);


  const currentRecords = filteredCandidates.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  
  const handleSearch = (term) => {
   setSearchTerm(term);
    const filtered = candidates.filter(
      (candidate) =>
        candidate.companytitle.toLowerCase().includes(term.toLowerCase()) ||
        candidate.title.toLowerCase().includes(term.toLowerCase()) ||
        candidate.skills.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCandidates(filtered);
  };


  const handleCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getcandidates');
    const rev_data = response.data.reverse();
       console.log(rev_data)
      setCandidates(rev_data);
      setFilteredCandidates(rev_data);
     
    } catch (error) {
      console.error("Error fetching candidates:", error);
      alert("Failed to fetch candidates. Please try again later.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Positions</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="flex justify-between items-center w-full mb-4">
  
  <div className="flex items-center gap-4">
    <button className="p-2 bg-gray-100  shadow hover:bg-gray-200" 
     onClick={() => setViewMode("card")}
    >
      <MdOutlineViewKanban 
       
        className="text-blue-500" 
      />
    </button>
    <button className="p-2 bg-gray-100  shadow hover:bg-gray-200"
     onClick={() => setViewMode("table")}
    >
      <IoIosList 
       
          
      className="text-blue-500" 
      />
    </button>
    
  </div>

  <div className="flex items-center gap-4">
    
    <div className="input-group flex items-center">
      <span className="input-group-text bg-white border-r-0 text-primary p-2">
        <BiSearch />
      </span>
      <input
        type="text"
        className="border border-l-0 p-2 w-48"
        placeholder="Search by Company, Title"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>

   
    <div className="flex items-center">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="px-2 py-1 bg-slate-800 text-cyan-50 rounded hover:bg-slate-700"
      >
        &lt;
      </button>
      <span className="px-2">{currentPage} / {totalPages}</span>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="px-2 py-1 bg-slate-800 text-cyan-50 rounded hover:bg-slate-700"
      >
        &gt;
      </button>
    </div>

   
    <button
  
      className="p-2 border rounded shadow hover:bg-gray-200"
    >
      <LuFilter className="text-primary" />
    </button>
  </div>
</div>





{viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 border border-gray-300 text-left">Title</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Company</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Description</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Experience</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Skills</th>
                <th className="px-4 py-2 border border-gray-300 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((position, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2 border border-gray-300">{position.title}</td>
                  <td className="px-4 py-2 border border-gray-300">{position.companytitle}</td>
                  <td className="px-4 py-2 border border-gray-300">{position.jobdescription}</td>
                  <td className="px-4 py-2 border border-gray-300">{position.experience}</td>
                  <td className="px-4 py-2 border border-gray-300">{position.skills}</td>
                 
                   <td className="px-6 py-4 border-b border-gray-300 text-center">
                  <div className="flex gap-3 justify-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition duration-200"
                      title="View Details"
                      onClick={() => handleViewDetails(position)}
                    >
                      <AiOutlineEye size={20} />
                    </button>
                    <div className="flex gap-3 justify-center">
                      <button
                        className="text-green-500 hover:text-green-700 transition duration-200"
                        title="Edit Position"
                        // onClick={() => onEdit(position)}
                      >
                        <AiOutlineEdit size={20} />
                      </button>
                    </div>
                  </div>
                </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <CandidateDataCard candidates={currentRecords} />
      )}




      <AddPositionForm show={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
};

export default CandidatesTable;
