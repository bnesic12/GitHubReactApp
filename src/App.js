import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import UserItem from './components/users/UserItem';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {
  bnUser = {
    id: 58001507,
    login: 'bnesic12',
    avatar_url: 'https://avatars0.githubusercontent.com/u/58001507?v=4',
    html_url: 'https://github.com/bnesic12',
  };

  state = {
    users: [],
    user: {},
    loading: false,
    searchStr: '<nil>',
    alert: null,
    repos: [],
  };

  async componentDidMount() {}

  // note thow the async is declared for arrow function
  searchUsers = async githubUserId => {
    this.setState({ loading: true });

    const github = axios.create({
      baseURL: 'https://api.github.com',
      timeout: 5000,
      headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
    });
    const res = await github.get(`/search/users?q=${githubUserId}`);

    this.setState({
      users: res.data.items, // {data: {..., items: [...]}}
      loading: false,
      searchStr: githubUserId,
      repos: [],
    });
  };

  getUser = async githubUserId => {
    this.setState({ loading: true });

    const github = axios.create({
      baseURL: 'https://api.github.com',
      timeout: 1000,
      headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
    });

    const res = await github.get(`/users/${githubUserId}?`);

    this.setState({
      user: res.data, // {data: {...}}
      loading: false,
    });
  };

  getUserRepos = async githubUserId => {
    this.setState({ loading: true });

    const github = axios.create({
      baseURL: 'https://api.github.com',
      timeout: 1000,
      headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
    });

    const res = await github.get(
      `/users/${githubUserId}/repos?per_page=5&sort=created:asc?`
    );

    this.setState({
      repos: res.data, // {data: [{..repo1..},..,{repoN}]}
      loading: false,
    });
  };

  clearUsers = () => {
    this.setState({
      users: [],
      user: {},
      loading: false,
      searchStr: '<nil>',
      alert: null,
      repos: [],
    });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
  };

  clearAlert = () => {
    this.setState({ alert: null });
  };

  goHome = () => {
    window.location.href =
      'http://ec2-3-135-204-62.us-east-2.compute.amazonaws.com:8080/demo03-0.0.2-SNAPSHOT/bnesic12';
  };

  // the only required method is render()
  render() {
    const { users, user, loading, repos } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />

          <button className='backBtn' onClick={this.goHome}>
            <i className='fa fa-home'></i> bnesic12 Home
          </button>
        </div>
        <div className='container'>
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <div className='container'>
                    <UserItem key={this.bnUser.id} user1={this.bnUser} />
                  </div>
                  <br></br>
                  <label>
                    <h3>Search for other GitHub users: </h3>
                  </label>

                  <Search
                    searchGithubUsers={this.searchUsers}
                    clearGithubUsers={this.clearUsers}
                    showClearButton={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                    clearAlert={this.clearAlert}
                  />
                  {users.length > 0 ? (
                    <label>
                      <br></br>
                      <h3>
                        Search results for: <i>{this.state.searchStr}</i>
                      </h3>
                    </label>
                  ) : (
                    <label></label>
                  )}
                  {this.state.alert !== null ? (
                    <Alert alert={this.state.alert} />
                  ) : (
                    <label></label>
                  )}
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  user={user}
                  loading={loading}
                  getUserRepos={this.getUserRepos}
                  reposProp={repos}
                />
              )}
            />
          </Switch>

          <label className='container'>
            <label>
              bnesic12, 2020, Powered by React <i className='fab fa-react' />
            </label>
          </label>
        </div>
      </Router>
    );
  }
}

export default App;
