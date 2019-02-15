import React from "react";
import PropTypes from "prop-types";
import BaseDomainView from "../BaseDomainView";
import { Label, Segment, Checkbox, Rating } from "semantic-ui-react";
import OfferModel from "../../../core/model/OfferModel";
import {get} from "lodash-es";
import {Bank as BankDomain, Ratings as RatingsDomain } from "../../../domain";

export default class Bank extends BaseDomainView{
    static getHeaderName(){
        return "Bank Name";
    }

    render() {
        const bank = this.getDomain(BankDomain.name);
        const ratings = this.getDomain(RatingsDomain.name);
        return (
            <Segment.Group basic horizontal size="tiny">
                <Segment.Group compact vertical size="mini">
                    <Segment basic><img src={"/images/india/bank-offer/small/"+ this.getBankNameFromId(bank.getId())+".png"} alt="BankImg"/></Segment>
                    <Segment basic> <Checkbox/> </Segment> 
                </Segment.Group>
                <Segment.Group compact vertical size="tiny">
                    <Segment basic>{bank.getName()}</Segment>
                    <Segment basic><Rating icon='star' defaultRating={ratings.getRatings()} maxRating={ratings.getMaxRatings()}/></Segment>
                    <Segment basic>{ratings.getRatings() + "/" + ratings.getMaxRatings() + " " + ratings.getUsersCount() + " users"}</Segment>
                </Segment.Group>
            </Segment.Group>
        );
    }

    getBankNameFromId(bankId){
        //TODO: Either inject bank name as part of offer model OR make a call to websites and get the bank name for id
        switch(bankId){
            case 39 :
                return "citibank";
            case 526 :
                return "tata-capital-limited";
            default:
                return "";
        }
    }
}