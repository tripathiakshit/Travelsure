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
            $('#page2').show("fast", "slide");
            // Load Air Travel Protection data
        });
});

$('#premier-button').click((event) => {
    selectedPlan = "premier";
    console.log(selectedPlan);
    $('#page1').hide(
        "fast",
        () => {
            $('#page2').show("fast", "slide");
            // Load Premier Plan data
        });
});

$('#classic-button').click((event) => {
    selectedPlan = "classic";
    console.log(selectedPlan);
    $('#page1').hide(
        "fast",
        () => {
            $('#page2').show("fast", "slide");
            // Load classic plan trailer
        });
});
