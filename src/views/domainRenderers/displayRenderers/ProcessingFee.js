import React from "react";
import PropTypes from "prop-types";
import BaseDomainDisplayView from "./BaseDomainDisplayView";
import { Label } from "semantic-ui-react";

export default class ProcessingFee extends BaseDomainDisplayView {

    static getHeaderName(){
        return "Processing Fee";
    }

    render() {
        const domain = this.getDomain();
        if (domain.getValue()) {
            return (
                <div>
                    <div>{domain.getValue()}</div><br/>
                </div>
            );
        } else if (domain.getValueRangeText()) {
            return (
                <div>
                    <div>{domain.getValueRangeText()}</div><br/>
                </div>
            );
        }
    }

  
}