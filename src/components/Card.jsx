import React from 'react';
import styled from 'styled-components';

export default function Card({ movie, index }) {
  return (
    <Container>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.image}`} alt='Movie' />
    </Container>
  );
}

const Container = styled.div``;
