import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeDepartment } from '../../redux/modules/departments.js';

import Close from '@material-ui/icons/Close';

import './SelectedItem.css';


class SelectedItem extends Component {

  handleChange = event => {
    event.stopPropagation();
    const { department, dispatch } = this.props;
    dispatch(removeDepartment(department));
  };

  render() {
    const { department } = this.props;

    return (
      <div className="selected-item">
        {department}
        <div className="close-button" onClick={this.handleChange} role="button"><Close /></div>
      </div>
    );
  }
}

SelectedItem = connect()(SelectedItem);

export default SelectedItem;
