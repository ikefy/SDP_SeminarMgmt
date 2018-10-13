function searchsem1() {
    console.log("start searchsem()");
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/seminar/",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "3f79c459-fd65-db7e-5d1a-f66cc2ff2cbf"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        var seminars = response;
        var seminar_parse = JSON.parse(seminars);
        setsemtblvalues(seminar_parse.length, seminar_parse);
    });
}

function searchsem2(month) {
    console.log("start searchsem()");
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdp-seminarmgmt.azurewebsites.net/api/seminar/daterange/" + month,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "3f79c459-fd65-db7e-5d1a-f66cc2ff2cbf"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        var seminars = response;
        var seminar_parse = JSON.parse(seminars);
        var seminar_length = seminar_parse.length;
        setsemtblvalues(seminar_parse.length, seminar_parse);
    });
}

function setsemtblvalues(x, seminars) {
    console.log(seminars);
    console.log(seminars[0]);
    console.log(seminars[0].RoomID);
    console.log(seminars.length);
    cleartbl();
    createtbl(x);
    setsemtblCells(seminars);
}

function cleartbl() {
    var table = document.getElementById("semtbl");
    var rows = document.getElementById("semtbl").getElementsByTagName("tr").length;
    console.log(rows);
    for (var i = 1; i < rows; i++) {
        table.deleteRow(1);
    }
}

function createtbl(x) {
    console.log("cleartbl");
    for (var i = 0; i < x; i++) {
        //var x = document.getElementById("semtbl").rows[i + 1].cells;
        //x[0].innerHTML = ".";
        //x[1].innerHTML = ".";
        //x[2].innerHTML = ".";
        //x[3].innerHTML = ".";
        var table = document.getElementById("semtbl");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell1 = row.insertCell(2);
        var cell2 = row.insertCell(3);
    }
}

function setsemtblCells(seminars) {
    console.log("settbl");
    for (var i = 0; i < seminars.length; i++) {
        var x = document.getElementById("semtbl").rows[i + 1].cells;
        x[0].innerHTML = seminars[i].SeminarID;
        //var y = document.getElementById(i);
        //y.value = seminar_parse[i].SeminarID;
        x[1].innerHTML = seminars[i].SeminarTitle;
        x[2].innerHTML = seminars[i].RoomNumber;
        x[3].innerHTML = seminars[i].SeminarDate;
    }
}