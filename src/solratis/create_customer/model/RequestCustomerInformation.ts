/**
 * Solartis Create Customer API for ILT
 * To create customer for Leisure Travel from Solartis Rate API.Umbrella insurance is extra liability insurance.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface RequestCustomerInformation {
    ProductID?: string;

    ProductVerID?: string;

    ProductNumber?: string;

    ProductVerNumber?: string;

    ProducerCode?: string;

    OwnerId?: string;

    PlanName?: string;

    PlanCode?: string;

    PlanType?: string;

    DepartureDate?: string;

    ReturnDate?: string;

    DepositDate?: string;

    DestinationCountry?: string;

    PolicyEffectiveDate?: string;

    StateCode?: string;

    QuoteType?: string;

    EventName?: string;

    TravelerList?: Array<models.RequestCustomerInformationTravelerList>;

}
