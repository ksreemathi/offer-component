import React from "react";
import PropTypes from "prop-types";
import BaseDomain from "../../../domain/BaseDomain";
import {get} from "lodash-es";

export default class BaseDomainDisplayView extends React.Component {
    static propTypes = {
        domains: PropTypes.object.isRequired,
    }

    constructor(args){
        super(args);
        this.state= {
            domains : this.props.domains
        }
    }


    componentWillReceiveProps(newProps) {
        if (newProps.domains && this.props.domains !== newProps.domains) {
            this.setState({domains: newProps.domains});
        }
    }


    getDomain(key) {
        if(!key) {
            key = this.constructor.name;
        }
        
        return get(this.state.domains, key);
    }

}