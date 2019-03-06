import React from "react";
import PropTypes from "prop-types";
import BaseDomain from "../../../domain/BaseDomain";
import {get} from "lodash-es";

export default class BaseDomainFilterView extends React.Component {
    static propTypes = {
        domains: PropTypes.arrayOf(PropTypes.instanceOf(BaseDomain)).isRequired, 
        onFilterChange: PropTypes.func.isRequired
    }

    constructor(args){
        super(args);
        this.state = {
            domains: this.props.domains,
            selectedValues : []
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.domains && this.props.domains !== newProps.domains) {
            this.setState({domains: newProps.domains});
        }
    }

    onSelection = (selectedValues) => {
        this.setState({selectedValues}, () => {
            this.props.onFilterChange(this.constructor.name, selectedValues);
        });
    }

}