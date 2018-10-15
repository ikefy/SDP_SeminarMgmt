var semID = "";

function onload() {
    var semID = parent.document.URL.substring(parent.document.URL.indexOf('semID=') + 6, parent.document.URL.length);
    getSeminarDetails(semID);
    getAttendees(semID);
}

function showSeminarDetail(SeminarID) {
    window.open('seminar_detail.html'+'?semID='+ SeminarID, '_self', false);
}

function getSeminarDetails(SeminarID) {
    console.log(SeminarID);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/seminar/" + SeminarID,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "f004739d-45dc-9ee3-183a-61c9851ff4db"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        var seminar = response;
        var seminar_parse = JSON.parse(seminar);
        var seminar_length = seminar_parse.length;
        setPageValues(seminar_parse);
    });
}

function setPageValues(seminar) {
    document.getElementById("semTitle").innerHTML = seminar.SeminarTitle;
    document.getElementById("semDate").innerHTML = seminar.SeminarDate + '<br>' + seminar.SeminarStartTime + ' to ' + seminar.SeminarEndTime;
    document.getElementById("semDescription").innerHTML = seminar.SemDescription;
    document.getElementById("semVenue").innerHTML = seminar.SemRoomID;
}