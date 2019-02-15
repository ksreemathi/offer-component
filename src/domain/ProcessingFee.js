// @flow
import {ProcessingFeeType} from "./Constants";

type ProcessingFeeCtorArgsTypes = {
    type: ProcessingFeeType;
    value: number;
    valueRangeText: string;
}
export default class ProcessingFee {
    type: ProcessingFeeType;
    value: number;
    valueRangeText: string;

    constructor({value, type, valueRangeText}:ProcessingFeeCtorArgsTypes){
        this.value = value;
        this.type = type;
        this.valueRangeText = valueRangeText;
    }

    getValue() {
        return this.value;
    }

    getValueRangeText() {
        return this.valueRangeText;
    }
}