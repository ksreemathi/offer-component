import React from "react";
import PropTypes from "prop-types";
import "../styles/App.css";
import OffersViewManager from "../core/OffersViewManager";
import OfferRowView from "./OfferRowView";
import {Table, Segment} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { displayColumnsForProduct, filtersForProduct } from "../helpers/DomainTypeMappings";
import {get, isEqual} from "lodash-es";

export default class OfferPageView extends React.Component {
    static propTypes = {
      offerViewManager: PropTypes.instanceOf(OffersViewManager)
    }

    constructor(args) {
      super(args);
      this.offersList = this.props.offerViewManager.offersWrapperModel.offersList;
      this.state = {
        filtersApplied : {}, 
        visibleOffers : this.offersList
      }
    }

    render() {
      const offersList = this.state.visibleOffers;
      return (
         <Segment.Group vertical> 
            <Segment basic> {this.renderBbHeader()} </Segment>
            <Segment basic> {this.renderFilterSection()} </Segment>
            <Segment basic> {this.renderOfferTable(offersList)} </Segment>
         </Segment.Group>
         
      );
    }

    renderBbHeader() {
      return (
        <div>
          <img src="/images/bankbazaar-logo-v1.png" alt="BankBazaar" title="Low Interest home loan, personal loans &amp; car loans from all banks in India" class="lazy"/>
        </div>);
    }

    renderFilterSection() {
      const filterRenderers =  get(filtersForProduct, this.props.offerViewManager.context.getProductType().key);
      const filtersView = filterRenderers.map((filterKlass) =>  this.renderFilterViewByKlass(filterKlass));
      return (
          <Segment.Group horizontal compact>
            <Segment> Filter by: </Segment>
            {filtersView}
          </Segment.Group>
        );
    }
  
    renderFilterViewByKlass(filterKlass) {
      const domainsList = this.offersList.map((offer) => {
          return get(offer.domains, filterKlass.name);
      });

      const filterViewProps = {
          domains: domainsList,
          onFilterChange : this.onFilterChange
      }

      return (
        <Segment>
          {React.createElement(filterKlass, {...filterViewProps})}
        </Segment>
      );
    }

    onFilterChange = (selectedFilterName, selectedFilterValue) => {
      let filtersApplied = this.state.filtersApplied;
      Object.assign(filtersApplied, {[selectedFilterName]: selectedFilterValue});

      const filteredOffers = this.offersList.filter((offer) => {
          const offerValue = get(offer.domains, selectedFilterName);
          return  selectedFilterValue.length == 0 || selectedFilterValue.some((o) => isEqual(o, offerValue));
      });

      this.setState({filtersApplied: filtersApplied, visibleOffers: filteredOffers});
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
  