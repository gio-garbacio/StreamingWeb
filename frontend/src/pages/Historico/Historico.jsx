import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Historico.css';
import Navbar from '../../components/Navbar/Navbar';

const HistoricoBasico = () => {
    const [historico, setHistorico] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [filmesDetalhados, setFilmesDetalhados] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGQ4NmEyMzA4ZjUwZDYwMmE0ODI3OTlhODg5ZWZhMSIsIm5iZiI6MTc0MTI5OTE0My43NDcsInN1YiI6IjY3Y2ExZGM3ZGJhMTQ5MTYwNjJiMzczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iNFPwr7VCM76NOA2LZJBQdBpCdrYuLuJKkPNhPotwCg'
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserEmail(user.email);
            
            let storedRatings = localStorage.getItem("userRatings");
            
            if (!storedRatings) {
                storedRatings = JSON.stringify({});
                localStorage.setItem("userRatings", storedRatings);
            }
            
            const ratingsGeral = JSON.parse(storedRatings);
            const filmesUsuario = ratingsGeral[user.email] || [];
            setHistorico(filmesUsuario);
        }
    }, []);

    useEffect(() => {
        if (historico.length > 0) {
            const fetchFilmes = async () => {
                const detalhes = await Promise.all(
                    historico.map(async (filme) => {
                        const response = await fetch(`https://api.themoviedb.org/3/movie/${filme.movieId}?language=pt-BR`, options);
                        return response.json();
                    })
                );
                setFilmesDetalhados(detalhes);
            };
            fetchFilmes();
        }
    }, [historico]);

    return (
        <div >
            <Navbar/>
            <div className="historico-container"> 
                <h1>Histórico de Filmes</h1>
                {filmesDetalhados.length > 0 ? (
                    <div className="card-list">
                        {filmesDetalhados.map((filme, index) => (
                            <Link 
                                to={`/sinopse/${filme.id}`} 
                                className="card" 
                                key={index} 
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <img src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`} alt={filme.title} />
                                <div className="card-title">
                                    <p>{filme.title.length > 40 ? filme.title.slice(0, 37) + "..." : filme.title}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>Não há histórico disponível.</p>
                )}
            </div>
        </div>
    );
};

export default HistoricoBasico;
