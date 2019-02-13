import React from "react";
import PropTypes from "prop-types";
import OfferModel from "../core/model/OfferModel";

export default class OfferRowView extends React.Component {
    static propTypes = {
        offer: PropTypes.instanceOf(OfferModel)
    }
    
    render() {
        return <div>{this.props.offer.name}</div>;
    }
}