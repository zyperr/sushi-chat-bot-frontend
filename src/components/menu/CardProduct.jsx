import React from 'react'
// const a = {picture,name,price,pieces,category}
import "../../style/components/menu/CardProduct.css"
const CardProduct = () => {
  return (
    <article className='card'>
        <picture className='card__picture'>
            <img src='https://cf.sushishop.eu/img2/14018/614/614/cover/center/webp/auto/14018.webp' alt='sushi'/>
        </picture>
        <div className='card__name-container'>
            <p className='card__name-product'>Florence Blanchard Box</p>
        </div>
        <footer className='card__detail'>
            <p className='card__detail-price'>$100</p>
            <p className='card__detail-pieces'>42 piezas</p>
        </footer>
    </article>
  )
}

export default CardProduct