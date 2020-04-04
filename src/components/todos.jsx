import React from 'react';
import TodoItem from './todoItem'
import PropTypes from 'prop-types'

class Todos extends React.Component {
    render(){
        return this.props.todos.map((todo) => (
            <div key = { todo.id} >
            <TodoItem
            todo = { todo }
            toggleComplete = { this.props.toggleComplete }
            deleteTodo = { this.props.deleteTodo }
            editTodo = { this.props.editTodo }
            />
            </div>
        ));
    }
}

Todos.prototypes = {
    todo: PropTypes.object.isRequired,
    toggleComplete: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired
}

export default Todos;