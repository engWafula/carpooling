import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, Polyline, InfoWindow, DirectionsService, DirectionsRenderer, } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

const libraries = ['places'];
const mapContainerStyle = {
  width: '50vw',
  height: '40vh',
};
const center = {
  lat: 7.2905715, 
  lng: 80.6337262, 
};

const MapContainer = ({ data }) => {
  console.log(data,"DADAFFA");
  const [st, setSt] = useState({ lat: 0, lng: 0 });
  const [selectedMarker, setSelectedMarker] = useState(null);
  
  const history = useNavigate();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAHm77mGzhhruEWKb8kbSFhxzrN_SHErzo',
    libraries,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSt({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  console.log(st,"AJAJHAJAAA");

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const handleMarkerClick = (info) => {
    history.navigate(`/booking/${info._id}`);
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={st}
      >


          <Marker position={st} />
      

          {/* <Marker
            position={{ lat: data.latitude, lng: data.longitude }}
            onClick={() => setSelectedMarker(data)}
          /> */}

<Marker
  position={{ lat: data.latitude, lng: data.longitude }}
  onClick={() => setSelectedMarker(data)}
  icon={{
    url: "https://www.svgrepo.com/show/10210/car.svg",
    scaledSize: new window.google.maps.Size(30, 30), // Adjust the size of the icon
  }}
/>

 {st && (
          <Polyline
            path={[st, { lat: data.latitude, lng: data.longitude }]}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1.0,
              strokeWeight: 2,
              geodesic: true,
            }}
          />
        )} 

{selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <p>{selectedMarker.name}</p>
              <p>Rent Per Hour: {selectedMarker.rentPerHour}</p>
              <p>Fuel Type: {selectedMarker.fuelType}</p>
              <p>Max Persons: {selectedMarker.capacity}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
