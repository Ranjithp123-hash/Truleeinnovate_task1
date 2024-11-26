import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CandidatesTable from "./components/CandidatesTable";
import Header from "./components/Header";
import CandidateView from "./components/CandidateView";

function App() {
  // const [showCandidatesTable, setShowCandidatesTable] = useState(false);

  // const handleShowPositions = () => {
  //   setShowCandidatesTable(true);
  // };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header path='/' />
        <Routes>
          <Route
            path="/candidate-details"
            element={ <CandidatesTable />}
          />
          <Route path="/position-details"  element={<CandidateView  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
