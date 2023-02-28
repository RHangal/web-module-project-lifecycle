import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayCompleted: true,
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
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data)})
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
  toggleCompleted = (id) => () => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        else return res.data.data
        })
      })
    })
    .catch(this.setAxiosResponseError)
  }
  clearCompleted = () => {
    this.setState({ ...this.state, 
      displayCompleted: !this.state.displayCompleted,
  })
  }
  componentDidMount() {
    //fetch all todos from server
    this.fetchAllTodos()
  }
  render() {
    const todoVar =  this.state.todos.map(todo => {
      return <div onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name} {todo.completed? '- Yes' : '- No'}</div>
    }) 
    return (
      <div>
        <div id="error">{this.state.error}</div>
        <div id="todos">
          <h2>Todos:</h2>
          { 
           this.state.displayCompleted? todoVar : todoVar.filter(todo => {
            console.log(todo);
            return todo.props.children["2"]== '- No'
           })
          }
        </div>
        <form id="todoForm" onSubmit={this.onSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onTodoNameInputChange} type="text" placeholder='Type todo'/>
          <button>Submit</button>
        </form>
          <button onClick={this.clearCompleted}>{this.state.displayCompleted ? 'Hide ' : 'Show '}Completed</button>
      </div>
    )
  }
}
