import React, { useEffect, useRef, useState } from 'react';
import H from '@here/maps-api-for-javascript';
import axios from 'axios';
import pinVermelhin from '../../assets/pinVermelhin.png'; // Importe a imagem aqui

const Map = ({ apikey }) => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const platform = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current) {
      platform.current = new H.service.Platform({ apikey });
      const defaultLayers = platform.current.createDefaultLayers({ pois: true });

      const newMap = new H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        { zoom: 5, center: { lat: -18.5122, lng: -44.5550 } }
      );

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));

      map.current = newMap;
    }

    // Fetch data from your API and add markers
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/localidades');
        const locais = response.data;
        console.log(locais);

        locais.forEach(local => {
          addMarkerToMap(map.current, local.latitude, local.longitude, pinVermelhin); // Use a variável importada
        });

        setMarkers(locais); // Optionally, store markers in state if needed elsewhere
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apikey]);

  const addMarkerToMap = (map, lat, lng, imageUrl) => {
    const icon = new H.map.Icon(imageUrl, { size: { w: 50, h: 50 } });
    const coords = { lat, lng };
    const marker = new H.map.Marker(coords, { icon });

    map.addObject(marker);
  };

  return (
    <div className="divEnvolveMapa">
      <div className="mapa" ref={mapRef}></div>
    </div>
  );
};

export default Map;
