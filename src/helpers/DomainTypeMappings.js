// @flow
import * as Domains from "../domain";
import * as DisplayRenderers from "../views/domainRenderers/displayRenderers";

export const domainTypesForProduct = {
    "PL": [
        Domains.Bank,
        Domains.Ratings,
        Domains.InterestRate,
        Domains.ProcessingFee
    ], 
    "CC": [

    ]
};

export const displayColumnsForProduct = {
    "PL": [
       DisplayRenderers.Bank,
       DisplayRenderers.InterestRate,
       DisplayRenderers.ProcessingFee
    ],
    "CC":[

    ]
};

// This holds the list of domains that are to be injected as props to the displayRenderer. 
// By default, if there is a domain name which matches with the renderer name, that will be injected as props. 
// There are cases where we wanna inject more than one domain to a renderer. This object is used for that purpose. 
const domainPropOverrides = {
    [DisplayRenderers.Bank] : [Domains.Bank, Domains.Ratings]
}


export function getDomainsForRenderer(displayRenderer) {
    const domains =  domainPropOverrides[displayRenderer] || [Domains[displayRenderer.name]]
    return domains; 
}