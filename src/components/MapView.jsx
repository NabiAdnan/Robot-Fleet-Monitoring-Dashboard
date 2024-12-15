import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ robots }) => {
  return (
    <div className="map-view">
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {robots.map((robot) => (
          <Marker key={robot["Robot ID"]} position={robot["Location Coordinates"]}>
            <Popup>
              <p>ID: {robot["Robot ID"]}</p>
              <p>Status: {robot["Online/Offline"] ? "Online" : "Offline"}</p>
              <p>Battery: {robot["Battery Percentage"]}%</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
