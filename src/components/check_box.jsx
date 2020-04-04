import React, { Component } from 'react';

class CheckBox extends Component {

    render() {
        return <input type="checkbox" id="check" onChange={this.props.toggleComplete} className={'check-box'} />;
    }
}

export default CheckBox;
