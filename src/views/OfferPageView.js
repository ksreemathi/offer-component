import React from "react";
import PropTypes from "prop-types";
import "../styles/App.css";
import OffersViewManager from "../core/OffersViewManager";
import OfferRowView from "./OfferRowView";
import {Table} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { displayColumnsForProduct } from "../helpers/DomainTypeMappings";
import {get} from "lodash-es";

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
      const displayRenderers =  get(displayColumnsForProduct, this.props.offerViewManager.context.getProductType().key);
      const headers = this.renderHeader(displayRenderers);
      const children = offersList.map((offerModel) => <OfferRowView offer={offerModel} displayRenderers={displayRenderers}/>)
     
      return (
        <Table celled padded>
            <Table.Header>
                <Table.Row>
                  {headers}
                </Table.Row>  
            </Table.Header>
            <Table.Body>
                {children}
            </Table.Body>  
        </Table>
      );
    }

    renderHeader(displayRenderers) {
       const headers = displayRenderers.map((renderer) => renderer.getHeaderName());
       return headers.map((header) =>  <Table.HeaderCell> {header} </Table.HeaderCell>);
    }
   
  }
  