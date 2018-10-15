function createSeminar() {
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://sdp-seminarmgmt.azurewebsites.net/api/attendees",
        method: "POST",
        headers: {
            'content-type': "application/json",
            'cache-control': "no-cache",
            'postman-token': "3c3e8eed-0d1a-3c80-1bd7-40adee5a8196"
        },
        processData: false,
        data: JSON.stringify({
            "AttendeeFirstName": document.getElementById("firstName").value,
            "AttendeeLastName": document.getElementById("lastName").value,
            "AttendeeEmailAddress": document.getElementById("email").value,
            "AttendeeDateOfBirth": document.getElementById("dob").value,
            "AttendeePhoneNumber": document.getElementById("phone").value,
            "AttendeeGender": document.getElementById("gender").value
        })
    }).done(function (response) {
        console.log(response);
    });
}