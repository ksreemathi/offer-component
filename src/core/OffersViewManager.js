// @flow
import OffersWrapper from "./model/OffersWrapper";
import Context from "./Context";

//TODO: Find a better name for this class
export default class OffersViewManager {
    context: Context;
    offersWrapperModel: OffersWrapper;

    constructor(context:Context, config:string) {
        this.context = context;
        if(config) { 
            this.offersWrapperModel = new OffersWrapper(this.context, config);
        }
    }

    getOffersWrapperModel(){
        return this.offersWrapperModel;
    }

    getContext() {
        return this.context;
    }
}