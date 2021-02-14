import React, { Component } from 'react';

import s from './Filter.module.css';

class Filter extends Component {
  state = {
    filter: '',
  };

  handleFilter = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.onFilter(value);
  };

  render() {
    const { filter } = this.state;
    return (
      <>
        <label className={s.lable}>
          Find contact by name
          <input
            className={s.input}
            type="text"
            name="filter"
            value={filter}
            onChange={this.handleFilter}
          ></input>
        </label>
      </>
    );
  }
}

export default Filter;
