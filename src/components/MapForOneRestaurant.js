import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

const MapForOneRestaurant = ({restaurantName, restaurantCoords}) => {
    return (
        <div>
              <div className="leaflet-container">
                <MapContainer center={restaurantCoords} zoom={20} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

               
                <Marker position={restaurantCoords}>
                <Popup>
                {restaurantName}
                </Popup>
                </Marker>
              

                {/* <CenterMapWithRestaurantCoords /> */}

                </MapContainer>
            </div>
        </div>
    )
}

export default MapForOneRestaurant
