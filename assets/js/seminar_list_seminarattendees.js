function getAttendees(SeminarID) {
    console.log(SeminarID);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/seminar/" + SeminarID + "/attendees",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "481f3c97-846c-8bc1-e812-ba8d0bd6e7e5"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        var attendees = response;
        var attendees_parse = JSON.parse(attendees);
        setattendeetblvalues(attendees_parse.length, attendees_parse);
    });
}

function setattendeetblvalues(y, attendees) {
    console.log(attendees);
    console.log(attendees[0]);
    console.log(attendees[0].AttendeeFirstName);
    console.log(attendees.length);
    clearattendeetbl();
    createattendeetbl(y);
    setattendeetblCells(attendees);
}

function clearattendeetbl() {
    var table = document.getElementById("attendeetbl");
    var rows = document.getElementById("attendeetbl").getElementsByTagName("tr").length;
    console.log(rows);
    for (var i = 1; i < rows; i++) {
        table.deleteRow(1);
    }
}

function createattendeetbl(y) {
    console.log("clearattendeetbl");
    for (var i = 0; i < y; i++) {
        var table = document.getElementById("attendeetbl");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
    }
}

function setattendeetblCells(attendees) {
    console.log("setattendeetbl");
    for (var i = 0; i < attendees.length; i++) {
        var y = document.getElementById("attendeetbl").rows[i + 1].cells;
        y[0].innerHTML = attendees[i].AttendeeID;
        //var y = document.getElementById(i);
        //y.value = seminar_parse[i].SeminarID;
        y[1].innerHTML = attendees[i].AttendeeFirstName + " " + attendees[i].AttendeeLastName;
        y[2].innerHTML = attendees[i].AttendeeEmailAddress;
        y[3].innerHTML = attendees[i].AttendeePhoneNumber;
        y[4].innerHTML = attendees[i].RegStatus;
        document.getElementById("attendeeCount").innerHTML = i+1;
    }
    var x = document.getElementById("attendeetblheader").rows[0].cells;
    x[0].innerHTML = attendees[0].SeminarTitle;
}

function registerAttendee() {
    var semID = parent.document.URL.substring(parent.document.URL.indexOf('semID=') + 6, parent.document.URL.length);
    var uid = localStorage.uid;
    checkAttendee(semID, uid);
}

function setAttending() {
    var semID = parent.document.URL.substring(parent.document.URL.indexOf('semID=') + 6, parent.document.URL.length);
    var uid = localStorage.uid;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/registration/" + uid + "/" + semID,
        "method": "PUT",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "45a21b0d-8878-3ab7-34af-5365f81b6044"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function checkAttendee(semID, uid) {
    console.log();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/seminar/" + semID + "/attendees",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "481f3c97-846c-8bc1-e812-ba8d0bd6e7e5"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        var attendees = response;
        var attendees_parse = JSON.parse(attendees);
        var count = 0;
        for (var i = 0; i < attendees_parse.length; i++){
            if (attendees_parse[i].AttendeeID == uid && attendees_parse[i].SeminarID == semID) {
                count++;
            }
        }
        if (count == 0) {
            createAttendee();
        }
    });
}

function setStatus() {
    console.log();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/seminar/" + semID + "/attendees",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "481f3c97-846c-8bc1-e812-ba8d0bd6e7e5"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        var attendees = response;
        var attendees_parse = JSON.parse(attendees);
        var count = 0;
        for (var i = 0; i < attendees_parse.length; i++) {
            if (attendees_parse[i].AttendeeID == uid && attendees_parse[i].SeminarID == semID) {
                count++;
            }
        }
        if (count == 0) {
            
        }
        else {

        }
    });
}

function createAttendee() {
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://sdp-seminarmgmt.azurewebsites.net/api/registration",
        method: "POST",
        headers: {
            'content-type': "application/json",
            'cache-control': "no-cache",
            'postman-token': "3c3e8eed-0d1a-3c80-1bd7-40adee5a8196"
        },
        processData: false,
        data: JSON.stringify({
            "DateRegistered": "2018-10-18",
            "RegAttendeeID": localStorage.uid,
            "RegSeminarID": parent.document.URL.substring(parent.document.URL.indexOf('semID=') + 6, parent.document.URL.length),
            "RegStatus": "Registered",
        })
    }).done(function (response) {
        console.log(response + "registered");
    });
}