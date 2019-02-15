import React from "react";
import PropTypes from "prop-types";
import BaseDomain from "../../domain/BaseDomain";
import {get} from "lodash-es";

export default class BaseDomainView extends React.Component {
    static propTypes = {
        domains: PropTypes.object.isRequired,
    }

    constructor(args){
        super(args);
        this.domains = this.props.domains;
    }


    // getProductType() {
    //     return this.context.getProductType().key;
    // }

    getDomain(key) {
        if(!key) {
            key = this.constructor.name;
        }
        
        return get(this.domains, key);
    }

}