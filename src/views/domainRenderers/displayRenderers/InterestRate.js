import React from "react";
import PropTypes from "prop-types";
import BaseDomainDisplayView from "./BaseDomainDisplayView";
import { Label } from "semantic-ui-react";

export default class InterestRate extends BaseDomainDisplayView {

    static getHeaderName(){
        return "Interest Rate";
    }

    render() {
        const domain = this.getDomain();
        if (domain.getValue()) {
            return (
                <div>
                    {domain.getValueWithoutDiscount() && <span style={{textDecoration: "line-through"}}>{domain.getValueWithoutDiscount()}%</span> } <span>{domain.getValue()}%</span>
                    <div>{this.getSubscript(domain)}</div>
                </div>
            );
        } else if (domain.getMinRate() && domain.getMaxRate()) {
            return (
                <div>
                    <div>{domain.getMinRate()+ "% - " + domain.getMaxRate() + "%"}</div><br/>
                    <div>{this.getSubscript(domain)}</div>
                </div>
            );
        }
    }

    getSubscript(domain){
        return <Label>{domain.getType()}</Label>;
    }
}