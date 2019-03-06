import React from "react";
import PropTypes from "prop-types";
import {Dropdown} from "semantic-ui-react";
import DropdownCheckBox from "./common/DropdownCheckBoxView";
import {Bank as BankDomain} from "../../../domain";
import BaseDomainFilterView from "./BaseDomainFilterView";

export default class Bank extends BaseDomainFilterView {
    static propTypes = {
        domains:   PropTypes.arrayOf(PropTypes.instanceOf(BankDomain)),
        onFilterChange: PropTypes.func.isRequired
    }
  
    getOptions(){
        const filterOptions = this.state.domains.map((domain) => {
            return {key: domain.getId(), text:domain.getName(), value: domain}
        });
        return filterOptions;
    }

    render() {
        return <DropdownCheckBox options = {this.getOptions()} onSelection={this.onSelection} />
    }


}