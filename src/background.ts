import { DefaultApi } from './solratis/api/DefaultApi';
import { Configuration } from './solratis/configuration';
import * as models from './solratis/model/models';
import * as airports from 'airport-codes';
import { ApiHelper } from './solratis/api_helper';

function getDate(date: string) : string {
    let dateSplit = date.split("-");
    return dateSplit[1] + "/" + dateSplit[2] + "/" + dateSplit[0];
}

function sendMessage(policies: any, country: string) {
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
    chrome.browserAction.setBadgeText({text: 'NEW'});
    console.log(policies);
    chrome.storage.local.set({
        'protector': policies.protector,
        'premier' : policies.premier,
        'classic' : policies.classic,
        'country' : country
    }, function() {
        console.log('Value is stored!');
    });

    chrome.storage.local.get(['protector', 'premier', 'classic'], function(result) {
    });
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
          chrome.storage.local.set({
              'country' : country,
              'fromDate' : fromDate,
              'toDate' : toDate,
              'price' : price
          }, function() {
            chrome.storage.local.get(['userDob', 'userState'], function(result) {
                ApiHelper.getRatingRequest(fromDate, toDate, result.userState, country, price, result.userDob)
                .then((result1, result2, result3) => {
                    let policies: any = {
                        'protector' : result1[1], 
                        'premier' : result2[1],
                        'classic' : result3[1]
                      }
                      sendMessage(policies, country);
                });
              });
          });
          
          
      }
    }
);
