function user_login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username + password);
    getUser(username, password);
}

function pageLoad() {
    document.getElementById("user").innerHTML = localStorage.u;
}

function updatePageLoad() {
    pageLoad();
    var semID = parent.document.URL.substring(parent.document.URL.indexOf('semID=') + 6, parent.document.URL.length);
    getUpdateDetails(semID);
}

function user_logout() {
    localStorage.removeItem("uid");
    localStorage.removeItem("u");
    localStorage.removeItem("p");
    window.open('index.html', '_self', false);
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
        console.log("  " + localStorage.uid + localStorage.u + localStorage.p);
        //uid = login_parse.UserID;
        if (login_parse.UserID != null)
            userLogin_btn();
        else {
            window.alert("wrong login");
            console.log("wrong Login");
        }
    });
}

function userLogin_btn() {
    console.log("XX");
    window.open('user_home.html', '_self', false);
}

function attendee_login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log(username + password);
    getAttendee(username, password);
}

function getAttendee(username, password) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/attendees/" + username + '/' + password,
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
        localStorage.setItem("uid", login_parse.AttendeeID);
        localStorage.setItem("u", login_parse.AttendeeFirstName);
        localStorage.setItem("p", login_parse.AttendeeLastName);
        console.log("  " + localStorage.uid + localStorage.u + localStorage.p);
        //uid = login_parse.UserID;
        if (login_parse.AttendeeID != null)
            attendeeLogin_btn();
        else {
            console.log("wrong Login");
            window.alert("wrong login");
        }
    });
}

function attendeeLogin_btn() {
    window.open('attendee_home.html', '_self', false);
}

function updateEmail() {

}