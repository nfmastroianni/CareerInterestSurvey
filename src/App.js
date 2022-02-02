import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "./styles.css";
import "flag-icon-css/css/flag-icons.min.css";

export default function App() {
  const [formData, setFormData] = useState(null);
  const [language, setLanguage] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:8888/api/getForms")
        .then((response) => response)
        .then(setFormData);
    }, 1000);
  }, []);
  if (!formData) {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress
          color="success"
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    );
  } else {
    console.log("formData = ", formData);
    return (
      <div className="App">
        <h1>Data Loaded</h1>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div
            className="flag-icon flag-icon-us"
            style={{ width: "3rem", height: "3rem" }}
          ></div>
          <div
            className="flag-icon flag-icon-es"
            style={{ width: "3rem", height: "3rem" }}
          ></div>
        </div>
      </div>
    );
  }
}
