import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
  }
  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data})
      })
      .catch(err => {
        this.setState({ ...this.state, error: err.response.data.message})
      })
  }
  componentDidMount() {
    //fetch all todos from server
    this.fetchAllTodos()
  }
  render() {
    return (
      <div>
        <div id="error">{this.state.error}</div>
        <div id="todos">
          <h2>Todos:</h2>
          {
           this.state.error===''? this.state.todos.map(todo => {
              return <div key={todo.id}>{todo.name}</div>
            }) : this.state.error
          }
        </div>
        <form id="todoForm">
          <input type="text" placeholder='Type todo'/>
          <button>Submit</button>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
