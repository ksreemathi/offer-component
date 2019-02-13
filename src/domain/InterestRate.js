// @flow
import {InterestRateType} from "./Constants";

type InterestRateCtorArgsTypes = {
    minRate: number;
    maxRate: number;
    type: InterestRateType;
    value: number;
    oldValue: number;
}

export default class InterestRate {
    minRate: number;
    maxRate: number; 
    type: InterestRateType;
    value: number;
    valueWithoutDiscount: number;

    constructor({minRate, maxRate, type, value, oldValue}:InterestRateCtorArgsTypes) {
        this.minRate = minRate;
        this.maxRate = maxRate;
        this.type = type;
        this.value = value;
        this.valueWithoutDiscount = oldValue;
    }
}