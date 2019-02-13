// @flow
import Enum from "enum";

export const InterestRateType = new Enum({
    FIXED: "FIXED", 
    FLOATING: "FLOATING"
}, {freez: true});

export const ProcessingFeeType = new Enum({
    ONE_TIME:"ONE_TIME",
    BANKBAZAAR_EXCLUSIVE:"BANKBAZAAR_EXCLUSIVE"
}, {freez: true});