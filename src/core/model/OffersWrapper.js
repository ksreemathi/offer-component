// @flow
import OfferModel from "./OfferModel";
import Context from "../Context";

export default class OffersWrapper {
    offersList: Array<OfferModel>;

    constructor(context:Context, config:Object) {
        if(!config || !config.offers){
            return;
        }
        
        this.offersList = config.offers.map((offerConfig) => {
            return new OfferModel(context, offerConfig);
        });
    }
}