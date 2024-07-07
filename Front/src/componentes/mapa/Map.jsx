import React, { useEffect, useRef, useState } from 'react';
import H from '@here/maps-api-for-javascript';
import axios from 'axios';
import pinVermelhin from '../../assets/pinVermelhin.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import MapScreen from './MapScreen'; // Certifique-se de que você está usando o MapScreen corretamente

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
  const [quantidadePassagens, setQuantidadePassagens] = useState(1); // Estado para controlar a quantidade de passagens

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
      setQuantidadePassagens(1); // Ao abrir o modal, resetamos a quantidade para 1
    });

    map.addObject(marker);
  };

  const handleIncrease = () => {
    if (quantidadePassagens < selectedLocation.passagens) {
      setQuantidadePassagens(prev => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantidadePassagens > 1) {
      setQuantidadePassagens(prev => prev - 1);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedLocation(null);
    setQuantidadePassagens(1); // Ao fechar o modal, resetamos a quantidade para 1
  };

  const handleBuy = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/tickets/buyTicket', {
        id: selectedLocation.id,
        passagens: quantidadePassagens
      });

      console.log(response)

      // Atualiza localmente a quantidade de passagens disponíveis
      setSelectedLocation(prevLocation => ({
        ...prevLocation,
        passagens: prevLocation.passagens - quantidadePassagens
      }));

      // Mostra um alerta de sucesso
      const precoTotal = quantidadePassagens * selectedLocation.precoPassagem;
      alert(`Compra realizada de ${quantidadePassagens} passagens para ${selectedLocation.nome}. Preço total: R$ ${precoTotal.toFixed(2)}`);

      handleClose();
    } catch (error) {
      console.error('Erro ao comprar passagens:', error);
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
          <div className="quantidadePassagens">
            <Button variant="outline-secondary" onClick={handleDecrease}>-</Button>
            <span className="quantidadeText">{quantidadePassagens}</span>
            <Button variant="outline-secondary" onClick={handleIncrease}>+</Button>
          </div>
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
