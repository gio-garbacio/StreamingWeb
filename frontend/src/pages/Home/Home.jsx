import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCardsAvaliados from '../../components/TitleCards/TitleCards-Avaliados'
import TitleCardsPopulares from '../../components/TitleCards/titleCards-Populares'
import TitleCardsTrend from '../../components/TitleCards/TitleCards-Trending'
import TitleCardsUltimo from '../../components/TitleCards/TitleCards-Ultimo'
import Footer from '../../components/Footer/Footer'
import TitleCadsKeyW from '../../components/TitleCards/TitleCards-KeyWords'


const Home = () => {

  
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
      <img src={hero_banner} alt="" className='banner-img'/>
      <div className="hero-caption">
        <img src={hero_title} alt="" className='caption-img'/>
        <p>Dois agentes altamente treinados se aproximam à distância após serem enviados para proteger lados opostos de um desfiladeiro misterioso. Quando um mal emerge, eles precisam trabalhar juntos para sobreviver ao que está lá dentro.</p>
        <div className="hero-btns">
          <button className='btn'><img src={play_icon} alt="" />Assitir</button>
          <button className='btn dark-btn'><img src={info_icon} alt="" />Mais informações</button>
        </div>
        <h2>Títulos Populares</h2>
        <TitleCardsPopulares/>
        <h2>Melhores Avaliados</h2>
        <TitleCardsAvaliados/>
        <h2>Filmes Tendências</h2>
        <TitleCardsTrend/>
        <h2>Com base no filme que você mais gostou</h2>
        <TitleCardsUltimo/>
        <TitleCadsKeyW/>

      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
