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
        var cell1 = row.insertCell(2);
        var cell2 = row.insertCell(3);
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
    }
    var x = document.getElementById("attendeetblheader").rows[0].cells;
    x[0].innerHTML = attendees[0].SeminarTitle;
}