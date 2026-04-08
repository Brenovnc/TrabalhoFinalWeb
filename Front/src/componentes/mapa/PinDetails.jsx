import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pinVermelhin from '../../assets/pinVermelhin.png';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formatCurrency = (value) => {
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) {
    return 'R$ 0,00';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(numberValue);
};

const TOAST_CONFIG = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const PinDetails = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    mapInstanceRef.current = L.map(mapContainerRef.current).setView([-18.5122, -44.5550], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);

    setMapReady(true);

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) {
      return;
    }

    let createdMarkers = [];

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/localidades');
        const locais = response.data;

        createdMarkers.forEach((marker) => mapInstanceRef.current.removeLayer(marker));
        createdMarkers = [];

        locais.forEach((local) => {
          const marker = L.marker([local.latitude, local.longitude], {
            icon: L.icon({
              iconUrl: pinVermelhin,
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            }),
          }).addTo(mapInstanceRef.current);

          marker.on('click', () => {
            setSelectedLocation(local);
            setShowModal(true);
          });

          createdMarkers.push(marker);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Erro ao buscar localidades. Por favor, tente novamente mais tarde.', TOAST_CONFIG);
      }
    };

    fetchData();

    return () => {
      createdMarkers.forEach((marker) => mapInstanceRef.current?.removeLayer(marker));
    };
  }, [mapReady]);

  const handleClose = () => {
    setShowModal(false);
    setSelectedLocation(null);
  };

  const handleBuy = async () => {
    if (!selectedLocation) {
      return;
    }
    try {
      const token = sessionStorage.getItem('token');

      await toast.promise(
        axios.post(
          'http://localhost:3000/api/passagens',
          {
            location: selectedLocation.nome,
            price: selectedLocation.precoPassagem,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          pending: 'Finalizando compra...',
          success: `Compra realizada com sucesso para ${selectedLocation.nome}!`,
          error: {
            render({ data }) {
              const serverMessage = data?.response?.data?.message ?? data?.response?.data;
              return serverMessage || 'Erro ao comprar passagens. Por favor, tente novamente.';
            },
          },
        },
        TOAST_CONFIG
      );

      handleClose();
    } catch (error) {
      console.error('Erro ao comprar passagens:', error);
    }
  };

  return (
    <div className="divEnvolveMapa">
      <ToastContainer {...TOAST_CONFIG} />
      <div className="mapa" ref={mapContainerRef}></div>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="pin-modal-title">{selectedLocation?.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pin-modal-body">
          <p className="pin-modal-description">
            {selectedLocation?.descricao ?? 'Descrição não disponível para este destino.'}
          </p>
          <div className="pin-modal-row">
            <span className="pin-modal-label">Disponibilidade</span>
            <span className="pin-modal-stock">
              {selectedLocation?.passagens ?? 0} passagens
            </span>
          </div>
          <div className="pin-modal-row pin-modal-price-row">
            <span className="pin-modal-label">Preço médio</span>
            <strong className="pin-modal-price">
              {formatCurrency(selectedLocation?.precoPassagem)}
            </strong>
          </div>
        </Modal.Body>
        <Modal.Footer className="pin-modal-footer">
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

export default PinDetails;
