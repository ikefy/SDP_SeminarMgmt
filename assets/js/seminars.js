function jcquery(searchname) {
    inputtxt.value = "";
    console.log(searchname);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://sdpseminarmgmt.azurewebsites.net/" + searchname,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "78e3eb68-7982-58f5-1470-943cca576ee9"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        var usr = response;
        var usrparse = JSON.parse(usr);
        console.log(usrparse.ID);
        settblValues(usrparse);
    });
}