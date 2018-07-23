import { DefaultApi } from './solratis/api/DefaultApi';
import { Configuration } from './solratis/configuration';
import * as models from './solratis/model/models';

function getRates() {
    let configuration = new Configuration();
    configuration.accessToken = "c2y2/HIpqY56iCnJEErlrvYCC40F9tSkAU68P3mSOInrDtuTezzIv/KqOce5DfamqZf8K+MiqFTI5EnyQfxSqtMWXMveLfJ3kYOQdQgvMQMFGlvWY/rFJrfSlUrg+3qwslQ+9eo0u8XcxVOmkQdM/MxCkr5u9z3B4sfJHkY62dhW52y1R6OHvVjaf+F/Umov+S6ymdSffR+9ciIv/a17ACoQpOZRsxWjt0ly8CZbsabFDPuTIpYw4uDRTPvytCj3lDri/EdhWQ/UaG1wVb0e8T3R9aGe9YwYDpoOff++boFYCf9+T0V1nNRJovUj6kBxxJrA+AKB9sY+OVBjGN4Y8dLM/7gAUhysTcAPA8D0wUu42jdl6iiwmsj7Elh1R9OF1vmXg2sNYkS2/9HrkH10/e34j0ID0Eo7Q78Yn+nBV2UF/wR2CHAFI2bXXLr9PfKronhD2iFq4ug1BRCM3/7kTO0eIrRhyFO/wdHDMMEDRYcY7TFQIEgauysOGvJH+bPtlzoqeV1dynk+VOLvB1+v8XSsYaT/IC54Oj6Bo9DBJ0roFmInKjvNUCR9lCEgGiN4g4DccwkhZrAAocFEc+YP0UZh6i5J5MR4eJbxX40BpUyH3TcFvgsB24NBEBbf3P+DOgqH2CAEFcxJXFUYof4/PFOxKhq/L9Zq0z3pdbAV5fmrrl0pTgzUaHg1aIHKgNRa/edOKDNZGwhJq1SKo1MVJivWvAlrGRIyGIjbmNCp3FSrrl0pTgzUaHg1aIHKgNRaGvS5E7AJQtyLUsvoG7dDXS2iXV21kvApQZG3XU0Qm3lkTTGTQ6v70tSU2/BSgpeTrJ4iuTGUJzG2XajR5am79ljsNo/o1FNAU4Zw4BF+lxI0re0qEtV3evheA8j0WbEGw+1xoTlsE4GygCxwy+i74gNyuHR41Sh79cTnfC9vOC7FiqTlqh3/MWKkSIgh2YEBLUkWQnX0D25JZFyhjWk4ww==";
    let api = new DefaultApi(null, configuration);

    let srd: models.RatingRequestServiceRequestDetail = {
        ServiceRequestVersion: "1.0",
        ServiceResponseVersion: "1.0",
        OwnerId: "15",
        ResponseType: models.RatingRequestServiceRequestDetail.ResponseTypeEnum.JSON,
        RegionCode: "US",
        Token: configuration.accessToken,
        UserName: "travelagent",
        LanguageCode: "en"
    };

    let tList: models.RatingRequestQuoteInformationTravelerList[] = [{
        TravelerDOB: "02/14/1990",
        TravelCost: "2500"
    }];

    let quoteInfo: models.RatingRequestQuoteInformation = {
        DestinationCountry: "France",
        ProductID: "619",
        ProductNumber: "ILT",
        ProductVerNumber: "1.0",
        ProducerCode: "86201",
        OwnerId: "15",
        PlanName: "Air Ticket Protector",
        PlanCode: "1",
        DepartureDate: "06/25/2019",
        ReturnDate: "06/31/2019",
        DepositDate: "06/03/2019",
        ProductVerID: "706",
        //policyEffectiveDate: "06/25/2019",
        TripCancellationCoverage: "With Trip Cancellation",
        StateCode: "GA",
        QuoteType: "New Business",
        EventName: "InvokeRatingV2",
        TravelerList: tList
    };

    let req: models.RatingRequest = {
        ServiceRequestDetail: srd,
        QuoteInformation: quoteInfo
    }

    console.log(api.getRates(configuration.accessToken, "application/json", "InvokeRatingV2", req));
}

getRates();