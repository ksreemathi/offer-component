import React from "react";
import ReactDOM from "react-dom";
import Context from "./core/Context";
import OffersViewManager from "./core/OffersViewManager";
import OfferPageView from "./views/OfferPageView";

export function createContext(data) {
  return new Context(data);
}

export function createOffersViewManager(params) {
  const {context, offersConfig} = params
  return new OffersViewManager(context, offersConfig);
}

export function launchView(offerViewManager){
    ReactDOM.render(<OfferPageView offerViewManager={offerViewManager}/>, document.getElementById("root"));
}