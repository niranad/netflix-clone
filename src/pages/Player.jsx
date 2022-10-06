import React from 'react';
import styled from 'styled-components';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Player() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className='player'>
        <div className='back'>
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video src={''} autoPlay loop controls muted></video>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      z-index: 1;
      padding: 2rem;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
