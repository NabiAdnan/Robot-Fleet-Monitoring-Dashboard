import React, { useState, useEffect } from "react";
import RobotList from "./components/RobotList";
import MapView from "./components/MapView";
import "./App.css";

const App = () => {
  const [robots, setRobots] = useState([]);

  // Fetch initial data using REST API
  useEffect(() => {
    fetch("http://localhost:8000/robots")
      .then((response) => response.json())
      .then((data) => setRobots(data))
      .catch((error) => console.error("Error fetching initial data:", error));
  }, []);

  // Set up WebSocket for real-time updates
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/robots");
    ws.onmessage = (event) => {
      const updatedRobots = JSON.parse(event.data);
      setRobots(updatedRobots);
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket closed");

    return () => ws.close();
  }, []);

  return (
    <div className="dashboard">
      <RobotList robots={robots} />
      <MapView robots={robots} />
    </div>
  );
};

export default App;
