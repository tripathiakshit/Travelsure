import * as models from './model/models'
import { Configuration } from './configuration';
import { DefaultApi } from './api/DefaultApi';
import { PlanName } from './plan_names';
import * as $ from 'jquery';

export class ApiHelper {

    static accessToken = "c2y2/HIpqY56iCnJEErlrvYCC40F9tSkAU68P3mSOInrDtuTezzIv/KqOce5DfamqZf8K+MiqFTI5EnyQfxSqtMWXMveLfJ3kYOQdQgvMQMFGlvWY/rFJrfSlUrg+3qwslQ+9eo0u8XcxVOmkQdM/MxCkr5u9z3B4sfJHkY62dhW52y1R6OHvVjaf+F/Umov+S6ymdSffR+9ciIv/a17ACoQpOZRsxWjt0ly8CZbsabFDPuTIpYw4uDRTPvytCj3lDri/EdhWQ/UaG1wVb0e8T3R9aGe9YwYDpoOff++boFYCf9+T0V1nNRJovUj6kBxxJrA+AKB9sY+OVBjGN4Y8dLM/7gAUhysTcAPA8D0wUu42jdl6iiwmsj7Elh1R9OF1vmXg2sNYkS2/9HrkH10/e34j0ID0Eo7Q78Yn+nBV2UF/wR2CHAFI2bXXLr9PfKronhD2iFq4ug1BRCM3/7kTO0eIrRhyFO/wdHDMMEDRYcY7TFQIEgauysOGvJH+bPtlzoqeV1dynk+VOLvB1+v8XSsYaT/IC54Oj6Bo9DBJ0roFmInKjvNUCR9lCEgGiN4g4DccwkhZrAAocFEc+YP0UZh6i5J5MR4eJbxX40BpUyH3TcFvgsB24NBEBbf3P+DOgqH2CAEFcxJXFUYof4/PFOxKhq/L9Zq0z3pdbAV5fmrrl0pTgzUaHg1aIHKgNRa/edOKDNZGwhJq1SKo1MVJivWvAlrGRIyGIjbmNCp3FSrrl0pTgzUaHg1aIHKgNRaGvS5E7AJQtyLUsvoG7dDXS2iXV21kvApQZG3XU0Qm3lkTTGTQ6v70tSU2/BSgpeTrJ4iuTGUJzG2XajR5am79ljsNo/o1FNAU4Zw4BF+lxI0re0qEtV3evheA8j0WbEGw+1xoTlsE4GygCxwy+i74gNyuHR41Sh79cTnfC9vOC7FiqTlqh3/MWKkSIgh2YEBLUkWQnX0D25JZFyhjWk4ww==";
    private static api : DefaultApi = null;

    public static getApi() {
        if(this.api == null) {
            this.api = new DefaultApi(null, this.getConfiguration())
        }
        return this.api;
    }

    public static getRequestServiceDetail(): models.RatingRequestServiceRequestDetail {
        let srd: models.RatingRequestServiceRequestDetail = {
            ServiceRequestVersion: "1.0",
            ServiceResponseVersion: "1.0",
            OwnerId: "15",
            ResponseType: models.RatingRequestServiceRequestDetail.ResponseTypeEnum.JSON,
            RegionCode: "US",
            Token: this.accessToken,
            UserName: "travelagent",
            LanguageCode: "en"
        };
        return srd;
    }

    public static getConfiguration() : Configuration {
        let configuration = new Configuration();
        configuration.accessToken = this.accessToken;
        return configuration;
    }

    public static getTravelerList(price: string) : Array<models.RatingRequestQuoteInformationTravelerList> {
        let tList: models.RatingRequestQuoteInformationTravelerList[] = [{
            TravelerDOB: "02/14/1990",
            TravelCost: price
        }];
        return tList;
    }

    public static getToken() : string {
        return this.accessToken;
    }

