import React, {Component} from 'react';
import Slider from 'react-slick';
import ProductCard from './ProductCard';
import {
  BESTSELLERS_DEPARTMENT,
} from '../../utils/domain';

const sliderSettings = ( slidesToShow = 4, slidesToScroll = 4 ) => ({
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow,
  slidesToScroll,
  responsive: [{
    breakpoint: 768,
    slidesToScroll: 1,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    }
  }, {
    breakpoint: 900,
    slidesToScroll: 2,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
    }
  }]
});

class Products extends Component {
  render () {
    const {category, isMobile, categoryImage} = this.props;
    const productsCount = category.data.length;
    const tiles = category.data.map((product, i) => <ProductCard key={i} product={product}/>);
    let content;

    if ( isMobile ) {
      tiles.unshift(
        <div key="ismobile" className="department-area">
          <img src={categoryImage} alt={category.department.display}/>
          <h2>
            {category.department.display}
          </h2>
        </div>
      )
    }

    if (productsCount >= 4) {
      if (category.department.value !== BESTSELLERS_DEPARTMENT) {
        content = <div className="product-area">
         <Slider {...sliderSettings()} key={category.department.value}>
            { tiles }
          </Slider>
        </div>
      } else {
        content = <div className="product-grid">{tiles}</div>
      }
    } else {
      content = <div className="product-area less" style={{width: `calc(100% / 4 * ${productsCount})`, borderRight: '1px solid #d3d7de'}}>
        <Slider {...sliderSettings(productsCount, productsCount)}>
          { tiles }
        </Slider>
      </div>
    }

    return (
      <div className="product-line">
        {content}
      </div>
    )
  }
}
export default Products;
