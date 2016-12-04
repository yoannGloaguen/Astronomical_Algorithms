//functions related to date shown on top of window

var l = {
    loadingMessage: null //message if geo localization is loading
};
/*update date on top of the small window*/
function dateValue(){
    var value = '';

    var inputs = document.getElementsByClassName('varInputs');

    for(var i = 0; i < 6; i++){
        if (i === 0){ value += day();}
        else if (i === 1){ value += month() }
        else if (i === 2 || i === 5){ value += inputs[i].value + ' '; }
        else{ value += inputs[i].value + ':'; }
    }
    document.getElementById('dateValue').value = value;
}
//return day of the week depending Julian Day
function day(){
    var today;
    var day = MyMath.trunc(ast.jD - 0.5) % 7; // 1 JD = 1day, 12h00 = JD.00 so we decrease JD by 0.5
    switch(day) {
        case 0: today = 'tuesday'; break;
        case 1: today = 'wednesday'; break;
        case 2: today = 'thursday'; break;
        case 3: today = 'friday'; break;
        case 4: today = 'saturday'; break;
        case 5: today = 'sunday'; break;
        default: today = 'monday';
    }
    return today + ', ';
}
//return month
function month(){
    var day = document.getElementById('day').value;
    var add = day;

    switch(day) {
        case '1': add += 'st '; break;
        case '2': add += 'nd '; break;
        case '3': add += 'rd '; break;
        default: add += 'th ';
    }

    var month = document.getElementById('month').value;
    switch(month) {
        case '1': month = 'january ' + add; break;
        case '2': month = 'february ' + add; break;
        case '3': month = 'march ' + add; break;
        case '4': month = 'april ' + add; break;
        case '5': month = 'may ' + add; break;
        case '6': month = 'june ' + add; break;
        case '7': month = 'july ' + add; break;
        case '8': month = 'august ' + add; break;
        case '9': month = 'september ' + add; break;
        case '10': month = 'october ' + add; break;
        case '11': month = 'november ' + add; break;
        default: month = 'december ' + add;
    }
    return month;
}
//update date when we click on 'now' button
function dateNow(){
    var d = new Date();
    document.getElementById('day').value = d.getUTCDate();
    document.getElementById('month').value =  d.getUTCMonth() + 1;
    document.getElementById('year').value = d.getUTCFullYear();
    document.getElementById('hour').value = d.getUTCHours();
    document.getElementById('min').value = d.getUTCMinutes();
    document.getElementById('sec').value = d.getUTCSeconds();

    validate('latitude', true); //inside buttons
    validate('longitude', true);
    var inputs = document.getElementsByClassName('varInputs');
    for (var i = 0; i < inputs.length; i++){ inputs[i].style.color = '';} //we return correct color
    var message = document.getElementsByClassName('message');
    for (i = 0; i < message.length; i++){ message[i].style.display = '';} //we hide messages
}
//return geo localization
  /* Need to be modified because loading keep playing if geo localization is refused or disabled */
function localPositions(){
    loading(); //we advise that geolocation is loading
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } else {
        loaded(); //we hide loading div
        document.getElementById('loading').style.display = 'inline';
        document.getElementById('loadingMessage').innerHTML = 'geolocation, is not enabled in your browser.';
    }
    function successFunction(position) {
        document.getElementById('latitude').value = Math.round(position.coords.latitude * 100)/100;
        document.getElementById('longitude').value = Math.round(position.coords.longitude* 100)/100;
        validate('latitude', false);
        validate('longitude', false);
        loaded(); //we hide loading div
    }
    function errorFunction() {
        loaded(); //we hide loading div
        document.getElementById('loading').style.display = 'inline';
        document.getElementById('loadingMessage').innerHTML = 'failed to return geolocation';
    }
}
//small function to display loading message
function loading(){
    document.getElementById('loadingMessage').innerHTML = 'loading coordinates';
    l.loadingMessage = setInterval(load, 500);
    document.getElementById('loading').style.display = 'inline';
}
//hide loading message
function loaded(){
    document.getElementById('loadingMessage').innerHTML = 'loading coordinates';
    document.getElementById('loading').style.display = 'none';
    clearInterval(l.loadingMessage);
}
//loading main function
function load(){
    document.getElementById('loadingMessage').innerHTML += '.';
    if (document.getElementById('loadingMessage').innerHTML === 'loading coordinates....'){
        document.getElementById('loadingMessage').innerHTML = 'loading coordinates';
    }
}