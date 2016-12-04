//Useful functions to convert angles and values

var MyMath = {
    //change an angle from degree to radiant
    degToRad: function(x){
        x = x * (Math.PI / 180);
        return x;
    },
    //change an angle from radiant to degree
    radToDeg: function(x){
        x = 180 * (x / Math.PI);
        return x;
    },
    //change an angle > 360° or < 0 to a 360° angle
    fixDeg: function(x){
        x = (x / 360); x = (x % 1) ; x = 1 + x; x = (x % 1) ; x = x  * 360;
        return x;
    },
    //change an angle > 360° or < 0 to radiant
    fixRad: function(x){
        x = this.fixDeg(x) * (Math.PI / 180);
        return x;
    },
    //convert date into julian days (page 60)
    dateToJd: function (year, month, day, hour, min, sec){
        var jD;
        var a, b;
        var d = day + hour / 24 + min / 1400 + sec / 86400;

        if (month < 3){
            year = year - 1;
            month = month + 12;
        }
        a = (year/100); a = Math.floor(a);
        b = (a/4); b = Math.floor(b); b = 2 - a + Math.floor(b);
        month = (month+1) * 30.6001;
        jD = 365.25 * (year + 4716); jD = Math.floor(jD) + Math.floor(month) + d + b - 1524.5;

        return jD;
    },
    //take the julian day value and convert it to centuries
    jdToCent: function(jD){
        return (jD - 2451545) / 36525;
    },
    //truncate numbers
    trunc: function(x){
        if(x > 0)
        {
            return Math.floor(x);
        }
        else
        {
            return Math.ceil(x);
        }
    },
    //take an angle 360° and return it as degrees min and secs x°y'w'' if bool = false show only degrees
    dMS: function(x, bool){
        var xDeg = x;
        var degRound = Math.round(xDeg);
        var deg = this.trunc(xDeg);
        var xMin = (xDeg % 1) * 60;
        var min = Math.abs(this.trunc(xMin));
        var xSec = (x % 60);
        var sec = Math.round(Math.abs(xSec));
        if (bool) {
            return deg+'°' + min+"'"+ sec+'"';
        } else{
            return degRound+'°';
        }
    },
    //take an angle 360° and return it as degrees min and secs xh y'w''
    hMS: function(x){
        var xH = x / 15;
        var h = this.trunc(xH);
        var xMin = (xH % 1) * 60;
        var min = Math.abs(this.trunc(xMin));
        var xSec = (xMin % 1) * 60;
        var sec = Math.abs(this.trunc(xSec));
        return h+'h'+min+"'"+sec+'"';
    },
    //sort numbers by size
    sort: function(a, b) {
        return b - a;
    }
};