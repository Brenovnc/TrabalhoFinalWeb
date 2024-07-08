import React, { useEffect, useRef, useState } from 'react';
import H from '@here/maps-api-for-javascript';
import axios from 'axios';
import pinVermelhin from '../../assets/pinVermelhin.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const useHereMap = (apikey, mapContainerRef) => {
  const platform = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!map.current && mapContainerRef.current) {
      platform.current = new H.service.Platform({ apikey });
      const defaultLayers = platform.current.createDefaultLayers({ pois: true });

      const newMap = new H.Map(
        mapContainerRef.current,
        defaultLayers.vector.normal.map,
        { zoom: 5, center: { lat: -18.5122, lng: -44.5550 } }
      );

      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));

      map.current = newMap;
    }

    return () => {
      if (map.current) {
        map.current.dispose();
      }
    };
  }, [apikey, mapContainerRef]);

  return { platform, map };
};

const Map = ({ apikey }) => {
  const mapRef = useRef(null);
  const { map } = useHereMap(apikey, mapRef);
  const [markers, setMarkers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/localidades');
        const locais = response.data;

        locais.forEach(local => {
          addMarkerToMap(map.current, local.latitude, local.longitude, pinVermelhin, local);
        });

        setMarkers(locais);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (map.current) {
      fetchData();
    }
  }, [map]);

  const addMarkerToMap = (map, lat, lng, imageUrl, local) => {
    const icon = new H.map.Icon(imageUrl, { size: { w: 50, h: 50 } });
    const coords = { lat: parseFloat(lat), lng: parseFloat(lng) };
    const marker = new H.map.Marker(coords, { icon });

    marker.addEventListener('tap', () => {
      setSelectedLocation(local);
      setShowModal(true);
    });

    map.addObject(marker);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedLocation(null);
  };

  const handleBuy = async () => {
    try {
      const token = sessionStorage.getItem('token');
      console.log(token);

      const response = await axios.post('http://localhost:3000/api/passagens', {
        location: selectedLocation.nome,
        price: selectedLocation.precoPassagem,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Envia o token no cabeçalho da requisição
        }
      });
  
      console.log(response);
  
      alert(`Compra realizada com sucesso para ${selectedLocation.nome}`);
  
      handleClose();
    } catch (error) {
      console.error('Erro ao comprar passagens:', error);
      alert('Erro ao comprar passagens. Por favor, tente novamente.');
    }
  };

  return (
    <div className="divEnvolveMapa">
      <div className="mapa" ref={mapRef}></div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedLocation?.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Descrição: {selectedLocation?.descricao}</p>
          <p>Passagens disponíveis: {selectedLocation?.passagens}</p>
          <p>Preço: {selectedLocation?.precoPassagem}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="success" onClick={handleBuy}>
            Comprar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Map;
