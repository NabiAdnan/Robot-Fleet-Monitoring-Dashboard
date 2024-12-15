import React from "react";
import "./RobotList.css";

const RobotList = ({ robots }) => {
  return (
    <div className="robot-list">
      <h2>Robot Fleet</h2>
      <ul>
        {robots.map((robot) => (
          <li key={robot["Robot ID"]} className={robot["Online/Offline"] ? "" : "offline"}>
            <p>ID: {robot["Robot ID"]}</p>
            <p>Status: {robot["Online/Offline"] ? "Online" : "Offline"}</p>
            <p>Battery: {robot["Battery Percentage"]}%</p>
            <p>CPU: {robot["CPU Usage"]}%</p>
            <p>RAM: {robot["RAM Consumption"]} MB</p>
            <p>Last Updated: {robot["Last Updated"]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RobotList;
