function user_login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username + password);
}

function getUsers() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/user",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "e31e4af7-acff-ceed-5940-10518ff97c3d"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}