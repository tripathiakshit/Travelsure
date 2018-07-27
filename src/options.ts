import * as $ from 'jquery';

// Saves options to chrome.storage.sync.
function clearSettings() {
  chrome.storage.local.clear();
  window.close();
}
$('#save').click(clearSettings);
