import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "./styles.css";

export default function App() {
  const [formData, setFormData] = useState(null);
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
        <div>{JSON.stringify(formData.data.sheetData)}</div>
      </div>
    );
  }
}
