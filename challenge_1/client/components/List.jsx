import React from 'react';
import Event from './Event.jsx'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                {this.props.data.map((event, key) =>
                <Event key={key} index={key} event={event} /> )}
            </div>
        );
    }
}

export default List;