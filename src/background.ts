import { DefaultApi } from './solratis/api/DefaultApi';
import { Configuration } from './solratis/configuration';
import * as models from './solratis/model/models';
import * as airports from 'airport-codes';
import { ApiHelper } from './solratis/api_helper';

function getRates(fromDate: string, toDate: string, country: string, price: string): JQueryPromise<{ response: JQueryXHR; body: models.RatingSuccessResponse;  }> {
    
    let api = ApiHelper.getApi();

    let quoteInfo: models.RatingRequestQuoteInformation = {
        DestinationCountry: country,
        ProductID: "619",
        ProductNumber: "ILT",
        ProductVerNumber: "1.0",
        ProducerCode: "86201",
        OwnerId: "15",
        PlanName: "Air Ticket Protector",
        PlanCode: "1",
        DepartureDate: fromDate,
        ReturnDate: toDate,
        DepositDate: fromDate,
        ProductVerID: "706",
        TripCancellationCoverage: "With Trip Cancellation",
        StateCode: "GA",
        QuoteType: "New Business",
        EventName: "InvokeRatingV2",
        TravelerList: ApiHelper.getTravelerList(price)
    };

    let req: models.RatingRequest = {
        ServiceRequestDetail: ApiHelper.getRequestServiceDetail(),
        QuoteInformation: quoteInfo
    }
    return api.getRates(ApiHelper.getToken(), "application/json", "InvokeRatingV2", req);
}

function getDate(date: string) : string {
    let dateSplit = date.split("-");
    return dateSplit[1] + "/" + dateSplit[2] + "/" + dateSplit[0];
}


chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
        const regex = /https:\/\/www\.google\.com\/flights#flt=[A-Z]{3}\.([A-Z]{3}).(\d{4}-\d{2}-\d{2})[^\*]+\*[A-Z]{3}\.[A-Z]{3}.(\d{4}-\d{2}-\d{2}).*\*\.[A-Z]{3}\.(\d+)/gm;
      // read changeInfo data and do something with it (like read the url)
      if (changeInfo.url && changeInfo.url.match(regex)) {
          let m, fromDate, toDate, country, price;
          while ((m = regex.exec(changeInfo.url)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            m.forEach((match, groupIndex) => {
                switch(groupIndex) {
                    case 1:
                        country = airports.findWhere({ iata: match }).get('country');
                        break;
                    case 2:
                        fromDate = getDate(match);
                        break;
                    case 3:
                        toDate = getDate(match);
                        break;
                    case 4:
                        price = (parseFloat(match)/100).toFixed(2);
                        break;
                }
            });
          }
          getRates(fromDate, toDate, country, price).then((response, body) => {
              console.log(body);
          });
      }
    }
);
