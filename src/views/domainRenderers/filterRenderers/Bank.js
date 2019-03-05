import React from "react";
import PropTypes from "prop-types";
import {Dropdown} from "semantic-ui-react";
import DropdownCheckBox from "./common/DropdownCheckBoxView";
import {Bank as BankDomain} from "../../../domain";

export default class Bank extends DropdownCheckBox{
    static propTypes = {
        domains:   PropTypes.arrayOf(PropTypes.instanceOf(BankDomain)),
        onFilterChange: PropTypes.func.isRequired
    }
  
    getOptions(){
        const filterOptions = this.props.domains.map((domain) => {
            return {key: domain.getId(), text:domain.getName(), value: domain}
        });
        return filterOptions;
    }

    handleItemClickCallBack(selectedValues) {
        this.props.onFilterChange(this.constructor.name, selectedValues);
    }
}