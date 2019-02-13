import React from "react";
import PropTypes from "prop-types";
import "../styles/App.css";
import OffersViewManager from "../core/OffersViewManager";
import OfferRowView from "./OfferRowView";

export default class OfferPageView extends React.Component {
    static propTypes = {
      offerViewManager: PropTypes.instanceOf(OffersViewManager)
    }

    render() {
      const offersList = this.props.offerViewManager.offersWrapperModel.offersList;
      return (
         <div> 
           {this.renderOfferTable(offersList)}
         </div>
      );
    }

    renderOfferTable(offersList) {
      // TODO: Yet to handle groupedOffers Layout
      const children = offersList.map((offerModel) => <OfferRowView offer={offerModel}/>)
      return <div>{children}</div>;
    }
   
  }
  