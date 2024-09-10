import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface LeafletMapProps {
  position: [number, number];
  onPositionChange: (position: [number, number]) => void;
}

export const BuyurtmaMaps: React.FC<LeafletMapProps> = ({
  position,
  onPositionChange,
}) => {
  const [mapPosition, setMapPosition] = useState<[number, number]>(position);

  useEffect(() => {
    setMapPosition(position);
  }, [position]);

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (map) {
        map.setView(mapPosition);
      }
    }, [map, mapPosition]);
    return null;
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
        setMapPosition(newPosition);
        onPositionChange(newPosition);
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={mapPosition}
      zoom={12}
      style={{ height: "180px", width: "100%", borderRadius: "10px" }}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      touchZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={mapPosition} />
      <MapUpdater />
      <MapClickHandler />
    </MapContainer>
  );
};
