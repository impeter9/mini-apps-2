import React from 'react';
import axios from "axios";
import SearchBar from './components/SearchBar.jsx';
import List from './components/List.jsx';
import Event from './components/Event.jsx';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: [],
            elements: [],
            perPage: 10,
            currentPage: 0,
            keyword: '',
        };
    }

    setElementsForCurrentPage() {
        let elements = this.state.data
                      .slice(this.state.offset, this.state.offset + this.state.perPage)
                      .map(post => ( <Event data={post}/>));
        this.setState({ elements: elements });
    }

    handlePageClick(data) {
        const selectedPage = data.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, () => {
          this.setElementsForCurrentPage();
        });
    }

    handleSearchKeyword(e) {
        e.preventDefault();
        console.log(e.target.name.value);
        axios.get(`http://localhost:3000/events?q=${e.target.name.value}_page=${this.state.currentPage}`)
        .then((res) => {
          this.setState({
            data: res.data,
            pageCount: Math.ceil(res.data.length / this.state.perPage)
          }, () => this.setElementsForCurrentPage());
        });
    }

    // render() {
    //     return (
    //         <div>
    //             <div>Search for a historical event!</div>
    //             <SearchBar handleSearchKeyword={this.handleSearchKeyword.bind(this)} />
    //             <List data={this.state.data}/>
    //         </div>
    //     );
    // }
    render() {
        let paginationElement;
        if (this.state.pageCount > 1) {
          paginationElement = (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={<span className="gap">...</span>}
              pageCount={this.state.pageCount}
              onPageChange={this.handlePageClick}
              forcePage={this.state.currentPage}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
            />
          );
        }
        return (
          <div className="App">
            <SearchBar handleSearchKeyword={this.handleSearchKeyword.bind(this)} />
            {paginationElement}
            {this.state.elements}
            {paginationElement}
          </div>
        );
    }
}

export default App;
