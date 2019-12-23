import React, { Component } from 'react'
import Todo from './Todo'
import './style.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      content: '',
      isCompleted: false
    }
    this.id = 1;
  }
  componentDidUpdate(preProps, preState) {
    if (preState.todos !== this.state.todos) {
      window.localStorage.setItem('todoapp', JSON.stringify(this.state.todos))
    }
  }

  componentDidMount() {
    const todoData = window.localStorage.getItem('todoapp')
    const oldTodos = JSON.parse(todoData)
    if (oldTodos != false) {
      this.setState({
        todos: oldTodos,
      })
      this.id = oldTodos[oldTodos.length - 1].id + 1
    }
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') this.handleTodoAdd()
  }

  handleTodoAdd = (e) => {
    const { todos, content, isCompleted } = this.state
    if (content === '') return false
    this.setState({
      todos: [
        ...todos,{
          id: this.id,
          content,
          isCompleted
        }
      ],
      content: ''
    })
    this.id += 1
  }

  handleTodoDelete = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  handleTodoMark = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      })
    })
  }

  handleTodoEdit = (id, content) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          ...todo,
          content: content
        }
      })
    })
  }

  render() {
    const { todos, content } = this.state
    return (
      <div className="container">
        <div className="list-header">
          <div className="input-group mb-3">
            <input type="text" className="form-control todoContent" name="content" value={content} onChange={this.handleChange} onKeyPress={this.handleKeyPress} placeholder="do something......" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" onClick={this.handleTodoAdd} type="button">Do it!</button>
            </div>
          </div>
        </div>
        <div className="list-group">
          {todos.map(todo => (
            <Todo key={todo.id} todo={todo} handleTodoDelete={this.handleTodoDelete}
             handleTodoMark={this.handleTodoMark} handleTodoEdit={this.handleTodoEdit} />))}
        </div>
      </div> 
    )
  }
}

export default App