import React from 'react';
import Button from './button';
import CheckBox from './check_box';

class TodoItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: props.todo.title
        }
    }

    render() {
        return (
        <div className={this.getTodoItemClasses()}>
            <div className="col" key={this.props.todo.id}>
                <div className="to-do">
                    <CheckBox className="" toggleComplete={this.props.toggleComplete.bind(this, this.props.todo.id)} />
                    <input type="text" className="to-do-input" id={this.props.todo.id} style={this.getStyle()}
                    value={this.state.value} 
                    onChange={(e) => this.props.editTodo(e.target.value, this.props.todo.id)} />
                </div>
            </div>
            <div className="row" style={{marginRight: "1rem"}}>
                <Button text="Delete" className="col" onClick={() => this.props.deleteTodo(this.props.todo.id) } />
            </div>
        </div>
        );
    }

    getTodoItemClasses = () => {
        let classes = "todo-item row ";
        classes += (this.props.todo.completed === 1) ? "change-bg" : "";
        return classes;
    }

    getStyle = () => {
        if(this.props.todo.completed) {
            return {
                backgroundColor: '#9acd32'
            }
        }
    }
}

export default TodoItem;