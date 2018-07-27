import * as models from './model/models'
import * as ccModels from './create_customer/model/models'
import * as iModels from './issue/model/models'
import { Configuration } from './configuration';
import { DefaultApi } from './api/DefaultApi';
import { DefaultApi as CCApi } from './create_customer/api/DefaultApi'
import { DefaultApi as IssueApi } from './issue/api/DefaultApi'
import { PlanName } from './plan_names';
import * as $ from 'jquery';
import { TravelerInfo } from './model/TravelerInfo';
import { PaymentInfo } from './model/PaymentInfo';

export class ApiHelper {

    static accessToken = "c2y2/HIpqY56iCnJEErlrvYCC40F9tSkAU68P3mSOInrDtuTezzIv/KqOce5DfamqZf8K+MiqFTI5EnyQfxSqtMWXMveLfJ3kYOQdQgvMQMFGlvWY/rFJrfSlUrg+3qwslQ+9eo0u8XcxVOmkQdM/MxCkr5u9z3B4sfJHkY62dhW52y1R6OHvVjaf+F/Umov+S6ymdSffR+9ciIv/a17ACoQpOZRsxWjt0ly8CZbsabFDPuTIpYw4uDRTPvytCj3lDri/EdhWQ/UaG1wVb0e8T3R9aGe9YwYDpoOff++boFYCf9+T0V1nNRJovUj6kBxxJrA+AKB9sY+OVBjGN4Y8dLM/7gAUhysTcAPA8D0wUu42jdl6iiwmsj7Elh1R9OF1vmXg2sNYkS2/9HrkH10/e34j0ID0Eo7Q78Yn+nBV2UF/wR2CHAFI2bXXLr9PfKronhD2iFq4ug1BRCM3/7kTO0eIrRhyFO/wdHDMMEDRYcY7TFQIEgauysOGvJH+bPtlzoqeV1dynk+VOLvB1+v8XSsYaT/IC54Oj6Bo9DBJ0roFmInKjvNUCR9lCEgGiN4g4DccwkhZrAAocFEc+YP0UZh6i5J5MR4eJbxX40BpUyH3TcFvgsB24NBEBbf3P+DOgqH2CAEFcxJXFUYof4/PFOxKhq/L9Zq0z3pdbAV5fmrrl0pTgzUaHg1aIHKgNRa/edOKDNZGwhJq1SKo1MVJivWvAlrGRIyGIjbmNCp3FSrrl0pTgzUaHg1aIHKgNRaGvS5E7AJQtyLUsvoG7dDXS2iXV21kvApQZG3XU0Qm3lkTTGTQ6v70tSU2/BSgpeTrJ4iuTGUJzG2XajR5am79ljsNo/o1FNAU4Zw4BF+lxI0re0qEtV3evheA8j0WbEGw+1xoTlsE4GygCxwy+i74gNyuHR41Sh79cTnfC9vOC7FiqTlqh3/MWKkSIgh2YEBLUkWQnX0D25JZFyhjWk4ww==";
    private static api : DefaultApi = null;
    private static cc_api : CCApi = null;
    private static issue_api : IssueApi = null;

    public static getApi() {
        if(this.api == null) {
            this.api = new DefaultApi(null, this.getConfiguration());
        }
        return this.api;
    }

    public static getCCApi() {
        if(this.cc_api == null) {
            this.cc_api = new CCApi(null, this.getConfiguration());
        }
        return this.cc_api;
    }

    public static getIssueApi() {
        if(this.issue_api == null) {
            this.issue_api = new IssueApi(null, this.getConfiguration());
        }
        return this.issue_api;
    }

