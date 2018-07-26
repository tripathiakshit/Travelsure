import * as $ from 'jquery';
import { TravelerInfo } from './solratis/model/TravelerInfo';
import * as ccType from 'credit-card-type';
import { PaymentInfo } from './solratis/model/PaymentInfo';
//@ts-ignore
var UsaStates = require('usa-states').UsaStates;

let selectedPlan = null;
let state = "USA";

$('#travel-country').val(state);

$('#atp-button').click((event) => {
    selectedPlan = "atp";
    console.log(selectedPlan);
    $('#package-select-page').hide(
        "fast",
        () => {
            $('#user-info-page').show("slow");
            // Load Air Travel Protection data
        });
});

$('#premier-button').click((event) => {
    selectedPlan = "premier";
    console.log(selectedPlan);
    $('#package-select-page').hide(
        "fast",
        () => {
            $('#user-info-page').show("slow");
            // Load Premier Plan data
        });
});

$('#classic-button').click((event) => {
    selectedPlan = "classic";
    console.log(selectedPlan);
    $('#package-select-page').hide(
        "fast",
        () => {
            $('#user-info-page').show("slow");
            // Load classic plan trailer
        });
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
    });

    // TODO: Add state and statecode and send object to localstorage
    let travelerInfo: TravelerInfo = {
        TravelerDob: travelerDob,
        FirstName: fname,
        LastName: lname,
        AddressLine1: address,
        City: city,
        // State: usStates.states.get(travelerState),
        // StateCode: travelerState,
        // Country: state,
        ZipCode: zipcode,
        Phone: phone,
        Email: email
    };

    // chrome.storage.local.set({
    //     'travelerInfo': travelerInfo
    // }, function () {
    //     console.log("Saved travel info!");
    // });

    console.log(travelerInfo);

    $("#user-info-page").hide(
        "fast",
        () => {
            $("#payment-info-page").show("fast");
        }
    );
});

$('#paymentForm').submit((event) => {
    event.preventDefault();

    let cNumber = <number>$('#cNumber').val();
    let cName = <string>$('#cName').val();
    let cExp = <string>$('#cExp').val();
    let cMonth = <number>$('#cMonth').val();
    let cYear = <number>$('#cYear').val();
    let cvc = <number>$('#cvc').val();

    let cardType = ccType(cNumber.toString());

    let paymentInfo: PaymentInfo = {
        CardNumber: cNumber,
        CardName: cName,
        ExpiryMonth: cMonth,
        ExpiryYear: cYear,
        Cvc: cvc
    };

    console.log(paymentInfo);
});

$('#userFormBackButton').click((event) => {
    $('#user-info-page').hide(
        "fast",
        () => {
            $('#package-select-page').show("slow");
            // Load classic plan trailer
        });
});

/* TODO:
    - Add a blur listener to CC Expiry to format and extract date
    - Fetch DOB and State code from localStorage
    - Use ccType class to validate credit card number and get credit card type
    - use statecode and UsaStates to get state, statecode and country
*/
