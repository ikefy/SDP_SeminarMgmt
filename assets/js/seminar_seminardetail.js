var semID = "";

function onload() {
    var semID = parent.document.URL.substring(parent.document.URL.indexOf('semID=') + 6, parent.document.URL.length);
    getSeminarDetails(semID);
    getAttendees(semID);
    pageLoad();
}

function onloadAttendee() {
    var semID = parent.document.URL.substring(parent.document.URL.indexOf('semID=') + 6, parent.document.URL.length);
    getSeminarDetails(semID);
    getAttendees(semID);
    pageLoad();
    setStatus();
}

function update() {
    var semID = parent.document.URL.substring(parent.document.URL.indexOf('semID=') + 6, parent.document.URL.length);
    console.log("update" + semID);
    window.open('user_update_seminar.html' + '?semID=' + semID, '_self', false);
}

function deleteSem() {
    var semID = parent.document.URL.substring(parent.document.URL.indexOf('semID=') + 6, parent.document.URL.length);
    console.log(semID);
    deleteBooking(semID);
    
}

function deleteBooking(seminarID) {
    console.log(seminarID);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/booking/" + seminarID,
        "method": "DELETE",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "770f2ff6-2936-7cfd-a521-aa8967e9a085"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        deleteSeminar(seminarID);
    });
}

function deleteSeminar(SeminarID) {
    console.log(SeminarID);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/seminar/" + SeminarID,
        "method": "DELETE",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "47c4a70c-83ce-07ca-361c-6b456c9f3cf2"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        window.open('user_seminar_list.html', '_self', false);
    });
}

function showSeminarDetail(SeminarID) {
    window.open('user_seminar_detail.html' + '?semID=' + SeminarID, '_self', false);
}

function showAttendeeSeminarDetail(SeminarID) {
    window.open('attendee_seminar_detail.html' + '?semID=' + SeminarID, '_self', false);
}

function getUpdateDetails(SeminarID) {
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
        document.getElementById("semTitle").value = seminar_parse.SeminarTitle;
        document.getElementById("semDate").value = seminar_parse.SeminarDate;
        document.getElementById("startTime").value = seminar_parse.SeminarStartTime;
        document.getElementById("endTime").value = seminar_parse.SeminarEndTime;
        document.getElementById("semDescription").innerHTML = seminar_parse.SemDescription;
        document.getElementById("speakerName").innerHTML = seminar_parse.SpeakerName;
        document.getElementById("speakerDescription").innerHTML = seminar_parse.SpeakerDescription;
    });
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
        getRoomNumber(seminar_parse.SemRoomID);
        getBooking(seminar_parse.SeminarID);
        setPageValues(seminar_parse);
    });
}

function getRoomNumber(roomID) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/room/" + roomID,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "f004739d-45dc-9ee3-183a-61c9851ff4db"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        var room = response;
        var room_parse = JSON.parse(room);
        document.getElementById("semVenue").innerHTML = room_parse.RoomNumber;
    });
}

function getBooking(seminarID) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/booking/" + seminarID,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "f004739d-45dc-9ee3-183a-61c9851ff4db"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        var booking = response;
        var booking_parse = JSON.parse(booking);
        getSemUser(booking_parse.UserID);
        getSemHost(booking_parse.HostID);
    });
}

function getSemUser(userID) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/user/" + userID,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "f004739d-45dc-9ee3-183a-61c9851ff4db"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        var user = response;
        var user_parse = JSON.parse(user);
        document.getElementById("semOrganiser").innerHTML = user_parse.UserFirstName + ' ' + user_parse.UserLastName;
    });
}

function getSemHost(userID) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/user/" + userID,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "f004739d-45dc-9ee3-183a-61c9851ff4db"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        var user = response;
        var user_parse = JSON.parse(user);
        document.getElementById("host").innerHTML = user_parse.UserFirstName + ' ' + user_parse.UserLastName;
    });
}

function setPageValues(seminar) {
    document.getElementById("semTitle").innerHTML = seminar.SeminarTitle;
    document.getElementById("semDate").innerHTML = seminar.SeminarDate + '<br>' + seminar.SeminarStartTime + ' to ' + seminar.SeminarEndTime;
    document.getElementById("speakerDescription").innerHTML = seminar.SpeakerName + '<br>' + seminar.SpeakerDescription;
}