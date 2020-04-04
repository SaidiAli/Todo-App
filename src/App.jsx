import React from 'react';
import './App.css';
import Todos from './components/todos';
import PropTypes from 'prop-types';
import Addtodo from './components/addtodo';
import { Link, BrowserRouter as Router, Route} from 'react-router-dom';
import { Completed } from './components/pages/completed';

class App extends React.Component {

  state = {
    url: 'http://localhost/todo-backend/public/api/todos',
    todos: [],
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    currentValue: {
      title: ''
    }
  }

  componentDidMount() {
    fetch(this.state.url)
    .then(res => res.json()
    .then(data => {
      this.setState({
        todos: data.todos
      })
    }))
  }

  toggleComplete = (id) => {
    fetch(this.state.url + '/' + id, {
      method: 'PUT'
    })
    .then(() => {
      fetch(this.state.url)
        .then(res => res.json()
          .then(data => {
            this.setState({
              todos: data.todos
            })
          }))
    })
  }

  deleteTodo = (id) => {
    fetch(this.state.url + '/' + id, {
      method: 'DELETE'
    })
    .then(() => {
      this.setState({
        // use the spread operator to return all array elements and filter to remove the
        // element with the id of the deleted item .

        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      });
    })
  }

  editTodo = (title, id) => {
    this.setState({
      currentValue: { title }
    })
    fetch(this.state.url + '/' + id, {
      method: 'PUT',
      headers: this.state.headers,
      body: JSON.stringify({title: this.state.currentValue.title})
    })
      .then(() => {
        fetch(this.state.url)
          .then(res => res.json()
            .then(data => {
              this.setState({
                todos: data.todos
              })
            }))
      })
  }

  addTodo = (title) => {
    let newTodo = {
      title: title,
    }

    if(title !== '') {
      fetch(this.state.url, {
        method: 'POST',
        headers: this.state.headers,
        body: JSON.stringify(newTodo)
      })
      .then(() => {
        fetch(this.state.url)
          .then(res => res.json()
            .then(data => {
              this.setState({
                todos: data.todos
              })
            }))
      })
    }
    
  }

  render() {

    return (
      <Router>
        <div className="main">
          <div className="header">
            <h1> My Todos </h1>
            <Link to="/" className="link">InComplete</Link> |{" "}
            <Link to="/completed" className="link">Completed</Link>
          </div>
          <Route exact path="/" render={() => (
            <React.Fragment>
              <Addtodo addTodo={this.addTodo} editTodo={this.editTodo} />
              <Todos
                todos={this.state.todos}
                toggleComplete={this.toggleComplete}
                deleteTodo={this.deleteTodo}
                editTodo={this.editTodo}
              />
            </React.Fragment>
          )}/>
          <Route path="/completed" render={() => (
            <div>
              <h3 className="text-center">Completed Todos</h3>
              <Completed todos={this.state.todos} toggleComplete={this.toggleComplete} />
            </div>
          )} />
        </div>
      </Router>
    );
  }
}

App.prototypes = {
  todos: PropTypes.array.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired
}

export default App;
