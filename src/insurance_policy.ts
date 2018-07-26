import * as $ from 'jquery';

let selectedPlan = null;
let state = "USA";

$('#travel-country').val(state);

$('#atp-button').click((event) => {
    selectedPlan = "atp";
    console.log(selectedPlan);
    $('#page1').hide(
        "fast",
        () => {
            $('#user-info-page').show("slow");
            // Load Air Travel Protection data
        });
});

$('#premier-button').click((event) => {
    selectedPlan = "premier";
    console.log(selectedPlan);
    $('#page1').hide(
        "fast",
        () => {
            $('#user-info-page').show("slow");
            // Load Premier Plan data
        });
});

$('#classic-button').click((event) => {
    selectedPlan = "classic";
    console.log(selectedPlan);
    $('#page1').hide(
        "fast",
        () => {
            $('#user-info-page').show("slow");
            // Load classic plan trailer
        });
});

$("#userForm").submit((event) => {
    event.preventDefault();
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let address = $('#address').val();
    let city = $('#city').val();
    let zipcode = $('#zipcode').val();
    let phone = $('#phone').val();
    let email = $('#email').val();

    chrome.storage.local.set({
        'fname': fname,
        'lname': lname,
        'address': address,
        'city': city,
        'zipcode': zipcode,
        'phone': phone,
        'email': email
    }, function () {
        console.log("Saved!");
    });
});
