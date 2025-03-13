import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/nome-scorpiao-t.png';
import profile_icon from '../../assets/profile.png';

const Navbar = () => {
    const navRef = useRef();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 80) {
                navRef.current.classList.add('nav-dark');
            } else {
                navRef.current.classList.remove('nav-dark');
            }
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/login');
    };

    const fetchRandomMovie = async () => {
        try {
            const randomPage = Math.floor(Math.random() * 10) + 1; 
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/popular?page=${randomPage}`, 
                {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGQ4NmEyMzA4ZjUwZDYwMmE0ODI3OTlhODg5ZWZhMSIsIm5iZiI6MTc0MTI5OTE0My43NDcsInN1YiI6IjY3Y2ExZGM3ZGJhMTQ5MTYwNjJiMzczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iNFPwr7VCM76NOA2LZJBQdBpCdrYuLuJKkPNhPotwCg'
                    }
                }
            );
            const data = await response.json();

            if (data.results.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const randomMovieId = data.results[randomIndex].id;
                navigate(`/sinopse/${randomMovieId}`);
            }
        } catch (error) {
            console.error("Erro ao buscar filme aleatório:", error);
        }
    };

    return (
        <div ref={navRef} className='navbar'>
            <div className='navbar-left'>
                <img src={logo} alt="" />
                <ul>
                    <li onClick={() => navigate("/")}>Início</li>
                    <li onClick={() => navigate("/historico")}>Histórico</li>
                    <li onClick={fetchRandomMovie} style={{ cursor: "pointer" }}>Filme Aleatório</li>
                </ul>
            </div>
            <div className='navbar-right'>
                <p>{user ? user.name : "Nome do Usuário"}</p>
                <div className='navbar-profile'>
                    <img src={profile_icon} alt="" className='profile'/>
                    <div className="dropdown">
                        <p onClick={handleLogout}>Sair da conta</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
