import React, { Component } from 'react';
import PropTypes from 'prop-types';

// rce <- Emmet shortcut to generate react component
// Form is controlled component so it needs onChange() handler that is invoked
// when user types something into the input field. Given that input is attached to state
// property, we need to update state property when user types in something and we do that
// using onChange() method.
export class Search extends Component {
  state = {
    text: '',
  };

  static propTypes = {
    searchGithubUsers: PropTypes.func.isRequired,
    clearGithubUsers: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired,
  };

  /* If not using arrow function, we have to bind the onSubmit() function with the 
     instance that is invoking it. If we don't, then onSubmit() referencing to this will
     not be resolved (onSubmit() will report error of 'this' being undefined). So, for 
     that, we would need to use invocation like this: 
          <form onSubmit={this.onSubmit.bind(this)} className='form'>
     However, we prefer to use arrow function... see below

  onSubmit(e) {
    e.preventDefault(); 
    console.log(this.state.text);
  }
  */

  onSubmit = e => {
    e.preventDefault();
    if (this.state.text.toLowerCase() === 'bnesic12') {
      this.props.setAlert('Thank you for your interest!', 'primary');
    } else {
      this.props.clearAlert();
    }

    this.props.searchGithubUsers(this.state.text);

    // reset the state
    this.setState({ text: '' });
    //}
  };

  // e is event that is passed to onChange() method
  onChange = e => {
    // Must use setState method inside class components
    //
    // The following sets the changes in a hardcoded manner to 'text' property of state
    //this.setState({ text: e.target.value });
    // The following is better because it sets the changes in a dynamic manner to
    // a property of state that is the same as name of the field being updated
    // in the UI (in this case, 'text'). That way, multiple user-editable fields can be
    // handled with the same event handler
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search users...'
            required='required'
            pattern='[A-Za-z0-9]{1,20}'
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {this.props.showClearButton && (
          <button
            className='btn btn-light btn-block'
            onClick={this.props.clearGithubUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
