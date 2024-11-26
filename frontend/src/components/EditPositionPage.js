// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const EditPositionPage = ({ position, onClose }) => {
//   const [formData, setFormData] = useState({
//     title: position.title || "",
//     companyName: position.companytitle || "",
//     experience: position.experience || "",
//     jobDescription: position.jobdescription || "",
//     skills: position.skills || [],
//     additionalNotes: position.additionalNotes || "",
//   });

//   const [newSkill, setNewSkill] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleAddSkill = () => {
//     if (newSkill.trim()) {
//       setFormData((prevState) => ({
//         ...prevState,
//         skills: [...prevState.skills, newSkill.trim()],
//       }));
//       setNewSkill("");
//     }
//   };

//   const handleRemoveSkill = (skillToRemove) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       skills: prevState.skills.filter((skill) => skill !== skillToRemove),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedData = {
//       title: formData.title,
//       companytitle: formData.companyName,
//       experience: formData.experience,
//       jobdescription: formData.jobDescription,
//       skills: formData.skills.join(", "), 
//       additionalNotes: formData.additionalNotes,
//     };

//     try {
//       const response = await axios.post("http://localhost:5000/update-position", updatedData);
//       console.log(response.data); 
//       onClose();
//     } catch (error) {
//       console.error("Error updating position:", error);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <button onClick={onClose} className="absolute top-3 right-3 p-2 bg-gray-200 rounded-full text-black">X</button>
//       <h3 className="text-xl font-semibold">Edit Position</h3>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex flex-col space-y-2">
//           <label htmlFor="title">Position Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="input-field"
//           />
//         </div>

//         <div className="flex flex-col space-y-2">
//           <label htmlFor="companyName">Company</label>
//           <input
//             type="text"
//             id="companyName"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//             required
//             className="input-field"
//           />
//         </div>

//         <div className="flex flex-col space-y-2">
//           <label htmlFor="experience">Experience (Years)</label>
//           <input
//             type="number"
//             id="experience"
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             required
//             className="input-field"
//           />
//         </div>

//         <div className="flex flex-col space-y-2">
//           <label htmlFor="jobDescription">Job Description</label>
//           <textarea
//             id="jobDescription"
//             name="jobDescription"
//             value={formData.jobDescription}
//             onChange={handleChange}
//             required
//             className="input-field"
//           />
//         </div>

//         <div className="flex flex-col space-y-2">
//           <label htmlFor="skills">Skills</label>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               id="skills"
//               name="newSkill"
//               value={newSkill}
//               onChange={(e) => setNewSkill(e.target.value)}
//               className="input-field w-1/2"
//             />
//             <button
//               type="button"
//               onClick={handleAddSkill}
//               className="btn-primary"
//             >
//               Add
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {formData.skills.map((skill, index) => (
//               <span
//                 key={index}
//                 className="bg-gray-200 px-3 py-1 rounded-full flex items-center space-x-1"
//               >
//                 <span>{skill}</span>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveSkill(skill)}
//                   className="text-red-500"
//                 >
//                   &times;
//                 </button>
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="flex flex-col space-y-2">
//           <label htmlFor="additionalNotes">Additional Notes</label>
//           <textarea
//             id="additionalNotes"
//             name="additionalNotes"
//             value={formData.additionalNotes}
//             onChange={handleChange}
//             className="input-field"
//           />
//         </div>

//         <button type="submit" className="btn-primary w-full">Update Position</button>
//       </form>
//     </div>
//   );
// };

// export default EditPositionPage;
