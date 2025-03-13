import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
require('dotenv').config();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGQ4NmEyMzA4ZjUwZDYwMmE0ODI3OTlhODg5ZWZhMSIsIm5iZiI6MTc0MTI5OTE0My43NDcsInN1YiI6IjY3Y2ExZGM3ZGJhMTQ5MTYwNjJiMzczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iNFPwr7VCM76NOA2LZJBQdBpCdrYuLuJKkPNhPotwCg',
  },
};

const TitleCards = () => {
  const [apiData, setApiData] = useState([]);
  const [topGenre, setTopGenre] = useState(null);
  const [genreName, setGenreName] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedRatings = JSON.parse(localStorage.getItem('userRatings')) || {};
    const userRatings = storedUser ? storedRatings[storedUser.email] || [] : [];

    if (userRatings.length === 0) return;

    const fetchGenres = async () => {
      try {
        const genreCount = {};
        const genreNames = {};

        for (const movie of userRatings) {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.movieId}?language=pt-BR`, options);
          const data = await response.json();

          data.genres.forEach((genre) => {
            genreCount[genre.id] = (genreCount[genre.id] || 0) + 1;
            genreNames[genre.id] = genre.name;
          });
        }

        const mostCommonGenre = Object.keys(genreCount).reduce((a, b) =>
          genreCount[a] > genreCount[b] ? a : b
        );

        setTopGenre(mostCommonGenre);
        setGenreName(genreNames[mostCommonGenre]);
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (!topGenre) return;

    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=${topGenre}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error('Erro ao buscar filmes recomendados:', err));
  }, [topGenre]);

  return (
    <div className="title-cards">
      {genreName && <h2>Porque você gosta de  {genreName}</h2>}
      <div className="card-list">
        {apiData.map((card, index) => (
          <Link
            to={`/sinopse/${card.id}`}
            className="card"
            key={index}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.title} />
            <div className="card-title">
              <p>{card.title.length > 40 ? card.title.slice(0, 37) + '...' : card.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
