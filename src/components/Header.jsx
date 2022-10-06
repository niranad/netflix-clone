import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/Logo';

export default function Header({ login }) {
  const navigate = useNavigate();

  return (
    <Container className='flex a-center j-between'>
      <div className='logo'>
        <Logo />
      </div>
      <button onClick={() => navigate(login ? '/login' : '/signup')}>
        {login ? 'Log In' : 'Sign Up'}
      </button>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 4rem;
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;
