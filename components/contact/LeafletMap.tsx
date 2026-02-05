"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icon in Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface LeafletMapProps {
    position: [number, number];
    zoom?: number;
}

export default function LeafletMap({ position, zoom = 13 }: LeafletMapProps) {
    return (
        <div className="w-full h-full rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 z-0">
            <MapContainer
                center={position}
                zoom={zoom}
                scrollWheelZoom={false}
                className="w-full h-full z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={position} icon={icon}>
                    <Popup>
                        <div className="text-black font-sans">
                            <strong>Archetype Studio</strong><br />
                            Ohiostraße 15<br />
                            76149 Karlsruhe, Germany
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
            <style jsx global>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          background: #0f0f0f;
        }
      `}</style>
        </div>
    );
}
