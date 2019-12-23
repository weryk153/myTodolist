import React, { Component } from 'react'
import Icon from './Icon'

class Todo extends Component {
  constructor(props) {
    super(props)
  }

  todoDelete = () => {
    const { handleTodoDelete, todo } = this.props
    handleTodoDelete(todo.id)
  }

  todoMark = () => {
    const { handleTodoMark, todo } = this.props
    handleTodoMark(todo.id)
  }
  
  todoEdit = (e) => {
    const { handleTodoEdit, todo } = this.props
    const content = e.target.value
    handleTodoEdit(todo.id, content)
  }

  render() {
    const { todo } = this.props
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <input type="checkbox" aria-label="Checkbox for following text input" onChange={this.todoMark} defaultChecked={todo.isCompleted} />
          </div>
        </div>
        <input type="text" className={`form-control ${(todo.isCompleted === true) ? 'isCompleted' : ''}`} aria-label="Text input with checkbox" onChange={this.todoEdit} value={todo.content}/>
        <div className="input-group-append">
          <button className="btn btn-outline-danger" type="button" onClick={this.todoDelete} value={todo.id}><Icon></Icon></button>
        </div>
      </div>
    )
  }
}

export default Todo