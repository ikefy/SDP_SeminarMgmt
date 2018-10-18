function createSeminar() {
    createSem();
    createBooking();
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
    });
}

function createBooking() {
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
            "SeminarID": document.getElementById("semDate").value,
            "RoomID": document.getElementById("roomNum").value,
            "UserID": document.getElementById("endTime").value,
            "HostID": document.getElementById("endTime").value
        })
    }).done(function (response) {
        console.log(response + "booking created");
    });
}