    public static getRatingRequest(fromDate: string, toDate: string, stateCode: string,
        country: string, price: string) : JQuery.Promise3<{
            response: JQueryXHR;
            body: models.RatingSuccessResponse;
        }, any, never, {
            response: JQueryXHR;
            body: models.RatingSuccessResponse;
        }, any, never, {
            response: JQueryXHR;
            body: models.RatingSuccessResponse;
        }, any, never> {

        let reqProc: models.RatingRequest = {
            ServiceRequestDetail: ApiHelper.getRequestServiceDetail(),
            QuoteInformation: this.buildQuoteInfo(country, fromDate, toDate, stateCode, PlanName.AIR_TICKET_PROTECTOR, this.getTravelerList(price))
        }

        let reqPrem: models.RatingRequest = {
            ServiceRequestDetail: ApiHelper.getRequestServiceDetail(),
            QuoteInformation: this.buildQuoteInfo(country, fromDate, toDate, stateCode, PlanName.PREMIER, this.getTravelerList(price))
        }

        let reqClass: models.RatingRequest = {
            ServiceRequestDetail: ApiHelper.getRequestServiceDetail(),
            QuoteInformation: this.buildQuoteInfo(country, fromDate, toDate, stateCode, PlanName.CLASSIC_PLUS, this.getTravelerList(price))
        }

        var promises = $.when(this.getApi().getRates(ApiHelper.getToken(), "application/json", "InvokeRatingV2", reqProc),
                this.getApi().getRates(ApiHelper.getToken(), "application/json", "InvokeRatingV2", reqPrem),
                this.getApi().getRates(ApiHelper.getToken(), "application/json", "InvokeRatingV2", reqClass),
            )
        return promises;
    }

    public static buildQuoteInfo(country: string,
        fromDate: string, toDate: string, stateCode: string, planName: PlanName,
        travelerList: Array<models.RatingRequestQuoteInformationTravelerList>) 
        : models.RatingRequestQuoteInformation {
            var quoteInfo: models.RatingRequestQuoteInformation;

            switch(planName) {
                case PlanName.AIR_TICKET_PROTECTOR:
                    quoteInfo = this.getQuoteInfoForProtector();
                    break;
                case PlanName.CLASSIC_PLUS:
                    quoteInfo = this.getQuoteInfoForClassic();
                    break;
                case PlanName.PREMIER:
                    quoteInfo = this.getQuoteInfoForPremier();
                    break;
                default:
                    quoteInfo = this.getQuoteInfoForProtector();
            }

            quoteInfo.DestinationCountry = country;
            quoteInfo.DepartureDate = fromDate;
            quoteInfo.ReturnDate = toDate;
            quoteInfo.DepositDate = fromDate;
            quoteInfo.StateCode = stateCode;
            quoteInfo.TravelerList = travelerList;
            return quoteInfo;
    }

    public static getQuoteInfoForProtector() : models.RatingRequestQuoteInformation {
        let quoteInfo: models.RatingRequestQuoteInformation = this.getStaticQuoteInfo();
        quoteInfo.ProducerCode = "86201";
        quoteInfo.PlanName = "Air Ticket Protector";
        quoteInfo.PlanCode = "1"
        quoteInfo.TripCancellationCoverage = "With Trip Cancellation";
        return quoteInfo;
    }

    public static getQuoteInfoForClassic() : models.RatingRequestQuoteInformation {
        let quoteInfo: models.RatingRequestQuoteInformation = this.getStaticQuoteInfo();
        quoteInfo.ProducerCode = "86201";
        quoteInfo.PlanName = "Classic Plus";
        quoteInfo.PlanCode = "2"
        quoteInfo.TripCancellationCoverage = "With Trip Cancellation";
        return quoteInfo;
    }

    public static getQuoteInfoForPremier() : models.RatingRequestQuoteInformation {
        let quoteInfo: models.RatingRequestQuoteInformation = this.getStaticQuoteInfo();
        quoteInfo.ProducerCode = "86201";
        quoteInfo.PlanName = "Premier";
        quoteInfo.PlanCode = "2"
        quoteInfo.TripCancellationCoverage = "With Trip Cancellation";
        return quoteInfo;
    }


    private static getStaticQuoteInfo() : models.RatingRequestQuoteInformation {
        let quoteInfo: models.RatingRequestQuoteInformation = {
            ProductID: "619",
            ProductNumber: "ILT",
            ProductVerNumber: "1.0",
            OwnerId: "15",
            ProductVerID: "706",
            StateCode: "GA",
            QuoteType: "New Business",
            EventName: "InvokeRatingV2",
        };
        return quoteInfo;
    }
}