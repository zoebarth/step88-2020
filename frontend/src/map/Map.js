import React from 'react';
import {
  Map as GoogleMap,
  GoogleApiWrapper,
} from 'google-maps-react';
import styles from './Map.module.css';
import { MOCK_DATA } from '../route/mockData.js';
const MAPS_API_KEY = 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg';
const MAPS_EMBED_URL = 'https://www.google.com/maps/embed/v1/directions';

/**
 * Makes a call to Map Embed API to display route between multiple locations.
 * @param {list} attractions list of locations to route between
 * @param {string} mode either 'pins' or 'directions' to put on the map
 * @param {Object} centerLocation the center of the map, the location of the attraction the user initially searched
 */

function Map({ attractions, mode, centerLocation, google, onReady, view }) {
  const onPinsReady = (mapProps, map) => {
    onReady(google, map);
    for (const attraction of attractions) {
      const location = {
        lat: attraction.coordinates.lat,
        lng: attraction.coordinates.lng,
      };

      const infowindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h4>${attraction.attractionName}</h4>
            <div>Short description of attraction if desired</div>
            <div>
              <img src="${attraction.photoUrl}" alt="${attraction.attractionName} Image" />
            </div>
          </div>
        `,
      });
      const marker = new google.maps.Marker({
        position: location,
        map,
        title: attraction.attractionName,
      });
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
    }
  };

  if (mode === 'pins') {
    return (
      <GoogleMap
        className={styles.mapContainer}
        google={google}
        onReady={onPinsReady}
        center={centerLocation}
        zoom={14}
      />
    );
  }
  attractions = MOCK_DATA;
  const attractionNames = attractions.map((attraction) =>
    encodeURIComponent(attraction.attractionName).replace(/%20/g, '+')
  );
  const origin = attractionNames[0];
  const destination = attractionNames[attractionNames.length - 1];
  const waypoints = attractionNames.slice(1, attractionNames.length - 1);
  const waypointsParam = waypoints.length > 0 ? `waypoints=${waypoints.join('|')}` : '';

  return (
    <div className={styles.mapContainer}>
      <iframe
        className={styles.map}
        title="trip-map"
        src={`${MAPS_EMBED_URL}?key=${MAPS_API_KEY}&origin=${origin}&destination=${destination}&${waypointsParam}`}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDD_xK2HDMKPmDrsHndH5SAK9Jl-k5rHdg',
  libraries: ['places'],
})(Map);
