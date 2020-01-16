import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <form onSubmit={this.props.handleSearchKeyword}>
                Keyword:
                <input type="text" name="name" />
                <input type="submit" value="Go" />
            </form>
        );
    }
}

export default SearchBar;