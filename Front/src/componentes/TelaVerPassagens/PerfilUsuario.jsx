import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Image, Nav, Navbar, Row } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';
import NavCustom from '../Layout/NavCustom';
import FooterCustom from '../Layout/FooterCustom';

// Placeholder image URL
const placeholderImg = 'https://via.placeholder.com/150';

const PerfilUsuario = () => {

  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/usuario', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userData = response.data;
        setUserData(prevUserData => ({ ...prevUserData, nome: userData.username }));
        console.log(userData);
        
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);
  const [usuario, setUsuario] = useState({ nome: 'Nome do Usuário', passagens: [] });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return formattedDate;
  };

  const handleExcluirPassagem = async (passagemId) => {
    try {
      const token = sessionStorage.getItem('token'); // Assumindo que o token está no sessionStorage
      await axios.delete(`http://localhost:3000/api/passagens/${passagemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Atualiza localmente as passagens do usuário após a exclusão
      const updatedPassagens = usuario.passagens.filter(passagem => passagem.id !== passagemId);
      setUsuario(prevUsuario => ({ ...prevUsuario, passagens: updatedPassagens }));
    } catch (error) {
      console.error('Erro ao excluir passagem:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Assumindo que o token está no sessionStorage
        const response = await axios.get('http://localhost:3000/api/passagens', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const tickets = response.data;
        setUsuario(prevUsuario => ({ ...prevUsuario, passagens: tickets }));
      } catch (error) {
        console.error('Erro ao buscar passagens do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <NavCustom />
      <div className="container mt-4 pb-5">
        <Row>
          <Col xs={12} md={4} className="mb-4 d-flex justify-content-center align-items-center ">
            <div className="bg-white p-3 rounded shadow text-center h-100 w-100">
              <h2 className="h5 mb-4"></h2>
              <Image
                src={usuario.nome ? `https://via.placeholder.com/150` : placeholderImg}
                roundedCircle
                fluid
                className="mb-3"
              />
              <h4 className="h6 mb-3">{usuario.nome}</h4>
            </div>
          </Col>
          <Col xs={12} md={8}>
            <div className="bg-white p-3 rounded shadow">
              <h2 className="h5 mb-4">Passagens Compradas</h2>
              <ul className="list-group">
                {usuario.passagens.map(passagem => (
                  <li key={passagem.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">{passagem.location}</h6>
                      <small className="text-muted">{`Comprada em ${formatDate(passagem.date)}`}</small>
                    </div>
                    <Button variant="outline-danger" onClick={() => handleExcluirPassagem(passagem.id)}>Excluir Compra Efetuada</Button>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>

      <FooterCustom/>
    </>
  );
};

export default PerfilUsuario;
