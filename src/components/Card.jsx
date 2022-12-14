import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri';
import { BsCheck, BsChevronDown } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';

export default memo(function Card({ movie, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.image}`}
        alt='Movie Banner'
      />
      {isHovered && (
        <div className='hover'>
          <div className='image-video-container'>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.image}`}
              alt='Movie Banner'
              onClick={() => navigate('/player')}
            />
            <video
              src={''}
              autoplay
              loop
              muted
              onClick={() => navigate('/player')}
            />
          </div>
          <div className='info-container flex column'>
            <h3 className='name' onClick={() => navigate('/player')}>
              {movie.name}
            </h3>
            <div class='icons flex j-between'>
              <div class='controls flex'>
                <IoPlayCircleSharp
                  title='Play'
                  onClick={() => navigate('/player')}
                />
                <RiThumbUpFill title='Like' />
                <RiThumbDownFill title='Dislike' />
                {isLiked ? (
                  <BsCheck title='Remove From List' />
                ) : (
                  <AiOutlinePlus title='Add To List' />
                )}
              </div>
              <div className='info'>
                <BiChevronDown title='More Info' />
              </div>
            </div>

            <div className='genres flex'>
              <ul className='flex'>
                {movie.genres.map((genre, i) => (
                  <li key={genre + i}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
})

const Container = styled.div`
  max-width: 230px;
  height: 100%;
  width: 230px;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 90;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0 3px 10px
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      height: 140px
      position: relative;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
        width: 100%;
        height: 140px;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
      .icons {
        .controls {
          display: flex;
          gap: 1rem;
        }
        svg {
          cursor: pointer;
          transition: 0.3s ease-in-out;
          font-size: 2rem;
          &:hover {
            color: #b8b8b8;
          }
        }
      }
      .genres {
        ul {
          gap: 1rem;
          li {
            padding-right: 0.7rem;
            &:first-of-type {
              list-style-type: none;
            }
          }
        }
      }
    }
  }
`;
