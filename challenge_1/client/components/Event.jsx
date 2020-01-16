import React from 'react';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <ul>
                    <li>Date: {this.props.data.date}</li>
                    <li>Description: {this.props.data.description}</li>
                </ul>
            </div>
        );
    }
}

export default Event;