    public static getIssueServiceRequest() : iModels.RequestServiceRequestDetail {
        let srd: iModels.RequestServiceRequestDetail = {
            ServiceRequestVersion: "1.0",
            ServiceResponseVersion: "1.0",
            OwnerId: "15",
            ResponseType: iModels.RequestServiceRequestDetail.ResponseTypeEnum.JSON,
            RegionCode: "US",
            Token: this.accessToken,
            UserName: "travelagent",
            LanguageCode: "en"
        }
        return srd;

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

    private static getStaticRequestInfo() : ccModels.RequestServiceRequestDetail {
        let srd : ccModels.RequestServiceRequestDetail = {
            ServiceRequestVersion: "1.0",
            ServiceResponseVersion: "1.0",
            OwnerId: "15",
            ResponseType: ccModels.RequestServiceRequestDetail.ResponseTypeEnum.JSON,
            RegionCode: "US",
            Token: this.accessToken,
            UserName: "travelagent",
            LanguageCode: "en"
        }
        return srd;
    }

    public static getConfiguration() : Configuration {
        let configuration = new Configuration();
        configuration.accessToken = this.accessToken;
        return configuration;
    }

    public static getCCTravelerList(price: string, travelerDob: string, travelerInfo: TravelerInfo) : 
    Array<ccModels.RequestCustomerInformationTravelerList> {
        let tList: ccModels.RequestCustomerInformationTravelerList[] = [{
            TravelerDOB: travelerDob,
            TravelCost: price,
            FirstName: travelerInfo.FirstName,
            LastName: travelerInfo.LastName,
            AddressLine1: travelerInfo.AddressLine1,
            City: travelerInfo.City,
            State: travelerInfo.State,
            StateCode: travelerInfo.StateCode,
            Country: travelerInfo.Country,
            Zipcode: travelerInfo.ZipCode,
            Phone: travelerInfo.Phone,
            Email: travelerInfo.Email,
            TravelerIndex: "1"
        }];
        return tList;
    }

    public static getTravelerList(price: string, userDob: string) : 
    Array<models.RatingRequestQuoteInformationTravelerList> {
        let tList: models.RatingRequestQuoteInformationTravelerList[] = [{
            TravelerDOB: userDob,
            TravelCost: price
        }];
        return tList;
    }

    public static getToken() : string {
        return this.accessToken;
    }

    public static createCustomerRequest(fromDate: string, toDate: string,
    country: string, plan: any, travelerInfo: TravelerInfo) : JQueryPromise<{ response: JQueryXHR; body: ccModels.SuccessResponse;  }> {
        let traveler = plan.PremiumInformation.TravelerList[0];
        let reqProc: ccModels.Request = {
            ServiceRequestDetail : this.getStaticRequestInfo(),
            CustomerInformation : 
            this.buildCCInfo(fromDate, toDate, country, plan, 
                this.getCCTravelerList(traveler.TravelCost, traveler.TravelerDOB, travelerInfo))
        }
        return this.getCCApi().createcustomer(this.getToken(), "application/json", "CreateCustomer", reqProc);
    }

    public static issuePolicyRequest(paymentInfo : PaymentInfo, customerNumber: string, travelerInfo : TravelerInfo) : JQueryPromise<{ response: JQueryXHR; body: iModels.SuccessResponse;  }> {
        let policyInfo = this.getIssueInfo();
        policyInfo.CustomerNumber = customerNumber;
        policyInfo.CardType = 'MasterCard';
        policyInfo.CardNumber = paymentInfo.CardNumber;
        policyInfo.CVV = paymentInfo.Cvc;
        policyInfo.ExpiryMonth = paymentInfo.ExpiryMonth;
        policyInfo.ExpiryYear = paymentInfo.ExpiryYear;
        policyInfo.PaymentMethod = "Credit Card";
        policyInfo.PayerName = paymentInfo.CardName;
        policyInfo.PayerAddress1 = travelerInfo.AddressLine1;
        policyInfo.PayerCity = travelerInfo.City;
        policyInfo.PayerState = travelerInfo.StateCode;
        policyInfo.PayerZipcode = travelerInfo.ZipCode;
        policyInfo.PayerPhone = travelerInfo.Phone;
        policyInfo.PayerCountry = travelerInfo.Country;
        policyInfo.PayerEmail = travelerInfo.Email;

        let reqProc: iModels.Request = {
            ServiceRequestDetail : this.getIssueServiceRequest(),
            PolicyInformation : policyInfo
        }
        console.log(reqProc);
        return this.getIssueApi().policyissuance(this.getToken(), "application/json", "CreateCustomer", reqProc);
    }

    public static getRatingRequest(fromDate: string, toDate: string, stateCode: string,
        country: string, price: string, userDob: string) : JQuery.Promise3<{
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
            QuoteInformation: this.buildQuoteInfo(country, fromDate, toDate, stateCode, PlanName.AIR_TICKET_PROTECTOR, this.getTravelerList(price,userDob))
        }

        let reqPrem: models.RatingRequest = {
            ServiceRequestDetail: ApiHelper.getRequestServiceDetail(),
            QuoteInformation: this.buildQuoteInfo(country, fromDate, toDate, stateCode, PlanName.PREMIER, this.getTravelerList(price, userDob))
        }

        let reqClass: models.RatingRequest = {
            ServiceRequestDetail: ApiHelper.getRequestServiceDetail(),
            QuoteInformation: this.buildQuoteInfo(country, fromDate, toDate, stateCode, PlanName.CLASSIC_PLUS, this.getTravelerList(price, userDob))
        }

        var promises = $.when(this.getApi().getRates(ApiHelper.getToken(), "application/json", "InvokeRatingV2", reqProc),
                this.getApi().getRates(ApiHelper.getToken(), "application/json", "InvokeRatingV2", reqPrem),
                this.getApi().getRates(ApiHelper.getToken(), "application/json", "InvokeRatingV2", reqClass),
            )
        return promises;
    }

    public static buildCCInfo(fromDate: string, toDate: string,
        country: string, plan: any,
        travelerList: Array<ccModels.RequestCustomerInformationTravelerList>) :
        ccModels.RequestCustomerInformation {
            
            var custInfo: ccModels.RequestCustomerInformation = this.getStaticCustomerInfo();
            let pInfo = plan.PremiumInformation;
            custInfo.PlanName = pInfo.PlanName;
            custInfo.PlanCode = pInfo.PlanCode;
            custInfo.PlanType = "Single Trip";
            custInfo.DepartureDate = fromDate;
            custInfo.ReturnDate = toDate;
            custInfo.DepositDate = fromDate;
            custInfo.DestinationCountry = country;
            custInfo.PolicyEffectiveDate = fromDate;
            custInfo.TravelerList = travelerList;
            return custInfo;
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
            QuoteType: "New Business",
            EventName: "InvokeRatingV2",
        };
        return quoteInfo;
    }

    private static getIssueInfo() : iModels.RequestPolicyInformation {
        let iInfo : iModels.RequestPolicyInformation = {
            ProductID: "619",
            ProductNumber: "ILT",
            ProductVerNumber: "1.0",
            ProducerCode: "86201",
            OwnerId: "15",
            ProductVerID: "706",
            RoleID: '5',
            RoleName: 'Agent',
            RoleType: 'User',
            EventName: "Pay_Issue",
        }
        return iInfo;
    }

    private static getStaticCustomerInfo() : ccModels.RequestCustomerInformation {
        let custInfo : ccModels.RequestCustomerInformation = {
            ProductID: "619",
            ProductNumber: "ILT",
            ProductVerNumber: "1.0",
            ProducerCode: "86201",
            OwnerId: "15",
            ProductVerID: "706",
            QuoteType: "New Business",
            EventName: "CreateCustomer",
        }
        return custInfo;
    }
}