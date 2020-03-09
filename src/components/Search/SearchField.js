import React, { Component } from "react";

class SearchField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchString: ""
        }
      this.timer = null;
    }

  
    handleInputChange = (e) => {
      // Immediately update the state
      this.setState({
        searchString: e.target.value
      })
  
      // Execute the debounced onChange method
      this.onChangeDebounced(e)
    }
  
    onChangeDebounced = () => {
        // Clears running timer and starts a new one each time the user types
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.startSearch();
        }, 1000);
    }

    startSearch = () => {
        // Clears running timer and starts a new one each time the user types
        this.props.search(this.state.searchString);
    }

    render() {
        return <div>
            <input onChange={this.handleInputChange} className="searchInput form-control" type="text"></input>
        </div>
    }
}

export default SearchField;