// @flow
import {domainTypesForProduct} from "../DomainTypeMappings.js";
import {get} from "lodash-es";
import Context from "../Context";
import * as Domains from "../../domain";

export default class OfferModel {
    productId: number;
    bankId: number;
    name: string;
    domains: Array<typeof Domains>;

    constructor(context:Context, offerConfig:Object) {
        this.productId = get(offerConfig,"productId");
        this.bankId = get(offerConfig, "bankId");
        this.name = get(offerConfig, "name");
        this.domains = this.getAllDomains(context.getProductType().key, offerConfig);
    }

    getAllDomains(productType:string, offerConfig:Object) {
        const applicableDomainNames = get(domainTypesForProduct, productType);
        const domainInstances = applicableDomainNames.map((domain) => {
            const domainType = domain.name;
            const domainConfig = get(offerConfig, domainType);
            return new Domains[domainType](domainConfig);
        });
        return domainInstances;
    }

}