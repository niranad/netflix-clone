import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getGenres, getMovies } from '../store';

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genresLoaded = useSelector(({ netflix }) => netflix.genresLoaded);
  const movies = useSelector(({ netflix }) => netflix.movies);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(getMovies({ type: 'all' }));
    }
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset > 0);
    };

    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <div>Movies</div>
  )
}
