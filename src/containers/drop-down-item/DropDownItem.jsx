import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './DropDownItem.css';

const findDepartmentInSelected = (selectedDepartments, department) =>
  selectedDepartments.find(d => d === department)

class DropDownItem extends Component {
  constructor(props) {
    super(props);

    const { department, selectedDepartments } = props;

    this.state = {
      isChecked: findDepartmentInSelected(selectedDepartments, department),
      selectedDepartments,
    }
  }

  static getDerivedStateFromProps({ selectedDepartments, department }, prevState) {
    if (prevState.selectedDepartments !== selectedDepartments) {
      return {
        isChecked: findDepartmentInSelected(selectedDepartments, department),
        selectedDepartments,
      }
    }
    return null;
  }

  render() {
    const { department, handleChange, className } = this.props;

    const { isChecked } = this.state;

    return (
      <div className={classNames("item-container",`${isChecked ? "selected" : ""}`, className)}>
        <input
          type="checkbox"
          id={department}
          name={department}
          value={department}
          checked={!!isChecked}
          onChange={handleChange}
          className="item-checkbox"
        />
        <label htmlFor={department}>{department}</label>
      </div>
    );
  }
}

DropDownItem = connect()(DropDownItem);

export default DropDownItem;
