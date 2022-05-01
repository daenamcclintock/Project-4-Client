import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiZG1jY2xpbnRvY2sxMyIsImEiOiJjbDJudGxoYjQyNWI1M2RwbDk3a3oxYWEzIn0.iIbD8pohUJSXTf9Gf9AujQ';

const CreateMap = () => {

    const mapContainer = useRef(null);
        const map = useRef(null);
        const [lng, setLng] = useState(-70.9);
        const [lat, setLat] = useState(42.35);
        const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: zoom
        });
      });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });
        });


    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
        );
}

export default CreateMap