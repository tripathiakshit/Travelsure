import { DefaultApi } from './solratis/api/DefaultApi';
import { Configuration } from './solratis/configuration';
import * as models from './solratis/model/models';
import * as airports from 'airport-codes';
import { ApiHelper } from './solratis/api_helper';

function getRates(fromDate: string, toDate: string, country: string, price: string): any {
    return ApiHelper.getRatingRequest(fromDate, toDate, "GA", country, price);
}

function getDate(date: string) : string {
    let dateSplit = date.split("-");
    return dateSplit[1] + "/" + dateSplit[2] + "/" + dateSplit[0];
}

function sendMessage(policies : any[]) {
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
    chrome.browserAction.setBadgeText({text: 'NEW'});
    // chrome.storage.local.set({'policies': policies}, function() {
    //     console.log('Value is set to ' + policies);
    // });
    // chrome.storage.local.get(['policies'], function(result) {
    //     console.log('Value currently is ' + result.key);
    // });
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
          ApiHelper.getRatingRequest(fromDate, toDate, "GA", country, price)
          .then((result1, result2, result3) => {
              let policies: any[] = [result1, result2, result3];
              sendMessage(policies);
          });
      }
    }
);
