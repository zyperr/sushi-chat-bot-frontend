import React from 'react'
import "../../style/components/menu/CardProduct.css"
const CardProduct = ({name,picture,price,pieces}) => {
  return (
    <article className='card' >
        <picture className='card__picture'>
            <img src={picture}/>
        </picture>
        <div className='card__name-container'>
            <p className='card__name-product'>{name}</p>
        </div>
        <footer className='card__detail'>
            <p className='card__detail-price'>${price}</p>
            <p className='card__detail-pieces'>{pieces} piezas</p>
        </footer>
    </article>
  )
}

export default CardProduct