import { useEffect, useState } from "react";
import axios from "axios";
import { MdClearAll } from "react-icons/md";

const AddPositionForm = ({ show, onClose }) => {
  const [newCandidate, setNewCandidate] = useState({
    title: "",
    companytitle: "",
    jobdescription: "",
    skills: "",
    optionaltext: "",
    minExperience: "",
    maxExperience: "",
  });

  const [availableSkills, setAvailableSkills] = useState([]);
  const [errors, setErrors] = useState({}); 
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getskills");
        setAvailableSkills(response.data || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
        alert("Failed to fetch skills.");
      }
    };
    fetchSkills();
  }, []);

  const validateInputs = () => {
    const newErrors = {};

    if (!newCandidate.title.trim()) newErrors.title = "Title is required.";
    if (!newCandidate.companytitle.trim())
      newErrors.companytitle = "Company name is required.";
    if (!newCandidate.jobdescription.trim())
      newErrors.jobdescription = "Job description is required.";
    if (!newCandidate.minExperience.trim() || isNaN(newCandidate.minExperience))
      newErrors.minExperience = "Minimum experience must be a valid number.";
    if (!newCandidate.maxExperience.trim() || isNaN(newCandidate.maxExperience))
      newErrors.maxExperience = "Maximum experience must be a valid number.";
    if (
      newCandidate.minExperience &&
      newCandidate.maxExperience &&
      parseInt(newCandidate.minExperience) > parseInt(newCandidate.maxExperience)
    )
      newErrors.minExperience =
        "Minimum experience cannot exceed maximum experience.";
    if (!newCandidate.skills.trim())
      newErrors.skills = "At least one skill must be selected.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSkill = (skill) => {
    const existingSkills = newCandidate.skills.split(", ").filter(Boolean);
    if (existingSkills.includes(skill)) {
      alert("This skill has already been added.");
      return;
    }
    setNewCandidate((prev) => ({
      ...prev,
      skills: prev.skills ? `${prev.skills}, ${skill}` : skill,
    }));
  };

  const removeSkill = (skillToRemove) => {
    setNewCandidate((prev) => ({
      ...prev,
      skills: prev.skills
        .split(", ")
        .filter((skill) => skill !== skillToRemove)
        .join(", "),
    }));
  };

  const clearSkills = () => {
    setNewCandidate((prev) => ({
      ...prev,
      skills: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveCandidateData = async () => {
    setIsSubmitted(true); 
    if (validateInputs()) {
      try {
        const experienceString = `${newCandidate.minExperience}-${newCandidate.maxExperience} years`;
        const candidateData = {
          ...newCandidate,
          experience: experienceString,
        };

        const response = await axios.post(
          "http://localhost:5000/addcandidates",
          candidateData
        );

        if (response.data.status === 200) {
          alert("Candidate added successfully!");
          setNewCandidate({
            title: "",
            companytitle: "",
            jobdescription: "",
            skills: "",
            optionaltext: "",
            minExperience: "",
            maxExperience: "",
          });
          setErrors({});
          setAvailableSkills([]);
          onClose();
          window.location.reload();
        } else {
          alert("Failed to add candidate. Please check your input or try again.");
        }
        console.log(response.data)
      } catch (error) {
        if (error.status === 405){
            alert("Title Already Exists!")

        }else{
        
        alert("Error adding candidate: " + (error.response?.data || error.message));
        }
      }
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 mt-5 w-full max-w-md bg-white shadow-lg transform transition-transform duration-300 ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">New Position</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500">
          &times;
        </button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto">
      
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={newCandidate.title}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              isSubmitted && errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter title"
          />
          {isSubmitted && errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="companytitle"
            value={newCandidate.companytitle}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              isSubmitted && errors.companytitle
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter company name"
          />
          {isSubmitted && errors.companytitle && (
            <p className="text-red-500 text-sm">{errors.companytitle}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Experience <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            <input
              type="number"
              name="minExperience"
              value={newCandidate.minExperience}
              onChange={handleChange}
              className={`mt-1 block w-1/2 px-3 py-2 border ${
                isSubmitted && errors.minExperience
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Min Experience"
            />
            <input
              type="number"
              name="maxExperience"
              value={newCandidate.maxExperience}
              onChange={handleChange}
              className={`mt-1 block w-1/2 px-3 py-2 border ${
                isSubmitted && errors.maxExperience
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Max Experience"
            />
          </div>
          {isSubmitted && errors.maxExperience && (
            <p className="text-red-500 text-sm">{errors.maxExperience}</p>
          )}
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="jobdescription"
            value={newCandidate.jobdescription}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${
              isSubmitted && errors.jobdescription
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter job description"
          ></textarea>
          {isSubmitted && errors.jobdescription && (
            <p className="text-red-500 text-sm">{errors.jobdescription}</p>
          )}
        </div>

       
        <div className="w-full flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">

  

  <div className="flex w-full items-center ">
  <label className="block text-sm font-medium text-gray-700 md:w-1/4">
    Skills <span className="text-red-500">*</span>
  </label>
 
    <select
      onChange={(e) => addSkill(e.target.value)}
      className={`mt-1  block w-full md:w-[80%] px-3 me-4 py-2 border ${
        isSubmitted && errors.skills ? "border-red-500" : "border-gray-300"
      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
    >
      <option value="">Select a skill</option>
      {availableSkills?.map((skill) => (
        <option key={skill._id} value={skill.name}>
          {skill.name}
        </option>
      ))}
    </select>

    
    <div className="mt-2 ">
      <button
        onClick={clearSkills}
        type="button"
        className="text-4xl  text-blue-500 flex items-center"
      >
        <MdClearAll className="mr-1" />
       
      </button>
    </div>
  </div>


  {isSubmitted && errors.skills && (
    <p className="text-red-500 text-sm mt-2 md:mt-0">{errors.skills}</p>
  )}


</div>

<div className="mt-4 w-full flex flex-wrap">
    {newCandidate.skills.length === 0
      ? ""
      : newCandidate.skills.split(", ").map((skill, index) => (
          <div
            key={index}
            className="inline-block bg-gray-200 text-gray-700 text-xs rounded-full py-1 px-2 mr-2 mb-2"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
  </div>


        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Optional Text
          </label>
          <textarea
            name="optionaltext"
            value={newCandidate.optionaltext}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter optional Text"
          ></textarea>
        </div>

        
        <button
          onClick={saveCandidateData}
          className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddPositionForm;
