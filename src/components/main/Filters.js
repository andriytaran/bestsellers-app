import React from 'react';
import {
  ALL_DEPARTMENT,
  STORES
} from '../../utils/domain';
import {Row, Col} from 'reactstrap';

const Filters = ({onChange, departments, filter}) => {
  return (
    <div className="toolbar">
      <Row>
        <Col md={2} xs={2}>
          <div className="form-group">
            <label>Store</label>
            <select className="form-control" onChange={onChange} name="shop" value={filter.shop}>
              {Object.entries(STORES).map(([value, display]) => (
                <option value={value} key={value}>{display}</option>
              ))}
            </select>
          </div>
        </Col>
        <Col md={2} xs={2}>
          <div className="form-group">
            <label>Department</label>
            <select className="form-control" onChange={onChange} name="department" value={filter.department}>
              <option value={ALL_DEPARTMENT}>All</option>
              {departments.map((d, i) => <option value={d} key={i}>{d}</option>)}
            </select>
          </div>
        </Col>
        <Col md={2} xs={2}>
          <div className="form-group">
            <label>Seach</label>
            <input className="form-control" value={filter.query} name="query" placeholder="Type product title" onChange={onChange}/>
          </div>
        </Col>
      </Row>




    </div>
  )
}

export default Filters;
