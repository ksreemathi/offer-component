//@flow
import { cloneDeep, get as getValueForPath, isFunction } from "lodash-es";

import {ProductType, DeviceType, Sector, AccessMode} from "../helpers/Constants";


const contextSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "deviceType": {
            "type": "string",
            "enum": DeviceType.enums.map((e) => e.key)
        },
        "productType": {
            "type": "string",
            "enum": ProductType.enums.map((e) => e.key)
        },
        "sector": {
            "type": "string",
            "enum": Sector.enums.map((e) => e.key)
        },
        "funnel": {
            "type": "string"
        },
        "accessMode": {
            "type": "string",
            "enum": AccessMode.enums.map((e) => e.value)
        },
        "analytics": {
            "type": "object",
            "properties": {
                "disabled": {
                    "type": "boolean"
                }
            }
        },
        "userContext": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "isInternal": {
                            "type": "boolean"
                        },
                        "loginStatus": {
                            "type": "boolean"
                        },
                        "loginType": {
                            "type": "string",
                            "enum": ["GOOGLE", "FACEBOOK", "BANKBAZAAR"]
                        },
                        "cro": {
                            "type": "boolean"
                        },
                        "returningUser": {
                            "type": "boolean"
                        },
                        "activeSection": {
                            "type": "string"
                        }
                    }            
                },
                {
                    "description": "JSON Schema doesnt have a way to specify that the prop can be a javascript function. Therefore created this CATCH ALL TYPE by not having the *type* attribute. If its a Javascript Function, the return type of the function should be an object with the above properties."
                }
            ]
        },
        "variantOptions": {
            "type": "array",
            "items": {
                "type": "string",
                "enum": [
                    "emailOptional",
                    "emailRequired",
                    "mobileOptional",
                    "mobileRequired",
                    "motpm",
                    "motpo",
                    "hideSkippableSlides",
                    "hideValidSlides",
                    "displayDisclaimer",
                    "hideHideableSlides"
                ]
            }
        },
        "experimentContext": {
            "type": "object"
        },
        "eligibilityContext": {
            "type": "object"
        }
    }
};

// TODO: Need to find a better folder for this file as this is like a model class also and not a pure helper. Also, we
// cannot place this merely in *slideshow* folder alone as *domain* also requires this. 
export default class Context {
    static schema = contextSchema;
    _data: Object;

    constructor(data: Object) {
        validateJsonData(data);
        this._data = cloneDeep(data);

        this._data.productType = ProductType.get(getValueForPath(this._data, "productType"));
        this._data.deviceType = DeviceType.get(getValueForPath(this._data, "deviceType"));
        this._data.sector = Sector.get(getValueForPath(this._data, "sector"));
        this._data.accessMode = AccessMode.get(getValueForPath(this._data, "accessMode"));

        if (!this._data.variantOptions) {
            this._data.variantOptions = [];
        }

        if (!this._data.analytics) {
            this._data.analytics = {};
        }

        if (!this._data.userContext) {
            this._data.userContext = {};
        }

        if (!this._data.experimentContext) {
            this._data.experimentContext = {};
        }

        if (!this._data.eligibilityContext) {
            this._data.eligibilityContext = {};
        }

    }

    getProductType(): ProductType {
        return this._data.productType;
    }

    getProductTypeLongCode(): string {
        return this._data.productType.value.longCode;
    }
    
    getProductTypeNamespace(): string {
        return this._data.productType.value.namespace;
    }

    getProductTypeCategory(): string {
        return this._data.productType.value.category;
    }

    getDeviceType(): DeviceType {
        return this._data.deviceType || DeviceType.DESKTOP;
    }

    getSector(): Sector {
        return this._data.sector.key || Sector.IN;
    }

    getFunnel(): string {
        return this._data.funnel || "eligibility";
    }

    getAccessMode(): AccessMode {
        return this._data.accessMode.key || AccessMode.EXTERNAL;
    }

    getCountryCodeFromSector(): string {
        return this._data.sector.value.code || Sector.IN.code;
    }

    shouldPreferMobileLayout(): boolean {
        return DeviceType.MOBILE.is(this._data.deviceType);
    }

    shouldPreferDesktopLayout(): boolean {
        return DeviceType.DESKTOP.is(this._data.deviceType);
    }

    shouldPreferTabletLayout(): boolean {
        return DeviceType.TABLET.is(this._data.deviceType);
    }

    getAnalyticsConfig(): Object {
        return this._data.analytics;
    }

    getUserContext(): Object {
        const obj = this._data.userContext;
        if (isFunction(obj)) {
            return obj();
        } 
        return obj;
    }

    getExperimentContext(): Object {
        return this._data.experimentContext;
    }

    getEligibilityContext(): Object {
        return this._data.eligibilityContext || {};
    }

    isVariantEnabled(variant: string): boolean {
        return this._data.variantOptions.includes(variant);            
    }

}

const validateJsonData = (data: Object): void => {
    /*eslint-disable no-undef*/
    if (process.env.NODE_ENV !== "production") {

        const Ajv = require("ajv");
        //TODO: ajv instance should be used as a singleton for good perf, since this is the only usage, its not an issue for now
        const ajv = new Ajv();
        const validationResult = ajv.validate(contextSchema, data);
        if (!validationResult) {
            console.error("Context schema validation failed: Errors =", ajv.errors);
            throw new Error("The given data doesnt conform to the schema of Context. Faced the following validation errors. " + ajv.errorsText());
        }
    }
    /*eslint-enable no-undef*/
};

