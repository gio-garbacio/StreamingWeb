import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import "./Sinopse.css";
import play_icon from '../../assets/play_icon.png'

const Sinopse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [rating, setRating] = useState(0);

  const [user, setUser] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGQ4NmEyMzA4ZjUwZDYwMmE0ODI3OTlhODg5ZWZhMSIsIm5iZiI6MTc0MTI5OTE0My43NDcsInN1YiI6IjY3Y2ExZGM3ZGJhMTQ5MTYwNjJiMzczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iNFPwr7VCM76NOA2LZJBQdBpCdrYuLuJKkPNhPotwCg'
    }
  };  

  useEffect(() => {
    setMovie(null);
    setError(false);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        const storedRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
        const userRatings = storedRatings[parsedUser.email] || [];

        const existingMovie = userRatings.find(movie => movie.movieId === id);
        if (existingMovie) {
            setRating(existingMovie.rating);
        }
    }

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.status_code) {
          setMovie(data);
        } else {
          console.error("Erro ao carregar o filme:", data);
          setError(true);
        }
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
        setError(true);
      });
}, [id]);


  const handleStarClick = (value) => {
    setRating(value);
    console.log(`Filme ${id} avaliado com: ${value}`);

    if (!user) {
        alert("Você precisa estar logado para avaliar filmes!");
        return;
    }
    const storedRatings = JSON.parse(localStorage.getItem("userRatings")) || {};
    const userRatings = storedRatings[user.email] || [];
    const existingMovieIndex = userRatings.findIndex(movie => movie.movieId === id);

    if (existingMovieIndex !== -1) {
        userRatings[existingMovieIndex].rating = value;
    } else {
        userRatings.push({ movieId: id, rating: value });
    }
    storedRatings[user.email] = userRatings;
    localStorage.setItem("userRatings", JSON.stringify(storedRatings));
};



  return (
    <div className="sinopse-container">
      <div className="topbar">
        <img src={back_arrow_icon} alt="Voltar" onClick={() => navigate('/')} className="back-button"/>
        <h1>{movie ? movie.title : "Carregando..."}</h1>
      </div>

      {error ? (
        <p className="error-message">Erro ao carregar a sinopse.</p>
      ) : movie ? (
        <>
          <div className="banner-play">
            <img
              src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : 'URL_DA_IMAGEM_PADRÃO'}
              alt={movie.title}
            />
            <div className="Sinopse">
              <p>{movie.overview}</p>
              <br />
              <p><strong>Gêneros:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
              <p><strong>Data de lançamento:</strong> {new Date(movie.release_date).toLocaleDateString('pt-BR')}</p>
              <p><strong>Média de avaliação:</strong> {movie.vote_average} ⭐ ({movie.vote_count} votos)</p>
            </div>
          </div>

          
        </>
      ) : (
        <p className="loading-message">Carregando sinopse...</p>
      )}
      <div className="rating">
      <p>Avalie este filme:</p>
      <div className="stars">
        {[...Array(10)].map((_, i) => (
          <div key={i + 1} className="star-container">
            <span 
              className={`star ${rating >= i + 1 ? 'selected' : ''}`}
              onClick={() => handleStarClick(i + 1)}
            >
              ★
            </span>
            <span className="star-number">{i + 1}</span>
          </div>
        ))}
      </div>
      <p className="rating-status">
        {rating === 0 ? "Não avaliado" : `Você avaliou com ${rating} estrela(s)`}
      </p>
    </div>

      <div className="Assisitr">
        <button className='Botao' onClick={() => navigate(`/player/${id}`)}><img src={play_icon} alt="" /> Assistir</button>
      </div>
    </div>
  );
};

export default Sinopse;
