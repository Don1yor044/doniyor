import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Header } from "antd/es/layout/layout";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { message } from "antd";

const getIcon = (color: string) => `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 4.15 6.5 11 7 11s7-6.85 7-11c0-3.87-3.13-7-7-7zm0 13c-1.93 0-3.5-2.07-3.5-3.5S10.07 8 12 8s3.5 2.07 3.5 3.5S13.93 15 12 15zm0-5.5c-1.03 0-1.88.85-1.88 1.88S10.97 13 12 13s1.88-.85 1.88-1.88S13.03 8.5 12 8.5z" fill="${color}"/>
</svg>
`;

const customIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(getIcon("#FF0000"))}`,
  iconSize: [54, 54],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

interface DraggableMarkerProps {
  position: [number, number];
  popupText: string;
}

export function DraggableMarker({ position, popupText }: DraggableMarkerProps) {
  return (
    <Marker position={position} icon={customIcon} draggable={false}>
      <Popup>{popupText}</Popup>
    </Marker>
  );
}

export const Xarita = () => {
  const [filialData, setFilialData] = useState([]);
  useEffect(() => {
    filialRender();
  }, []);
  const filialRender = async () => {
    try {
      const res = await axios.get(
        `https://46d4deb0e08aaad2.mokky.dev/Filiallar`
      );
      setFilialData(res.data);
      console.log(res.data);
    } catch (error) {
      message.error("apida xatolik");
    }
  };
  const parseCoordinates = (address: string): [number, number] | null => {
    // Extract latitude and longitude from the address string
    const coordinates = address
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    if (
      coordinates.length === 2 &&
      !isNaN(coordinates[0]) &&
      !isNaN(coordinates[1])
    ) {
      return [coordinates[0], coordinates[1]];
    }
    return null;
  };
  return (
    <>
      <Header
        style={{ padding: 0, display: "flex", gap: 3, background: "#EDEFF3" }}
      >
        <div
          style={{
            marginLeft: 3,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "white",
            width: "100%",
          }}
        ></div>
      </Header>
      <div className="w-full h-full bg-slate-100 ">
        <div
          style={{ height: "calc(100vh - 90px)" }}
          className="relative flex justify-center"
        >
          <div
            style={{ height: "calc(100vh - 90px - 24px)", width: "100%" }}
            className="p-4 mx-4 my-3 bg-white shadow-lg "
          >
            <MapContainer
              center={[41.32515, 69.29151]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filialData.map((item: any) => {
                const coordinates = parseCoordinates(item.address);
                return (
                  coordinates && (
                    <DraggableMarker
                      key={item.id}
                      popupText={item.nameUz}
                      position={coordinates}
                    />
                  )
                );
              })}
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
};
