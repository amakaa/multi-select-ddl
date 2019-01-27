import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropDownItem from '../drop-down-item/DropDownItem.jsx';
import SelectedItem from '../selected-item/SelectedItem.jsx';

import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

import {
  getSelectedDepartments,
  removeDepartment,
  addDepartment,
  setExpandedState,
  getExpandedState
} from '../../redux/modules/departments.js';

import './DropDownList.css';

import { DEPARTMENTS } from '../../constants/departments.js';

const DropDownSelect = ({ selectedDepartments, expanded, toggleExpandedState }) => (
  <div className="select-container" onClick={toggleExpandedState} role="menu">
    {selectedDepartments.length ? selectedDepartments.map(department =>
      <SelectedItem department={department} key={department} />
    ) : <div className="default-value">Select your departments</div>}
    <span className="toggle-button">
      {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
    </span>
  </div>
);

class DropDownList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDepartments: [],
      cursor: null,
    };
  }

  toggleExpandedState = () => {
    const { expanded, dispatch } = this.props;
    dispatch(setExpandedState(!expanded));
  };

  handleChange = event => {
    const { target: { checked, value } } = event;

    this.toggleDepartment(value, checked);
  };

  toggleDepartment = (value, isChecked) => {
    const { dispatch } = this.props;
    if (isChecked) {
      dispatch(addDepartment(value));
    } else {
      dispatch(removeDepartment(value));
    }
  }

  handleSelection = (cursor) => {
    const { selectedDepartments } = this.props;

    DEPARTMENTS.forEach((value, i) => {
      if (i === cursor) {
        const isSelected = selectedDepartments.find(d => d === value);

        this.toggleDepartment(value, !isSelected);
      }
    })
  }

  handleDownKey = (cursor) => {
    if (cursor !== null && cursor < DEPARTMENTS.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }));
    } else {
      this.setState({
        cursor: 0
      });
    }
  }

  handleUpKey = (cursor) => {
    if (cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }));
    } else {
      this.setState({
        cursor: DEPARTMENTS.length - 1
      });
    }
  }

  handleKeyDown = event => {
    event.preventDefault();
    const { cursor } = this.state;

    if (event.keyCode === 32) {
      this.handleSelection(cursor);
    }

    if (event.keyCode === 38) {
      this.handleUpKey(cursor);
    }
    
    if (event.keyCode === 40) {
      this.handleDownKey(cursor);
    }
  }

  render() {
    const { cursor } = this.state;
    const { selectedDepartments = [], expanded } = this.props;

    return (
      <div className="container" onKeyDown={this.handleKeyDown} tabIndex="0">
        <DropDownSelect 
          toggleExpandedState={this.toggleExpandedState}
          {...this.props}
        />
  
        {expanded && DEPARTMENTS.map((department, i) =>
          <DropDownItem
            department={department}
            key={department}
            className={cursor === i ? 'active' : null}
            selectedDepartments={selectedDepartments}
            handleChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

DropDownList = connect(globalState => ({
  selectedDepartments: getSelectedDepartments(globalState),
  expanded: getExpandedState(globalState),
}))(DropDownList);
export default DropDownList;
