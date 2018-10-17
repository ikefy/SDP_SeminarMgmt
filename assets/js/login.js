function user_login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username + password);
    getUser(username, password);
}

function getUser(username, password) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/user/login/" + username + '/' + password,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "e31e4af7-acff-ceed-5940-10518ff97c3d"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        var login_json = response;
        var login_parse = JSON.parse(login_json);
        localStorage.setItem("uid", login_parse.UserID);
        localStorage.setItem("u", login_parse.UserLogin);
        localStorage.setItem("p", login_parse.UserPassword);
        console.log(localStorage.uid + localStorage.u + localStorage.p);
        //uid = login_parse.UserID;
        if (login_parse.UserID != null)
            userLogin_btn();
        else
            console.log("wrong Login");
    });
}

function userLogin_btn() {
    console.log("XX");

}