import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';

export class User extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    reposProp: PropTypes.array.isRequired,
  };

  componentDidMount() {
    // match.params.login corresponds to URI of this page
    // defined with '/user/:login' in Route in App.js
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      login,
      html_url,
      hireable,
    } = this.props.user;

    // decomposition must be referencing to one higher level
    // of the structure - in this case, to 'props' - that contains
    // target property - in this case 'loading'
    const { loading, reposProp } = this.props;

    if (loading) {
      return <Spinner />;
    } else {
      return (
        <div className='container'>
          <br></br>
          <Fragment>
            <Link to='/' className='btn btn-light btn-block'>
              {' '}
              Back to Search
            </Link>
            <br></br>
            Hireable:
            {hireable ? (
              <i className='fas fa-check text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-danger'></i>
            )}
            <div className='card grid-2'>
              <div className='all-center'>
                <img
                  src={avatar_url}
                  alt='avatar'
                  className='round-img'
                  style={{ widht: '150px' }}
                />
                <h1>{name}</h1>
                <h2>{login}</h2>
                Location: {location}
              </div>
              <div>
                {bio && (
                  <Fragment>
                    <h3>Bio:</h3>
                    <p>{bio}</p>
                  </Fragment>
                )}
                <p>
                  <a href={html_url} className='btn btn-dark my-1'>
                    Link to GitHub profile
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h2>Most recent repos: </h2>
              <Fragment>
                <Repos repos={reposProp} loading={loading} />
              </Fragment>
            </div>
            <br></br>
            <br></br>
          </Fragment>
        </div>
      );
    }
  }
}

export default User;
