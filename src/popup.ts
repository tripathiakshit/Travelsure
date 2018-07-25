import * as moment from 'moment';
import * as $ from 'jquery';
//@ts-ignore
var UsaStates = require('usa-states').UsaStates;

let count = 0;

$(function () {
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    $('#url').text(tabs[0].url);
    $('#time').text(moment().format('YYYY-MM-DD HH:mm:ss'));
  });

  chrome.browserAction.setBadgeText({ text: count.toString() });
  $('#countUp').click(() => {
    chrome.browserAction.setBadgeText({ text: (++count).toString() });
  });

  $('#changeBackground').click(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        color: '#555555'
      },
        function (msg) {
          console.log("result message:", msg);
        });
    });
  });

  let select = document.getElementById("usStateSelect");
  let states = new UsaStates();
  let abbrs = states.arrayOf('a');
  let names = states.arrayOf('s');
  for (let i = 0; i < abbrs.length; i++) {
    let opt = document.createElement("option");
    opt.setAttribute('value', abbrs[i]);
    opt.innerText = names[i];
    select.appendChild(opt);
  }

  document.getElementById("userDetailForm").addEventListener("submit", function () {
    let userDob = $('#userDob').val();
    let userState = $("#usStateSelect").val();

    chrome.storage.sync.set({
      'userDob': userDob,
      'userState': userState
    });
  });
});

function submitUserDetail() {
  let form = $('#userDetail');
}
