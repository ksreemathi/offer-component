import React from "react";
import PropTypes from "prop-types";
import OfferModel from "../core/model/OfferModel";
import {Table} from "semantic-ui-react";
import BaseDomainView from "./domainRenderers/BaseDomainView";
import { getDomainsForRenderer } from "../helpers/DomainTypeMappings";
import {get} from "lodash-es";

export default class OfferRowView extends React.Component {
    static propTypes = {
        offer: PropTypes.instanceOf(OfferModel),
        displayRenderers: PropTypes.arrayOf(PropTypes.instanceOf(BaseDomainView))
    }
    
    render() {
        const children = this.instantiateDisplayRenderers(this.props.displayRenderers);

        return (
            <Table.Row>
                <Table.Cell>{children[0]}</Table.Cell>
                <Table.Cell>{children[1]}</Table.Cell>
                <Table.Cell>{children[2]}</Table.Cell>
            </Table.Row>
        );  
    }

    instantiateDisplayRenderers(displayRenderers) {
        const childComponents = displayRenderers.map((renderer) => {
            const domainClassesForRenderer = getDomainsForRenderer(renderer);
            const domainInstances = Object.keys(domainClassesForRenderer).reduce((domains, key)=> {
                const domainClass = domainClassesForRenderer[key];
                return Object.assign(domains, {[domainClass.name] : get(this.props.offer.domains, domainClass.name)});
            }, {});
            return React.createElement(renderer, { domains: domainInstances });
        });
        return childComponents;
    }

}