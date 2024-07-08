import React, { useEffect, useRef, useState } from 'react';
import H from '@here/maps-api-for-javascript';
import axios from 'axios';
import pinVermelhin from '../../assets/pinVermelhin.png'; // Importe a imagem aqui
import MarkerInfoWindow from './PopoverComponent';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import Carrossel from './Carrossel';

const Map = ({ apikey }) => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const platform = useRef(null);
  const map = useRef(null);
  const ui = useRef(null); // Referência para a interface de usuário do mapa

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
      ui.current = H.ui.UI.createDefault(newMap, defaultLayers); // Inicializa a interface de usuário

      map.current = newMap;
    }

    // Fetch data from your API and add markers
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/localidades');
        const locais = response.data;
        console.log(locais);

        // Clear previous markers
        map.current.removeObjects(map.current.getObjects());

        // Add new markers
        locais.forEach(local => {
          addMarkerToMap(map.current, local.latitude, local.longitude, local); // Pass localidade como parâmetro
        });

        setMarkers(locais); // Update markers state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apikey]);

  const addMarkerToMap = (map, lat, lng, localidade) => {
    const icon = new H.map.Icon(pinVermelhin, { size: { w: 50, h: 50 } });
    const coords = { lat: parseFloat(lat), lng: parseFloat(lng) }; // Convert to numbers
    const marker = new H.map.Marker(coords, { icon });

    // Event listener for marker click
    marker.addEventListener('tap', () => {
      const popover = (
        <Popover id={`popover-${localidade.id}`} style={{ maxWidth: '600px' }}>
          <Popover.Header>{localidade.nome}</Popover.Header>
          <Popover.Body>
            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
              <Carrossel imagens={localidade.imgs} />
            </div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <p>Valor da passagem: R$ {localidade.precoPassagem.toFixed(2)}</p>
            <Button variant="light">Comprar Passagem</Button><br/>
            <Button variant="light">Voltar</Button>
          </Popover.Body>
        </Popover>
      );

      const popoverElement = (
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <Button variant="outline-light">Ver Detalhes</Button>
        </OverlayTrigger>
      );

      const bubble = new H.ui.InfoBubble(coords, {
        content: popoverElement
      });

      ui.current.addBubble(bubble); // Adiciona o info bubble através da interface de usuário

      // Close info bubble when map is clicked
      map.addEventListener('tap', () => {
        ui.current.removeBubble(bubble);
      });
    });

    map.addObject(marker);
  };

  return (
    <div className="divEnvolveMapa">
      <div className="mapa" ref={mapRef}></div>
    </div>
  );
};

export default Map;
