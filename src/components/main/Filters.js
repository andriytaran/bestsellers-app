import React, {Component} from 'react';
import {
  STORES,
  BESTSELLERS_DEPARTMENT
} from '../../utils/domain';
import {Row, Col} from 'reactstrap';
import Select from 'react-select';
import { DateRangePicker } from 'react-dates';

class Filters extends Component {

  constructor (props) {
    super(props);
    this.state = {
      defaultDepartment: props.filter.department[0],
      focusedDate: null,
      startDate: props.filter.startDate,
      endDate: props.filter.endDate
    }
  }

  handleDepartmentChange = (value) => {
    const {onChange } = this.props;
    const {defaultDepartment} = this.state;
    if (value.length === 0) {
      onChange({name: 'department', value: [defaultDepartment]})
    } else {
      onChange({name: 'department', value});
    }
  }

  handleDatesChange = (value) => {
    const {onChange} = this.props;
    const {startDate, endDate} = value;
    if ((startDate !== this.state.startDate) || (endDate !== this.state.endDate)) {
      this.setState({startDate, endDate}, () => {
        onChange({startDate: startDate, endDate: endDate});
      })
    }
  }

  handleDefaultChange = (e) => {
    const {name, value} = e.target;
    const {onChange} = this.props;
    onChange({name, value});
  }

  render () {
    const { departments, filter, isMobile} = this.props;
    const {defaultDepartment, focusedDate, startDate, endDate} = this.state;
    const departmentOptions = departments.map(d => ({value: d, label: d === '' ? BESTSELLERS_DEPARTMENT : d, key: d}));
    departmentOptions.unshift(defaultDepartment);

    return (
      <div className="toolbar">
        <Row>
          <Col lg={2}>
            <div className="form-group">
              <label>Store</label>
              <select className="form-control" onChange={this.handleDefaultChange} name="store" value={filter.store}>
                {Object.entries(STORES).map(([value, display]) => (
                  <option value={value} key={value}>{display}</option>
                ))}
              </select>
            </div>
          </Col>
          <Col lg={5}>
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
          <Col lg={5}>
            <div className="form-group">
              <label>Calendar</label>
              <DateRangePicker
                startDate={startDate}
                startDateId="filterStartDate"
                endDate={endDate}
                orientation={isMobile ? "vertical" : "horizontal"}
                endDateId="filterEndDate"
                isOutsideRange={() => false}
                focusedInput={focusedDate}
                onFocusChange={focusedDate => this.setState({ focusedDate })}
                onDatesChange={this.handleDatesChange}
                />
            </div>
          </Col>
          <div className="main-search">
            <div className="form-inline">
              <label className="text-left main-search_label">Search</label>
              <input className="form-control main-search_input" value={filter.query} name="query" placeholder="Type product title" onChange={this.handleDefaultChange}/>
            </div>
          </div>
        </Row>
      </div>
    )
  }
}
export default Filters;
