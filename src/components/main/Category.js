import React, {Component} from 'react';
import {departmentImage} from '../../utils';
import Products from './Products';
import { BESTSELLERS_DEPARTMENT } from '../../utils/domain';
import {
  Row,
  Col
} from 'reactstrap';

class Category extends Component {
  render () {

    const {category, store, isMobile} = this.props;
    const categoryTitle = category.department === '' ? BESTSELLERS_DEPARTMENT : category.department;
    const image = departmentImage(categoryTitle, store);

    return (
      <Row className="row">
        <Col md={3} xs={3}>
          <div className="department-area">
            <img src={image} alt={category.department}/>
            <h2>{categoryTitle}</h2>
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
