import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div className="personal">
      <span>{product.rank}</span>
      <div className="product-image">
        <a href={product.link} target="_blank" rel="noopener noreferrer">
          <img src={product.image} alt={product.title} />
        </a>
      </div>
      <div className="product-title">
        <a href={product.link} rel="noopener noreferrer" target="_blank" style={{WebkitBoxOrient: 'vertical'}}>
          {product.title}
        </a>
      </div>
    </div>
  )
}
export default ProductCard;
