import React from "react";
import PropTypes from "prop-types";
import {Dropdown, Checkbox, Label, Popup, Icon} from "semantic-ui-react";

export default class DropdownCheckBox extends React.Component{
    constructor(args){
        super(args);
        this.state = {
            selectedValues: []
        }
    }

    getOptions(){
        return [];
    }

    render() {
        const options = this.getOptions();

        const checkBoxOptions = options.map((option) => (
                        <CheckboxOption text={option.text} 
                            value={option.value}
                            onSelection={this.handleItemClick} 
                            active={this.state.selectedValues.includes(option.value)}/>)
                    );
        
        const selectedCount = this.state.selectedValues.length;
        const labelText = selectedCount > 0 ? ("Bank ("+selectedCount+")") : "Bank";

        return (
            <Popup basic 
                position="bottom left"
                trigger={<Label> <Icon name="box"/> {labelText} </Label> }
                content={checkBoxOptions}
                on="click"
                hideOnScroll           
            />
        );
    }

    handleItemClick = (value, isActive) => {
        let selectedSet = this.state.selectedValues;
        if(isActive) {
            selectedSet = [...selectedSet, value];
        }
        else {
            selectedSet = selectedSet.filter((val => val != value));
        }

        this.setState({selectedValues: selectedSet}, () => {
            this.handleItemClickCallBack && this.handleItemClickCallBack(selectedSet)
        });
    }
}


export class CheckboxOption extends React.Component {
    static propTypes = {
            text: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            onSelection: PropTypes.func.isRequired
    }
    
    constructor(args){
        super(args);
        this.state = {
            active: this.props.active || false
        }
    }
    
    render() {
        return (
            <Checkbox label={this.props.text} 
                value={this.props.value}
                checked={this.state.active}
                onClick={this.onClickHandler}
            />
        );
    }

    onClickHandler = () => {
        this.setState(prevState => {
            let newState = !prevState.active;
            this.props.onSelection(this.props.value, newState);
            return {active: newState};
        });
    }



}