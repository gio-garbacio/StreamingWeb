import React, { useEffect, useState } from 'react'
import './TitleCards.css'
import {Link} from 'react-router-dom'

const TitleCards = () => {

  const [apiData, setApiData] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGQ4NmEyMzA4ZjUwZDYwMmE0ODI3OTlhODg5ZWZhMSIsIm5iZiI6MTc0MTI5OTE0My43NDcsInN1YiI6IjY3Y2ExZGM3ZGJhMTQ5MTYwNjJiMzczNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iNFPwr7VCM76NOA2LZJBQdBpCdrYuLuJKkPNhPotwCg'
    }
  };

  useEffect(()=>{
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
  }, [])

  return (
    <div className='title-cards'>
      <div className="card-list">
        {apiData.map((card, index)=>{
            return <Link to={`/sinopse/${card.id}`} className="card" key={index} style={{ textDecoration: 'none', color: 'inherit'}}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p className="card-title">
              {card.title.length > 40 ? card.title.slice(0, 37) + "..." : card.title}
            </p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
