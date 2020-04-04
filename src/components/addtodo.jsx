import React from 'react';

class Addtodo extends React.Component {
    state = {
        title: ''
    }

    handleChangeInput = (e) => {
        this.setState({
        [e.target.name]: e.target.value
    })

}

    onSubmit = (e) => {
        let input = document.getElementById("text-input");
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title: ''});
        input.value = '';
    }

    editTodo = () => {
        // this.input.value = this.props.editTodo;
    }

    render() {
        return (
            <div >
            <form className = "row no-margin" onSubmit={this.onSubmit}>
                <input type = "text"
                name="title"
                placeholder = "Add new Todo..."
                className = "form-control col-9"
                onChange={this.handleChangeInput}
                id="text-input"/>
                
                <input type = "submit"
                value = "Add"
                className = "btn col-3 btn-primary"/>
            </form>
            </div>
        );
    }
}

export default Addtodo;