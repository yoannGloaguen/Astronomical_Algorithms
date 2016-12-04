//astronomical position

var ast = {
    jD: 0, //JD is the julian day,
    time: 0, //time, the time in centuries
    nut: 0, //nutation of earth in arcsec °/3600
    obl: 0, //obliquity of earth in °
    meanO: 0, //mean obliquity of earth
    moonLongitude: 0, //the astrological position of moon on the zodiac
    mercuryLongitude: 0, //the astrological position of mercury on the zodiac
    venusLongitude: 0, //the astrological position of venus on the zodiac
    marsLongitude: 0, //the astrological position of mars on the zodiac
    jupiterLongitude: 0, //the astrological position of jupiter on the zodiac
    saturnLongitude: 0, //the astrological position of saturn on the zodiac
    uranusLongitude: 0, //the astrological position of uranus on the zodiac
    neptuneLongitude: 0, //the astrological position of neptune on the zodiac
    plutoLongitude: 0, //the astrological position of pluto on the zodiac
    sunLongitude: 0, //the astrological position of the sun on the zodiac
    earthL: 0, // earth longitude °
    earthB: 0, // earth latitude °
    earthR: 0, // earth distance AU
    earthRL: 0, // earth rectangular longitude ° (j2000)
    earthRB: 0 // earth rectangular latitude ° (j2000)
};
//main function returning astral positions
function positions(){
    dateToJD(); //convert date to JD in centuries (chap7, page 59)
    nutation(); //calculate earth's nutation (chap 21, page 131)
    moonPos(); //calculate moon's position (chap 45, page 307)
    Arguments.earthPos(); //calculate earth's position (chap 45, page 307) the function is inside earthTables
    planetPos(); //calculate planets position (chap 31, page 205)
    sunPos(); //calculate sun's position (chap 24, page 151) and pluto (chap 36, page 248)
    houses(); //update houses position in °, stored into houses.js
}
//positions of planets in the zodiac
function planetPos(){
    var l, b, r;
    var values;

    //mercury
    values = Arguments.merCoordinates(ast.time);
    l = values[0]; b = values[1]; r = values[2];
    ast.mercuryLongitude = planetCoordinates(l, b, r, 'mer');

    //venus
    values = Arguments.venCoordinates(ast.time);
    l = values[0]; b = values[1]; r = values[2];
    ast.venusLongitude = planetCoordinates(l, b, r, 'ven');

    //Mars
    values = Arguments.marCoordinates(ast.time);
    l = values[0]; b = values[1]; r = values[2];
    ast.marsLongitude = planetCoordinates(l, b, r, 'mar');

    //Jupiter
    values = Arguments.jupCoordinates(ast.time);
    l = values[0]; b = values[1]; r = values[2];
    ast.jupiterLongitude = planetCoordinates(l, b, r, 'jup');

    //saturn
    values = Arguments.satCoordinates(ast.time);
    l = values[0]; b = values[1]; r = values[2];
    ast.saturnLongitude = planetCoordinates(l, b, r, 'sat');

    //uranus
    values = Arguments.uraCoordinates(ast.time);
    l = values[0]; b = values[1]; r = values[2];
    ast.uranusLongitude = planetCoordinates(l, b, r, 'ura');

    //neptune
    values = Arguments.nepCoordinates(ast.time);
    l = values[0]; b = values[1]; r = values[2];
    ast.neptuneLongitude = planetCoordinates(l, b, r, 'nep');

    //earth
    earthCoordinates();
}
//earth
function earthCoordinates(){
    Arguments.earthPos();
    document.getElementById('earHL').innerHTML = 'L: ' + (Math.round(ast.earthL * 1000) / 1000) + '°';
    document.getElementById('earHB').innerHTML = 'B: ' + (Math.round(ast.earthB * 100000) / 100000) + '°';
    document.getElementById('earHR').innerHTML = 'R: ' + (Math.round(ast.earthR * 1000) / 1000) + ' AU';
    nutation();
    document.getElementById('earN').innerHTML = 'Δ♆: ' + (Math.round(ast.nut * 1000 * 3600) / 1000) + '°';
    document.getElementById('earO').innerHTML = 'ε: ' + MyMath.dMS(ast.obl, true);
}
//position of moon (chapter 45, page 307)
function moonPos(){
    var t = ast.time;
    var l2 = 218.3164591 + 481267.88134236 * t - 0.0013268 * Math.pow(t, 2) + Math.pow(t,3) / 538841 - Math.pow(t,4) / 65194000;
    var l2Angle = MyMath.fixDeg(l2);
    l2 = MyMath.degToRad(l2Angle);
    var d = 297.8502042 + 445267.1115168 * t - 0.0016300 * Math.pow(t,2) + Math.pow(t,3) / 545868 - Math.pow(t,4) / 113065000;
    d = MyMath.fixRad(d);
    var m = 357.5291092 + 35999.0502909 * t - 0.0001536 * Math.pow(t,2) + Math.pow(t,3) / 24490000;
    m = MyMath.fixRad(m);
    var m2 = 134.9634114 + 477198.8676313 * t + 0.0089970 * Math.pow(t,2) + Math.pow(t,3) / 69699 - Math.pow(t,4) / 14712000;
    m2 = MyMath.fixRad(m2);
    var f = 93.2720993 + 483202.0175273 * t -0.0034029 * Math.pow(t,2) - Math.pow(t,3) / 3526000 + Math.pow(t,4) / 863310000;
    f = MyMath.fixRad(f);
    var e = 1 - 0.002516 * t - 0.0000074 * Math.pow(t,2);

    var a1 = 119.75 + 131.849 * t;
    a1 = MyMath.fixRad(a1);
    var a2 = 53.09 + 479264.290 * t;
    a2 = MyMath.fixRad(a2);
    var a3 = 313.45 + 481266.484 * t;
    a3 = MyMath.fixRad(a3);

    var el = Arguments.moonEl(l2, d, m, m2, f, e, a1, a2);
    var er = Arguments.moonEr(d, m, m2, f, e);
    var eb = Arguments.moonEb(l2, d, m, m2, f, e, a1, a3);

    var al = l2Angle + el / 1000000 + ast.nut;

    ast.moonLongitude = MyMath.fixDeg(al); //the astrological position of moon on the zodiac

    //apparent positions
    var alRad = MyMath.degToRad(al);
    var beRad = MyMath.degToRad(eb / 1000000);
    var obRad = MyMath.degToRad(ast.obl);
    document.getElementById('mooAS').innerHTML = 'α: ' + MyMath.hMS(asc(alRad, beRad, obRad)); //apparent right ascension
    document.getElementById('mooDC').innerHTML = 'δ: ' + MyMath.dMS(dec(alRad, beRad, obRad), true); //apparent declination

    er = 385000.56 + er / 1000;
    document.getElementById('mooGR').innerHTML = 'Δ: ' + (Math.round(er * 1000) / 1000) + ' km'; //distance from center of earth
    //ascending node
    var nO = 125.0445550 - 1934.1361849 * t + 0.0020762 * Math.pow(t,2) + Math.pow(t,3) / 467410 - Math.pow(t,4) / 60616000;
    nO = MyMath.fixDeg(nO);
    document.getElementById('mooNO').innerHTML = '☊: ' + MyMath.dMS(nO, true);
}
//we calculate both sun and pluto, because we need sun's rectangular coordinates for pluto
function sunPos(){
    var t = ast.time;

    var o = ast.earthL + 180;
    var b = -ast.earthB;
    var al2 = o - 1.397 * t - 0.00031 * Math.pow(t,2);
    var dO = o - 0.000025 + ast.nut - ((20.4898 / 3600) / ast.earthR);
    var dB = b + (0.03916 / 3600) * (Math.cos(MyMath.degToRad(al2)) - Math.sin(MyMath.degToRad(al2)));

    ast.sunLongitude = MyMath.fixDeg(dO);

    var alRad = MyMath.degToRad(dO);
    var beRad = MyMath.degToRad(dB / 1000000);
    var obRad = MyMath.degToRad(ast.obl);
    document.getElementById('sunAS').innerHTML = 'α: ' + MyMath.hMS(asc(alRad, beRad, obRad)); //apparent right ascension
    document.getElementById('sunDC').innerHTML = 'δ: ' + MyMath.dMS(dec(alRad, beRad, obRad), true); //apparent declination
    document.getElementById('sunGR').innerHTML = 'Δ: ' + (Math.round(ast.earthR * 1000) / 1000) + ' AU';

    Arguments.earthRectangular(t); //for sun rectangular positions (j2000) (chap 25, page 161)

    //rectangular sun's coordinates needed for pluto (j2000)
    o = ast.earthRL + 180;
    b = - ast.earthRB;

    var X = ast.earthR * Math.cos(MyMath.degToRad(b)) * Math.cos(MyMath.degToRad(o));
    var Y = ast.earthR * Math.cos(MyMath.degToRad(b)) * Math.sin(MyMath.degToRad(o));
    var Z = ast.earthR * Math.sin(MyMath.degToRad(b));

    var X0 = X + 0.000000440360 * Y - 0.000000190919 * Z;
    var Y0 = - 0.000000479966 * X + 0.917482137087 * Y - 0.397776982902 * Z;
    var Z0 = 0.397776982902 * Y + 0.917482137087 * Z;

    //pluto
    var values = Arguments.pluCoordinates(ast.time);
    var l = values[0]; b = values[1]; var r = values[2];
    ast.plutoLongitude = plutoPos(l, b, r, X0, Y0, Z0);

}
//take field values (day/month etc... and update JD and time in centuries
function dateToJD(){
    var year = parseInt(document.getElementById('year').value);
    var month = parseInt(document.getElementById('month').value);
    var day = parseInt(document.getElementById('day').value);
    var hour = parseInt(document.getElementById('hour').value);
    var min = parseInt(document.getElementById('min').value);
    var sec = parseInt(document.getElementById('sec').value);
    ast.jD = MyMath.dateToJd(year, month, day, hour, min, sec);
    ast.time = MyMath.jdToCent(ast.jD);
}
//nutation of earth
function nutation(){
    var t = ast.time;

    var d = 297.85036 + 445267.111480 * t - 0.0019142 * Math.pow(t, 2) + Math.pow(t, 3) / 189474;
    d = MyMath.fixRad(d);
    var m = 357.52772 + 35999.050340 * t - 0.0001603 * Math.pow(t, 2) - Math.pow(t, 3) / 300000;
    m = MyMath.fixRad(m);
    var m2 = 134.96298 + 477198.867398 * t + 0.0086972 * Math.pow(t, 2) + Math.pow(t, 3) / 56250;
    m2 = MyMath.fixRad(m2);
    var f = 93.27191 + 483202.017538 * t - 0.0036825 * Math.pow(t, 2) + Math.pow(t, 3) / 327270;
    f = MyMath.fixRad(f);
    var o = 125.04452 - 1934.136261 * t + 0.0020708 * Math.pow(t, 2) + Math.pow(t, 3) / 450000;
    o = MyMath.fixRad(o);

    var nutL = Arguments.earthNutL(d, m, m2, f, o, t) / 10000;
    ast.nut = nutL / 3600;

    var nutO = Arguments.earthNutO(d, m, m2, f, o, t) / 10000;
    var u = t / 100;

    var meanO = 84381.448 - 4680.93 * u - 1.55 * Math.pow(u,2) + 1999.25 * Math.pow(u,3)
        - 51.38 * Math.pow(u,4) - 249.67 * Math.pow(u,5) - 39.05 * Math.pow(u,6) + 7.12 * Math.pow(u,7)
        + 27.87 * Math.pow(u,8) + 5.79 * Math.pow(u,9) + 2.45 * Math.pow(u,10);
    ast.meanO = meanO / 3600;
    var trueNut = meanO + nutO;
    ast.obl = trueNut / 3600;
}
//calculate helio/geo/mean position of planets, take longitude, latitude and distance,
// update xLongitude values, return mean longitude
// planet take a 3 digit string like 'mer' for mercury
function planetCoordinates(l, b, r, planet){
    var t = ast.time/10;
    var lZero = 280.46645 + 36000.76983 * t + 0.0003032 * Math.pow(t,2); lZero = MyMath.fixDeg(lZero);
    var e = 0.016708617 - 0.000042037 * t - 0.0000001236 * Math.pow(t,2);
    var pi = 102.93735 + 1.71953 * t + 0.00046 * Math.pow(t,2);
    var m = 357.52910 + 35999.05030 * t - 0.0001559 * Math.pow(t,2) - 0.00000048 * Math.pow(t,3); m = MyMath.fixRad(m);
    var c = +(1.914600 - 0.004817 * t - 0.000014 * Math.pow(t,2)) * Math.sin(m)
        + (0.019993 - 0.000101 * t) * Math.sin(2 * m)
        + 0.000290 * Math.sin(3 * m);
    var xO = MyMath.fixRad(lZero + c);

    //put heliocentric position into the divs
        document.getElementById(planet + 'HL').innerHTML = 'L: ' + (Math.round(l * 1000) / 1000) + '°';
        document.getElementById(planet + 'HB').innerHTML = 'B: ' + (Math.round(b * 1000) / 1000) + '°';
        document.getElementById(planet + 'HR').innerHTML = 'R: ' + (Math.round(r * 1000) / 1000) + ' AU';

    var geo = toGeo(r, l, b, ast.earthR, ast.earthL, ast.earthB); // Geocentric position return d, x, y, z, newTime
    var d = geo[0]; //geocentric distance in AU
    var x = geo[1];
    var y = geo[2];
    var z = geo[3];
    var newTime = geo[4];

    //geo true Longitude
    var A = MyMath.radToDeg(Math.atan(y / x));
    if (x < 0){ A = A + 180;} //this is explained on page 7 "the correct quadrant"
    A = MyMath.fixDeg(A);

    //geo true Latitude
    var B = MyMath.radToDeg(Math.atan(z / Math.sqrt(Math.pow(x,2) + Math.pow(y,2))));

    //put geocentric position into the divs
        document.getElementById(planet + 'GL').innerHTML = 'L: ' + (Math.round(A * 1000) / 1000) + '°';
        document.getElementById(planet + 'GB').innerHTML = 'B: ' + (Math.round(B * 1000) / 1000) + '°';
        document.getElementById(planet + 'GR').innerHTML = 'Δ: ' + (Math.round(d * 1000) / 1000) + ' AU';

    //mean positions
    t = MyMath.jdToCent(ast.jD - newTime); //we calculate again with time correction

    var values;
    if (planet === 'mer'){ values = Arguments.merCoordinates(t);}
    else if (planet === 'ven'){ values = Arguments.venCoordinates(t);}
    else if (planet === 'mar'){ values = Arguments.marCoordinates(t);}
    else if (planet === 'jup'){ values = Arguments.jupCoordinates(t);}
    else if (planet === 'sat'){ values = Arguments.satCoordinates(t);}
    else if (planet === 'ura'){ values = Arguments.uraCoordinates(t);}
    else { values = Arguments.nepCoordinates(t);}
    l = values[0];
    b = values[1];
    r = values[2];

    geo = toGeo(r, l, b, ast.earthR, ast.earthL, ast.earthB);
    x = geo[1];
    y = geo[2];
    z = geo[3];

    //finally we will get the apparent positions
    A = MyMath.radToDeg(Math.atan(y / x));
    if (x < 0){ A = A + 180;}

    var ARad = MyMath.degToRad(A);
    B = MyMath.radToDeg(Math.atan(z / Math.sqrt(Math.pow(x,2) + Math.pow(y,2))));
    var BRad = MyMath.degToRad(B);

    var k = 20.49552;
    var deltaA = (- k * Math.cos(xO - ARad) + e * k * Math.cos(pi - ARad)) / Math.cos(BRad);
    deltaA = deltaA / 3600;
    var deltaB = - k * Math.sin(BRad) * (Math.sin(xO - ARad) - e * Math.sin(pi - ARad));
    deltaB = deltaB / 3600;

    A = A + deltaA + ast.nut; //apparent longitude
    B = B + deltaB;

    var alRad = MyMath.degToRad(A);
    var beRad = MyMath.degToRad(B);
    var obRad = MyMath.degToRad(ast.obl);
        document.getElementById(planet + 'AS').innerHTML = 'α: ' + MyMath.hMS(asc(alRad, beRad, obRad)); //apparent right ascension
        document.getElementById(planet + 'DC').innerHTML = 'δ: ' + MyMath.dMS(dec(alRad, beRad, obRad), true); //apparent declination

    return MyMath.fixDeg(A);
}
//pluto
function plutoPos(l, b, r, X, Y, Z){
    var ORad = MyMath.degToRad(ast.obl);
    //put heliocentric position into the divs
    document.getElementById('pluHL').innerHTML = 'L: ' + (Math.round(l * 1000) / 1000) + '°';
    document.getElementById('pluHB').innerHTML = 'B: ' + (Math.round(b * 1000) / 1000) + '°';
    document.getElementById('pluHR').innerHTML = 'R: ' + (Math.round(r * 1000) / 1000) + ' AU';
    l = MyMath.degToRad(l);
    b = MyMath.degToRad(b);

    var x = r * Math.cos(l) * Math.cos(b);
    var y = r * (Math.sin(l) * Math.cos(b) * Math.cos(ORad) - Math.sin(b) * Math.sin(ORad));
    var z = r * (Math.sin(l) * Math.cos(b) * Math.sin(ORad) + Math.sin(b) * Math.cos(ORad));

    var A = Math.atan((Y + y) / (X + x)); A = MyMath.radToDeg(A); if ((X + x) < 0){ A = A + 180;}
    var R = Math.sqrt(Math.pow((X + x), 2) + Math.pow((Y + y), 2) + Math.pow((Z + z), 2));
    var B = Math.asin((Z + z) / (R)); B = MyMath.radToDeg(B); //R should never be negative B will return the correct quadrant every time
    var T = 0.0057755183 * R;

    var ARad = MyMath.degToRad(A);
    var BRad = MyMath.degToRad(B);

    A = (Math.sin(ARad) * Math.cos(BRad) + Math.tan(BRad) * Math.sin(BRad)) / Math.cos(ARad);
    A = MyMath.radToDeg(Math.atan(A)); if (Math.cos(ARad) < 0){ A = A + 180;}
    A = MyMath.fixDeg(A);

    B = Math.sin(BRad) * Math.cos(ORad) - Math.cos(BRad) * Math.sin(ORad) * Math.cos(ARad);
    B = Math.asin(B); B = MyMath.radToDeg(B);
    B = MyMath.fixDeg(B);
    //put geocentric position into the divs
    document.getElementById('pluGL').innerHTML = 'L: ' + (Math.round(A * 1000) / 1000) + '°';
    document.getElementById('pluGB').innerHTML = 'B: ' + (Math.round(B * 1000) / 1000) + '°';
    document.getElementById('pluGR').innerHTML = 'Δ: ' + (Math.round(R * 1000) / 1000) + ' AU';

    var values = Arguments.pluCoordinates(ast.time - T / 36525);
    l = MyMath.degToRad(values[0]);
    b = MyMath.degToRad(values[1]);
    r = values[2];

    x = r * Math.cos(l) * Math.cos(b);
    y = r * (Math.sin(l) * Math.cos(b) * Math.cos(ORad) - Math.sin(b) * Math.sin(ORad));
    z = r * (Math.sin(l) * Math.cos(b) * Math.sin(ORad) + Math.sin(b) * Math.cos(ORad));

    A = Math.atan((Y + y) / (X + x)); A = MyMath.radToDeg(A); if ((X + x) < 0){ A = A + 180;}
    R = Math.sqrt(Math.pow((X + x), 2) + Math.pow((Y + y), 2) + Math.pow((Z + z), 2));
    B = Math.asin((Z + z) / (R)); B = MyMath.radToDeg(B); //R should never be negative B will return the correct quadrant every time

    document.getElementById('pluAS').innerHTML = 'α: ' + MyMath.hMS(A); //apparent right ascension
    document.getElementById('pluDC').innerHTML = 'δ: ' + MyMath.dMS(B, true); //apparent declination

    ARad = MyMath.degToRad(A);
    BRad = MyMath.degToRad(B);

    //for ecliptical coordinates
    A = (Math.sin(ARad) * Math.cos(ORad) + Math.tan(BRad) * Math.sin(ORad)) / Math.cos(ARad);
    A = MyMath.radToDeg(Math.atan(A)); if (Math.cos(ARad) < 0){ A = A + 180;}

    return MyMath.fixDeg(A);

}
//convert heliocentric coordinates into geocentric ones
var toGeo = function(gR, gL, gB, earthR, earthL, earthB){ // geocentric position

    var veR = gR;
    var veL = MyMath.degToRad(gL);
    var veB = MyMath.degToRad(gB);
    var teR = earthR;
    var teL = MyMath.degToRad(earthL);
    var teB = MyMath.degToRad(earthB);


    var x = veR * Math.cos(veB) * Math.cos(veL) - teR * Math.cos(teB) * Math.cos(teL);
    var y = veR * Math.cos(veB) * Math.sin(veL) - teR * Math.cos(teB) * Math.sin(teL);
    var z = veR * Math.sin(veB) - teR * Math.sin(teB);
    var d = Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2));
    var newTime = (0.0057755183 * d);

    return[d, x, y, z, newTime];
};
//return apparent right ascension
function asc(alRad, beRad, obRad){
    var asc = (Math.sin(alRad) * Math.cos(obRad) - Math.tan(beRad) * Math.sin(obRad)) / Math.cos(alRad);
    asc = MyMath.radToDeg(Math.atan(asc)); if (Math.cos(alRad) < 0){ asc = asc + 180;} asc = MyMath.fixDeg(asc);
    return asc;
}
//apparent declination
function dec(alRad, beRad, obRad){
    var dec = Math.sin(beRad) * Math.cos(obRad) + Math.cos(beRad) * Math.sin(obRad) * Math.sin(alRad);
    dec = MyMath.radToDeg(Math.asin(dec));
    return dec;
}