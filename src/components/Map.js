import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

const Map = ({center, restaurants}) => {
    
    const CenterMapWithUserCoords = () => {
        const map = useMap();
        map.setView(center, 15);
        return null;
    }

    return (
        <div>
              <div className="leaflet-container">
                <MapContainer center={center} zoom={11} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {restaurants.map((restaurant) => 
                <Marker position={restaurant.geocodePoints[0].coordinates}>
                <Popup>
                {restaurant.name}
                </Popup>
                </Marker>
                )}

                <CenterMapWithUserCoords />

                </MapContainer>
            </div>
        </div>
    )
}

export default Map
