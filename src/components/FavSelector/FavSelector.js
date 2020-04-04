import React, { Component } from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
import { GiHeartPlus } from "react-icons/gi";
import { GiHearts } from "react-icons/gi";
import './FavSelector.css';

class FavSelector extends Component {

    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.unselect = this.unselect.bind(this);
    }

    select(e) {
        console.debug("select");
        e.stopPropagation();
        this.props.selectCallback(this.props.item);
    }

    unselect(e) {
        console.debug("unselect", e.currentTarget);
        e.stopPropagation();
        console.debug("stop propagation? ");
        console.debug(e);
        this.props.unselectCallback(this.props.item);
    }

    render() {
        return <div>

            {this.props.selected &&
                <IconContext.Provider value={{ className: "heartSelected" }}>
                    <div className="favSelector">
                        <GiHearts onClick={this.unselect} />
                    </div>
                </IconContext.Provider>
            }
            {!this.props.selected &&

                <IconContext.Provider value={{ className: "heart" }}>
                    <div className="favSelector">
                        <GiHeartPlus onClick={this.select} />
                    </div>
                </IconContext.Provider>
            }
            <div className="selectionOverlay" />

        </div>
    }
}

export default FavSelector;


FavSelector.propTypes = {
    selected: PropTypes.bool,
    selectionCallback: PropTypes.func,
    itemId: PropTypes.string
};