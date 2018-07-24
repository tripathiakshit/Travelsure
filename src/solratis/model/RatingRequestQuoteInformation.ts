/**
 * Solartis Rate API for ILT
 * To get rate for Leisure Travel from Solartis Rate API.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface RatingRequestQuoteInformation {
    ProductID?: string;

    ProductVerID?: string;

    ProductNumber?: string;

    ProductVerNumber?: string;

    ProducerCode?: string;

    OwnerId?: string;

    PlanName?: string;

    PlanCode?: string;

    DepartureDate?: string;

    ReturnDate?: string;

    DepositDate?: string;

    DestinationCountry?: string;

    PolicyEffectiveDate?: string;

    RentalStartDate?: string;

    RentalEndDate?: string;

    RentalLimit?: string;

    NumberOfRentalCars?: string;

    TripCancellationCoverage?: string;

    StateCode?: string;

    QuoteType?: string;

    EventName?: string;

    TravelerList?: Array<models.RatingRequestQuoteInformationTravelerList>;

}
