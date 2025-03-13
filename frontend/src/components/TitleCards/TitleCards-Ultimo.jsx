import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TitleCards.css';

const TitleCards = () => {
  const [apiData, setApiData] = useState([]);
  const [topRatedMovieId, setTopRatedMovieId] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGQ4NmEyMzA4ZjUwZDYwMmE0ODI3OTlhODg5ZWZhMSIsIm5iZiI6MTc0MTI5OTE0My43NDcsInN1YiI6IjY3Y2ExZGM3ZGJhMTQ5MTYwNjJiMzczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iNFPwr7VCM76NOA2LZJBQdBpCdrYuLuJKkPNhPotwCg'
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
    const userRatings = storedUser ? storedRatings[storedUser.email] || [] : [];

    if (userRatings.length > 0) {
      const topRatedMovie = userRatings.reduce((prev, current) => (prev.rating > current.rating ? prev : current));
      setTopRatedMovieId(topRatedMovie.movieId);
    }
  }, []);

  useEffect(() => {
    if (topRatedMovieId) {
      fetch(`https://api.themoviedb.org/3/movie/${topRatedMovieId}/similar?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));
    }
  }, [topRatedMovieId]);

  return (
    <div className='title-cards'>
      <div className="card-list">
        {apiData.map((card, index) => (
          <Link to={`/sinopse/${card.id}`} className="card" key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <div className="card-title">
              <p>{card.title.length > 40 ? card.title.slice(0, 37) + "..." : card.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;