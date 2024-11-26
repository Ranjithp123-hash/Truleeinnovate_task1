const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const port = 5000;

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/task2candidate")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));



//  schema and model for candidates 
const CandidateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true,  unique: true },
    companytitle: { type: String, required: true },
    experience: { type: String, required: true },
    jobdescription: { type: String, required: true },
    skills: { type: String, required: true },
    optionaltext: {type:String,required:false},
    dateAdded: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now }
  },
  { collection: "candidates" }
);


const Candidate = mongoose.model("Candidate", CandidateSchema);  

// skills schema 

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { collection: "skills" }
);

const Skill = mongoose.model("Skill", SkillSchema);



app.use(express.json());
app.use(cors());

// Add a new candidate
app.post("/addcandidates", async (req, res) => {
  const { title, companytitle, experience, jobdescription, skills, optionaltext } = req.body;

 
  if (!title || !companytitle || !experience || !jobdescription || !skills) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
  
    const existingCandidate = await Candidate.findOne({ title });
    if (existingCandidate) {
      return res.status(405).json({ message: "Title already exists. Please use a different title." });
    }

    const candidate = new Candidate({ title, companytitle, experience, jobdescription, skills, optionaltext });
    await candidate.save();
    res.json({ status: 200, message: "Job position added successfully." });
  } catch (error) {
    console.error("Error inserting candidate:", error);
    res.status(500).json({ message: "Error inserting candidate." });
  }
});



// Update a candidate
app.put("/updatecandidate", async (req, res) => {
  const { id, title, companytitle, experience, jobdescription, skills, optionaltext } = req.body;


  if (!id) {
    return res.status(400).send("ID is required");
  }

  try {
    const updateFields = {};
    if (title) updateFields.title = title;
    if (companytitle) updateFields.companytitle = companytitle;
    if (experience) updateFields.experience = experience;
    if (jobdescription) updateFields.jobdescription = jobdescription;
    if (skills) updateFields.skills = skills;
    if (optionaltext) updateFields.optionaltext = optionaltext;

    const result = await Candidate.findByIdAndUpdate(id, updateFields, { new: true });

    if (!result) {
      return res.status(404).send("Candidate not found");
    }
    res.status(200).send(`Candidate with ID ${id} updated successfully`);
  } catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).send("Error updating candidate");
  }
});






// Get all candidates 
app.get("/getcandidates", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    console.error("Error getting candidates:", error);
    res.status(500).send("Error getting job positions");
  }
});




// add new skills 
app.post("/addskill", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Skill name is required");
  }

  try {
    const skill = new Skill({ name });
    await skill.save();
    res.json({ status: 200, message: "Skill added successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send("Skill already exists");
    }
    console.error("Error adding skill:", error);
    res.status(500).send("Error adding skill");
  }
});

// get skills 
app.get("/getskills", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    console.error("Error getting skills:", error);
    res.status(500).send("Error getting skills");
  }
});





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
