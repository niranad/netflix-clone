import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { firebaseAuth } from '../utils/firebase-config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { FaSearch, FaPowerOff } from 'react-icons/fa';
import Logo from '../assets/Logo';

export default function NavBar({ isScrolled }) {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'TV Shows', path: '/tv' },
    { name: 'Movies', path: '/movies' },
    { name: 'My List', path: '/mylist' },
  ];

  const navigate = useNavigate();

  // onAuthStateChanged(firebaseAuth, (currentUser) => {
  //   if (!currentUser) navigate('/login');
  // });

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  return (
    <Container>
      <nav className={`flex ${isScrolled ? 'scrolled' : ''}`}>
        <div className='left flex a-center'>
          <div className='brand flex a-center j-center'>
            <Logo />
          </div>
          <ul className='links flex'>
            {links.map(({ name, path }) => (
              <li key={name}>
                <Link to={path}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='right flex a-center'>
          <div className={`search ${showSearch ? 'show-search' : ''}`}>
            <button
              title='Search Movies'
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type='text'
              placeholder='Search'
              name='search'
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button title='Sign Out' onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-image: linear-gradient(to bottom, black, rgba(0, 0, 0, 0.9));
    box-shadow: 2px 5px 10px 10px rgba(0, 0, 0, 0.85);
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
      }
    }
    .links {
      list-style-type: none;
      gap: 2rem;
      li {
        a {
          color: white;
          text-decoration: none;
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          svg {
            color: white;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          background-color: transparent;
          transition: 0.3s ease-in-out;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;
