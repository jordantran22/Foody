import React from 'react'
import { useEffect, useState } from 'react'

const useUserCoordinates = () => {
    const [coords, setCoords] = useState({
        found: false,
        coordinates: {latitude: "", longitude: ""}
    })

    const onSuccess = (coords) => {
        setCoords({
            found: true,
            coordinates: {
                latitude: coords.coords.latitude,
                longitude: coords.coords.longitude
            }
        });
    };

    const onError = (error) => {
        setCoords({
            found: true,
            error
        });
    }

    useEffect(() => {
        if( !("geolocation" in navigator)) {
            onError({
                code: -1,
                errorMessage: "Geolocation not supported on client browser"
            })
        } 

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);


    return coords;
}

export default useUserCoordinates