import * as $ from 'jquery';
import { TravelerInfo } from './solratis/model/TravelerInfo';
import * as ccType from 'credit-card-type';
import { PaymentInfo } from './solratis/model/PaymentInfo';
import { PlanName } from './solratis/plan_names';
//@ts-ignore
var UsaStates = require('usa-states').UsaStates;

let selectedPlan = null;
chrome.browserAction.setBadgeText({ text: '' });
chrome.storage.local.get(['protector', 'premier', 'classic', 'country'], function (result) {
    console.log(result.protector);
    if (!result.protector) {
        $("#package-select-page").hide(
            "fast",
            () => {
                $("#blank-page").show("fast");
            });
        return;
    }
    $('#travel-country').text(result.country);
    $('#air-ticket-protector-rate').text('$' + getGrossPremium(result.protector));
    $('#premier-rate').text('$' + getGrossPremium(result.premier));
    $('#classic-rate').text('$' + getGrossPremium(result.classic));
});


function getGrossPremium(plan: any): any {
    return plan.PremiumInformation.TotalGrossPremium;
}

function loadPlanInfo() {
    chrome.storage.local.get([selectedPlan], function (result) {
        let info = result[selectedPlan].CoverageInformation;
        let body: any = document.getElementById("table-body");
        info.forEach(element => {
            let row = body.insertRow();
            row.insertCell().innerText = element.CoverageName;
            row.insertCell().innerText = element.CoverageLimit;
        });
    });

    $('#plan-info-page').show("slow");
}

$('#plan-info-next-button').click((e) => {
    $('#plan-info-page').hide("fast", () => {
        $('#user-info-page').show("slow");
    });
});

$('#plan-info-back-button').click((e) => {
    $('#plan-info-page').hide("fast", () => {
        $('package-select-page').show("slow");
    });
});

$('#atp-button').click((event) => {
    selectedPlan = "protector";
    console.log(selectedPlan);
    $('#package-select-page').hide("fast", () => loadPlanInfo());
});

$('#premier-button').click((event) => {
    selectedPlan = "premier";
    console.log(selectedPlan);
    $('#package-select-page').hide("fast", () => loadPlanInfo());
});

$('#classic-button').click((event) => {
    selectedPlan = "classic";
    console.log(selectedPlan);
    $('#package-select-page').hide("fast", () => loadPlanInfo());
});

$("#userForm").submit((event) => {
    event.preventDefault();
    let fname = <string>$('#fname').val();
    let lname = <string>$('#lname').val();
    let address = <string>$('#address').val();
    let city = <string>$('#city').val();
    let zipcode = <string>$('#zipcode').val();
    let phone = <string>$('#phone').val();
    let email = <string>$('#email').val();

    let travelerDob, travelerState;
    let usStates = new UsaStates();

    chrome.storage.local.get(['userDob', 'userState'], (items) => {
        travelerDob = items.userDob;
        let index = usStates.arrayOf('a').indexOf(items.userState);
        // TODO: Add state and statecode and send object to localstorage
        let travelerInfo: TravelerInfo = {
            TravelerDob: travelerDob,
            FirstName: fname,
            LastName: lname,
            AddressLine1: address,
            City: city,
            State: usStates.arrayOf('names')[index],
            StateCode: items.userState,
            Country: 'US',
            ZipCode: zipcode,
            Phone: phone,
            Email: email
        };
        chrome.runtime.sendMessage({
            'createCustomer': 'action',
            'travelInfo': travelerInfo,
            'plan': selectedPlan
        }, function (result) {
            $("#user-info-page").hide(
                "fast",
                () => {
                    $("#payment-info-page").show("fast");
                });
        });
    });
});

$('#paymentForm').submit((event) => {
    event.preventDefault();

    let cNumber = <string>$('#cNumber').val();
    let cName = <string>$('#cName').val();
    let cMonth = <string>$('#cMonth').val();
    let cYear = <string>$('#cYear').val();
    let cvc = <string>$('#cvc').val();

    let cardType = ccType(cNumber.toString())[0].type;

    if (cardType == 'master-card') {
        cardType = 'MasterCard';
    } else if (cardType = 'visa') {
        cardType = 'Visa';
    }

    let paymentInfo: PaymentInfo = {
        CardNumber: cNumber,
        CardName: cName,
        CardType: cardType,
        ExpiryMonth: cMonth,
        ExpiryYear: cYear,
        Cvc: cvc
    };
    chrome.runtime.sendMessage({
        'issuePolicy': 'action',
        'paymentInfo': paymentInfo
    });
    window.close();
});

$('#userFormBackButton').click((event) => {
    $('#user-info-page').hide(
        "fast",
        () => {
            $('#package-select-page').show("slow");
            (<HTMLFormElement>$("#userForm")[0]).reset();
        });
});

$('#paymentFormBackButton').click((event) => {
    $('#payment-info-page').hide(
        "fast",
        () => {
            $('#cExp').val("");
            $('#cvc').val("");
            $('#user-info-page').show("slow");
        });
});

/* TODO:
    - Add a blur listener to CC Expiry to format and extract date
    - Use ccType class to validate credit card number and get credit card type
*/
