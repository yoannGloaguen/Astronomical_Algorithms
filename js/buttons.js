//My buttons

//display/hide an id
function showHide(iD){
    if (document.getElementById(iD).style.display !== 'none'){
        document.getElementById(iD).style.display = 'none';
    } else{
        document.getElementById(iD).style.display = '';
    }
}
//on mouse hover planet, put every aspect non relative to it in grey
function showVariables(longitude) {
    if (screen.width > 1024) {
        if (!opt.run) {
            drawZodiac(longitude);
            opt.updated = false;
        }
    }
}
//display/hide the option panel
function optionsToShow(n){
    var count = document.getElementsByClassName('optionsToShow').length;
    for (var i = 0; i < count; i++){
        document.getElementsByClassName('optionsToShow')[i].style.display = 'none';
    }
    document.getElementsByClassName('optionsToShow')[n].style.display = 'inline';
    if (screen.width <= 1024){
        document.getElementById('hideSize').style.display = 'none';
    }
}
//put values in red and disable rendering if a bad value is put, ex: (25 for hours or -3 for minutes)
  /*  this one might be refactored  */
function validate(ID, bInit){
    var x = document.getElementById(ID), xValue = parseFloat(x.value); //parse is here to check if only numbers have been used
    var xOk = x.value;

    if(ID === 'longitude' && (xValue > 180 || xValue < -180 || (xValue != xOk))){ //!OK
        document.getElementById(ID).style.color = 'red';
        document.getElementById('validateLon').style.display = 'inline';
    } else if(ID === 'latitude' && (xValue > 90 || xValue < -90 || (xValue != xOk))){ //!OK
        document.getElementById(ID).style.color = 'red';
        document.getElementById('validateLat').style.display = 'inline';
    } else if(ID === 'sec' && (xValue > 59 || xValue < 0 || (xValue != xOk))){ //!OK
        document.getElementById(ID).style.color = 'red';
        document.getElementById('validateSec').style.display = 'inline';
    } else if(ID === 'min' && (xValue > 59 || xValue < 0 || (xValue != xOk))){ //!OK
        document.getElementById(ID).style.color = 'red';
        document.getElementById('validateMin').style.display = 'inline';
    } else if(ID === 'hour' && (xValue > 23 || xValue < 0 || (xValue != xOk))){ //!OK
        document.getElementById(ID).style.color = 'red';
        document.getElementById('validateHour').style.display = 'inline';
    } else if(ID === 'month' && (xValue > 12 || xValue < 1 || (xValue != xOk))){ //!OK
        document.getElementById(ID).style.color = 'red';
        document.getElementById('validateMonth').style.display = 'inline';
    } else if(ID === 'year' && (xValue != xOk)){ //!OK
        document.getElementById(ID).style.color = 'red';
        document.getElementById('validateYear').style.display = 'inline';
    } else { //OK
        document.getElementById(ID).style.color = '';
        if(ID === 'latitude'){ document.getElementById('validateLat').style.display = 'none'; }
        if(ID === 'longitude'){ document.getElementById('validateLon').style.display = 'none'; }
        if(ID === 'sec'){ document.getElementById('validateSec').style.display = 'none'; }
        if(ID === 'min'){ document.getElementById('validateMin').style.display = 'none'; }
        if(ID === 'hour'){ document.getElementById('validateHour').style.display = 'none'; }
        if(ID === 'month'){ document.getElementById('validateMonth').style.display = 'none'; }
        if(ID === 'year'){ document.getElementById('validateYear').style.display = 'none'; }

        var checked = checkDay();
        if ( checked === true){
            document.getElementById('day').style.color = 'red';
            document.getElementById('validateDay').style.display = 'inline';
        } else{
            document.getElementById('day').style.color = '';
            document.getElementById('validateDay').style.display = 'none';
        }
    }
    if ( !bInit
        && (document.getElementById('validateLat').style.display !== 'inline')
        && (document.getElementById('validateLon').style.display !== 'inline')
        && (document.getElementById('validateSec').style.display !== 'inline')
        && (document.getElementById('validateMin').style.display !== 'inline')
        && (document.getElementById('validateHour').style.display !== 'inline')
        && (document.getElementById('validateMonth').style.display !== 'inline')
        && (document.getElementById('validateYear').style.display !== 'inline')
        && (document.getElementById('validateDay').style.display !== 'inline')
    ){ calcZodiac();
    } else if (bInit && (ID === 'longitude')){ //we check on init that coordinates are ok
        if (
            (document.getElementById('validateLat').style.display === 'none')
            && (document.getElementById('validateLon').style.display === 'none')
        ){ calcZodiac();
        } else{ //else we return 0 to render something viable
            document.getElementById('longitude').value = '+004.80';
            document.getElementById('latitude').value = '+45.71';
            document.getElementById('longitude').style.color = '';
            document.getElementById('latitude').style.color = '';
            document.getElementById('validateLat').style.display = 'none';
            document.getElementById('validateLon').style.display = 'none';
            calcZodiac();
        }
    }
}
//verify the number of day depending month and year
function checkDay(){ //return true if !OK and false if OK
    var year = document.getElementById('year'),	yearValue = parseInt(year.value);
    var month = document.getElementById('month'), monthValue = parseInt(month.value);
    var day = document.getElementById('day'), dayValue = parseInt(day.value);
    var leap = (yearValue % 4); //0 will be a leap year
    if(day.value != dayValue || dayValue < 1
        || (((monthValue == 1) || (monthValue == 3) || (monthValue == 5) || (monthValue == 7) || (monthValue == 8) || (monthValue == 10) || (monthValue == 12)) && (dayValue > 31))
        || ((monthValue == 2) && leap != 0 && dayValue > 28)
        || ((monthValue == 2) && leap == 0 && dayValue > 29)
        || (((monthValue == 4) || (monthValue == 6) || (monthValue == 9) || (monthValue == 11)) && (dayValue > 30))){
        return true;
    } else{
        return false;
    }
}
//display/hide planets positions
function hideValues(index){
    var i;
    var astroBox = document.getElementsByClassName('astronomic')[index];
    var box = astroBox.getElementsByClassName('variablesBlocks');
    if(box[0].style.display == 'inline'){
        for(i=0; i < box.length; i++){
            box[i].style.display = '';
        }
    }else{
        for(i=0; i < box.length; i++){
            box[i].style.display = 'inline';
        }
    }
}