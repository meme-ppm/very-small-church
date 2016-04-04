"use strict";
//very fast and simple script
$(document).on('ready', function(e) {

    var dialog = document.querySelector('dialog');
    if(dialog){
        if (! dialog.showModal) {
          dialogPolyfill.registerDialog(dialog);
        }
        $('.show-dialog').on('click', function(e) {
          dialog.showModal();
        });
        $('.close-dialog').on('click', function(e) {
          dialog.close();
        });
    }
});
