import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
  }
  onTodoNameInputChange = (evt) => {
    const {value} = evt.target
    this.setState({...this.state, todoNameInput: value})
  }
  setAxiosResponseError = (err) => {
    this.setState({ ...this.state, error: err.response.data.message})
  }
  resetForm = () => {this.setState({...this.state, todoNameInput: ''})}
  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
      .then(res => {
        this.fetchAllTodos();
        this.resetForm();
      })
      .catch(err => {
        this.setAxiosResponseError(err)
      })
  }
  onSubmit = (evt) => {
    evt.preventDefault()
    this.postNewTodo()
  }
  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data})
      })
      .catch(err => {
        this.setAxiosResponseError(err)
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
            this.state.todos.map(todo => {
              return <div key={todo.id}>{todo.name}</div>
            }) 
          }
        </div>
        <form id="todoForm" onSubmit={this.onSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onTodoNameInputChange} type="text" placeholder='Type todo'/>
          <button>Submit</button>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
