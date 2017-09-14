// Enables displaying of server errors on the main window in host/join game forms
require('electron').ipcRenderer.on('server-error', (event, message) => {
    // Put the error message into an alert box on the main window page
    if(message) {
        $('#error-card').html(`<div class="card-block" id="error-message">${message}</div>`);
    }
    $('button').attr('disabled', false);
});