import React from "react";
import PropTypes from "prop-types";
import "../styles/App.css";
import OffersViewManager from "../core/OffersViewManager";
import OfferRowView from "./OfferRowView";
import {Table} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

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
      return (
        <Table celled padded>
            <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>Bank Name</Table.HeaderCell>
                  {/* <Table.HeaderCell>Effect</Table.HeaderCell>
                  <Table.HeaderCell>Efficacy</Table.HeaderCell>
                  <Table.HeaderCell>Consensus</Table.HeaderCell>
                  <Table.HeaderCell>Comments</Table.HeaderCell> */}
                </Table.Row>  
            </Table.Header>
            <Table.Body>
                {children}
            </Table.Body>  
        </Table>
      );
    }
   
  }
  