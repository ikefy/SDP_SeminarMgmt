function createSeminar() {
    createSem();
    //createBooking();
}

function createSem() {
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://sdp-seminarmgmt.azurewebsites.net/api/seminar/",
        method: "POST",
        headers: {
            'content-type': "application/json",
            'cache-control': "no-cache",
            'postman-token': "3c3e8eed-0d1a-3c80-1bd7-40adee5a8196"
        },
        processData: false,
        data: JSON.stringify({
            "SeminarTitle": document.getElementById("semTitle").value,
            "SeminarDate": document.getElementById("semDate").value,
            "SeminarStartTime": document.getElementById("startTime").value,
            "SeminarEndTime": document.getElementById("endTime").value,
            "SeminarStatus": "SOON",
            "SemRoomID": document.getElementById("roomNum").value,
            "SemDescription": document.getElementById("semDescription").value,
            "SpeakerName": document.getElementById("speakerName").value,
            "SpeakerDescription": document.getElementById("speakerDescription").value
        })
    }).done(function (response) {
        console.log(response + "sem created");
        var scope = response;
        var scope_parse = JSON.parse(response);
        var createdSeminarID = scope_parse.SCOPE_IDENTITY;
        console.log(createdSeminarID);
        createBooking(createdSeminarID);
    });
}

function updateSeminar() {
    var semID = parent.document.URL.substring(parent.document.URL.indexOf('semID=') + 6, parent.document.URL.length);
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://sdp-seminarmgmt.azurewebsites.net/api/seminar/" + semID,
        method: "PUT",
        headers: {
            'content-type': "application/json",
            'cache-control': "no-cache",
            'postman-token': "3c3e8eed-0d1a-3c80-1bd7-40adee5a8196"
        },
        processData: false,
        data: JSON.stringify({
            "SeminarTitle": document.getElementById("semTitle").value,
            "SeminarDate": document.getElementById("semDate").value,
            "SeminarStartTime": document.getElementById("startTime").value,
            "SeminarEndTime": document.getElementById("endTime").value,
            "SeminarStatus": "SOON",
            "SemRoomID": document.getElementById("roomNum").value,
            "SemDescription": document.getElementById("semDescription").value,
            "SpeakerName": document.getElementById("speakerName").value,
            "SpeakerDescription": document.getElementById("speakerDescription").value
        })
    }).done(function (response) {
        console.log(response + "sem updated");
        updateBooking();
    });
}

function createBooking(seminarID) {
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://sdp-seminarmgmt.azurewebsites.net/api/booking",
        method: "POST",
        headers: {
            'content-type': "application/json",
            'cache-control': "no-cache",
            'postman-token': "3c3e8eed-0d1a-3c80-1bd7-40adee5a8196"
        },
        processData: false,
        data: JSON.stringify({
            "BookingStatus": "BOOKED",
            "SeminarID": seminarID,
            "RoomID": document.getElementById("roomNum").value,
            "UserID": localStorage.getItem("uid"),
            "HostID": document.getElementById("host").value
        })
    }).done(function (response) {
        console.log(response + "booking created");
    });
}

function updateBooking() {
    var semID = parent.document.URL.substring(parent.document.URL.indexOf('semID=') + 6, parent.document.URL.length);
    console.log(semID);
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://sdp-seminarmgmt.azurewebsites.net/api/booking/" + semID,
        method: "PUT",
        headers: {
            'content-type': "application/json",
            'cache-control': "no-cache",
            'postman-token': "c9b5ba62-5fd9-c261-9493-99e43a854146"
        },
        processData: false,
        data: JSON.stringify({
            "BookingStatus": "BOOKED",
            "SeminarID": semID,
            "RoomID": document.getElementById("roomNum").value,
            "UserID": localStorage.getItem("uid"),
            "HostID": document.getElementById("host").value
        })
    }).done(function (response) {
        console.log(response + "booking updated");
        console.log(document.getElementById("host").value);
        //window.open('user_seminar_detail.html' + '?semID=' + semID, '_self', false);
    });
}