// @flow
import {domainTypesForProduct} from "../../helpers/DomainTypeMappings.js";
import {get} from "lodash-es";
import Context from "../Context";
import * as Domains from "../../domain";

export default class OfferModel {
    productId: number;
    domains: Object;

    constructor(context:Context, offerConfig:Object) {
        this.productId = get(offerConfig,"productId");
        this.domains = this.getAllDomains(context.getProductType().key, offerConfig);
    }

    getAllDomains(productType:string, offerConfig:Object) {
        const applicableDomainNames = get(domainTypesForProduct, productType);
        return Object.keys(applicableDomainNames).reduce((domains, key)=> {
            const domainType = applicableDomainNames[key].name;
            const domainConfig = get(offerConfig, domainType);
            return Object.assign(domains, {[domainType]: new Domains[domainType](domainConfig)});
        }, {})
    }

}