import React, {Component} from 'react';
import {departmentImage} from '../../utils';
import Products from './Products';

import {
  Row,
  Col
} from 'reactstrap';

class Category extends Component {
  render () {

    const {category, shop, isMobile} = this.props;
    const image = departmentImage(category.department, shop);

    return (
      <Row className="row">
        <Col md={3} xs={3}>
          <div className="department-area">
            <img src={image} alt={category.department.display}/>
            <h2>
              {category.department.display}
            </h2>
          </div>
        </Col>
        <Col md={9} xs={9}>
          <Products category={category} isMobile={isMobile} categoryImage={image}/>
        </Col>
      </Row>
    )
  }
}

export default Category;
