import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export const MapContainer = ({ google }) => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        // Sample latitude and longitude data
        const sampleLocations = [
            { lat: 37.7749, lng: -122.4194 }, // San Francisco
            { lat: 34.0522, lng: -118.2437 }, // Los Angeles
            { lat: 40.7128, lng: -74.0060 }   // New York
            // Add more coordinates as needed
        ];
        setLocations(sampleLocations);
    }, []);

    const mapStyles = {
        width: '100%',
        height: '100%'
    };

    return (
        <Map
            google={google}
            zoom={4}
            style={mapStyles}
            initialCenter={{ lat: 37.7749, lng: -122.4194 }} // Initial map center
        >
            {locations.map((location, index) => (
                <Marker key={index} position={location} />
            ))}
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDNhv1oWgIRBgv0DhUUF4vIeNbfYZ0Arzg' // Replace with your Google Maps API key
})(MapContainer);
