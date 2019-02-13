import React from "react";
import PropTypes from "prop-types";
import OfferModel from "../core/model/OfferModel";
import {Table} from "semantic-ui-react";

export default class OfferRowView extends React.Component {
    static propTypes = {
        offer: PropTypes.instanceOf(OfferModel)
    }
    
    render() {
        return <Table.Row><Table.Cell>{this.props.offer.name}</Table.Cell></Table.Row>;
    }
}