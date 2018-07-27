import * as $ from 'jquery';
//@ts-ignore
var UsaStates = require('usa-states').UsaStates;

chrome.storage.local.get(['userDob', 'userState'], function (result) {
  if (result.userDob && result.userState) {
    window.location.href = "insurance_policy.html";
  } else {
    let states = new UsaStates();
    let select = document.getElementById("usStateSelect");
    let abbrs = states.arrayOf('a');
    let names = states.arrayOf('s');

    for (let i = 0; i < abbrs.length; i++) {
      let opt = document.createElement("option");
      opt.setAttribute('value', abbrs[i]);
      opt.innerText = names[i];
      select.appendChild(opt);
    }
    $("#userDetailForm").submit(function (event) {
      event.preventDefault();
      let inputDob = <string>$('#userDob').val();

      // Default date format is YYYY-MM-DD
      let temp = inputDob.split('-');
      let userDob = temp[1] + "/" + temp[2] + "/" + temp[0];
      let userState = <string>$("#usStateSelect").val();
      chrome.storage.local.set({
        'userDob': userDob,
        'userState': userState
      }, function () {
        window.close();
      });
    });
  }
});
