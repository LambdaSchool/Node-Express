import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Jumbotron } from 'reactstrap';
import { Route, Link } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      tags: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5555/api/users/').then((result) => {
      this.setState({ users: result.data.users})
    })

    axios.get('http://localhost:5555/api/posts/').then((result) => {
      this.setState({ posts: result.data.post})
    })

    axios.get('http://localhost:5555/api/tags/').then((result) => {
      this.setState({ tags: result.data.tag})
    })
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/users" render={() => (
          this.state.users.map((user, index) => {
            return (
              <Link key={index} to={`/users/${user.id}`}>
                <Jumbotron>
                  <h1 className="display-3">{user.name}</h1>
                </Jumbotron>
              </Link>
            )
          })
        )} />
        <Route path="/users/:id" render={(props) => (
          this.state.posts
            .filter((post) => Number(props.match.params.id) === post.userId)
            .map((post, index) => {
              return (
                <Jumbotron key={index}>
                  <h1 className="display-3">{post.text}</h1>
                </Jumbotron>
              )
            })
        )} />
      </div>
    );
  }
}

export default App;
