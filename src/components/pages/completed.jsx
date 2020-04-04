import React, { Component } from 'react';
import Button from '../button';
// import TodoItem from '../todoItem';

export class Completed extends Component {
    render() {
        let completedArr = this.props.todos.filter(todo => todo.completed === 1).length;
        if (completedArr === 0) {
            return <p className="text-center">All todos are undone.</p>
        }

        return (
            <div>
                {this.props.todos.filter(todo => todo.completed === 1).map(todo => {
                    return <div className="row todo-item" key={todo.id}>
                        <p className="col">{todo.title}</p>
                        <Button text="Undo" className="col" onClick={this.props.toggleComplete.bind(this, todo.id)}/>
                    </div>
                })}
            </div>
        );
    }
}

export default Completed;

