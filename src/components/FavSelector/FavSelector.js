import React, { Component } from "react";
import PropTypes  from "prop-types";
import { GiHeartPlus } from "react-icons/gi";
import { GiHearts } from "react-icons/gi";

class FavSelector extends Component {

    render() {
        return <div>
                 <div className="selectionOverlay"/>
                 {this.props.selected &&
                     <GiHearts onClick={this.props.selectionCallback(this.props.itemId)}/>
                 }
                 {!this.props.selected && 
                     <GiHeartPlus onClick={this.props.selectionCallback(this.props.itemId)}/>
                 }
                 
            </div>
    }
}

export default FavSelector;


FavSelector.propTypes = {
    selected: PropTypes.bool,
    selectionCallback: PropTypes.func,
    itemId: PropTypes.string
};