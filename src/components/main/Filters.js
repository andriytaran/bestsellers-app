import React, {Component} from 'react';
import {
  STORES,
  BESTSELLERS_DEPARTMENT
} from '../../utils/domain';
import {Row, Col} from 'reactstrap';
import Select from 'react-select';

class Filters extends Component {

  constructor (props) {
    super(props);
    this.state = {
      defaultDepartment: props.filter.department[0]
    }
    this.handleDefaultChange = this.handleDefaultChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
  }

  handleDepartmentChange (value) {
    const {onChange } = this.props;
    const {defaultDepartment} = this.state;
    if (value.length === 0) {
      onChange({name: 'department', value: [defaultDepartment]})
    } else {
      onChange({name: 'department', value});
    }
  }

  handleDefaultChange (e) {
    const {name, value} = e.target;
    const {onChange} = this.props;
    onChange({name, value});
  }

  render () {
    const { departments, filter} = this.props;
    const {defaultDepartment} = this.state;
    const departmentOptions = departments.map(d => ({value: d, label: d === '' ? BESTSELLERS_DEPARTMENT : d, key: d}));
    departmentOptions.unshift(defaultDepartment);

    return (
      <div className="toolbar">
        <Row>
          <Col md={2} xs={2}>
            <div className="form-group">
              <label>Store</label>
              <select className="form-control" onChange={this.handleDefaultChange} name="shop" value={filter.shop}>
                {Object.entries(STORES).map(([value, display]) => (
                  <option value={value} key={value}>{display}</option>
                ))}
              </select>
            </div>
          </Col>
          <Col md={6} xs={6}>
            <div className="form-group">
              <label>Department</label>
              <Select
                defaultValue={defaultDepartment}
                isMulti
                value={filter.department}
                name="department"
                options={departmentOptions}
                className="react-select"
                onChange={this.handleDepartmentChange}
              />
            </div>
          </Col>
          <div className="main-search">
            <div className="form-inline">
              <label className="text-left">Search  </label>
              <input className="form-control" value={filter.query} name="query" placeholder="Type product title" onChange={this.handleDefaultChange}/>
            </div>
          </div>
        </Row>
      </div>
    )
  }
}
export default Filters;
