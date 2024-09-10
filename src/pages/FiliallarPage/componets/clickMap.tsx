/** @jsxImportSource @emotion/react */
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  position: [number, number];
  onPositionChange: (position: [number, number]) => void;
}

export const Maps: React.FC<LeafletMapProps> = ({ position }) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "200px", width: "100%" }}
      scrollWheelZoom={false} // Disable zooming with the mouse wheel
      touchZoom={false} // Disable zooming with touch
      doubleClickZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Filial Manzil</Popup>
      </Marker>
    </MapContainer>
  );
};
