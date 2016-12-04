//functions related to houses calculations
//I found those algorithms on the web, I don't remember where,
// it's a common way to get houses position (it looks accurate enough)

var astro ={
    //houses positions
    house1: 0,
    house2: 0,
    house3: 0,
    house4: 0,
    house5: 0,
    house6: 0,
    house7: 0,
    house8: 0,
    house9: 0,
    house10: 0,
    house11: 0,
    house12: 0,

    sidereal: 0, //sidereal local time
    sidereal0: 0, //sidereal time
    siderealB: 0 //sidereal born time
};
//values called p are points in the sky
//values called ts are times (sidereal times)
function houses() {
    getSidereal(); //we 1st update sidereal values
    var lat = parseFloat(document.getElementById('latitude').value);
    var p1 = lat;
    lat = MyMath.degToRad(lat);
    var ts1 = MyMath.fixDeg(astro.siderealB);
    var p2 = MyMath.radToDeg(Math.atan((2 / 3 * Math.tan(lat))));
    var ts2 = MyMath.fixDeg(astro.siderealB + 30);
    var p3 = MyMath.radToDeg(Math.atan(1 / 3 * Math.tan(lat)));
    var ts3 = MyMath.fixDeg(astro.siderealB + 60);
    var p10 = 0;
    var ts10 = MyMath.fixDeg(astro.siderealB - 90);
    var p11 = MyMath.radToDeg(Math.atan(1 / 3 * Math.tan(lat)));
    var ts11 = MyMath.fixDeg(astro.siderealB - 60);
    var p12 = MyMath.radToDeg(Math.atan(2 / 3 * Math.tan(lat)));
    var ts12 = MyMath.fixDeg(astro.siderealB - 30);

    //house 1 and 7
    var p1A = MyMath.degToRad((ast.obl + 90 - p1) / 2);
    var p1B = MyMath.degToRad((ast.obl + 90 + p1) / 2);
    var p1C = MyMath.fixRad((ts1 - 270) / 2);
    astro.house1 = MyMath.fixDeg(ascp1(p1A, p1B, p1C) - ascp2(p1A, p1B, p1C));
    astro.house7 = MyMath.fixDeg(astro.house1 + 180);

    //house 2 and 8
    p1A = MyMath.degToRad((ast.obl + 90 - p2) / 2);
    p1B = MyMath.degToRad((ast.obl + 90 + p2) / 2);
    p1C = MyMath.fixRad((ts2 - 270) / 2);
    astro.house2 = MyMath.fixDeg(ascp1(p1A, p1B, p1C) - ascp2(p1A, p1B, p1C));
    astro.house8 = MyMath.fixDeg(astro.house2 + 180);

    //houses 3 and 9
    p1A = MyMath.degToRad((ast.obl + 90 - p3) / 2);
    p1B = MyMath.degToRad((ast.obl + 90 + p3) / 2);
    p1C = MyMath.fixRad((ts3 - 270) / 2);
    astro.house3 = MyMath.fixDeg(ascp1(p1A, p1B, p1C) - ascp2(p1A, p1B, p1C));
    astro.house9 = MyMath.fixDeg(astro.house3 + 180);

    //houses 4 and 10
    p1A = MyMath.degToRad((ast.obl + 90 - p10) / 2);
    p1B = MyMath.degToRad((ast.obl + 90 + p10) / 2);
    p1C = MyMath.fixRad((ts10 - 270) / 2);
    astro.house10 = MyMath.fixDeg(ascp1(p1A, p1B, p1C) - ascp2(p1A, p1B, p1C));
    astro.house4 = MyMath.fixDeg(astro.house10 + 180);

    //houses 5 and 11
    p1A = MyMath.degToRad((ast.obl + 90 - p11) / 2);
    p1B = MyMath.degToRad((ast.obl + 90 + p11) / 2);
    p1C = MyMath.fixRad((ts11 - 270) / 2);
    astro.house11 = MyMath.fixDeg(ascp1(p1A, p1B, p1C) - ascp2(p1A, p1B, p1C));
    astro.house5 = MyMath.fixDeg(astro.house11 + 180);

    //houses 6 and 12
    p1A = MyMath.degToRad((ast.obl + 90 - p12) / 2);
    p1B = MyMath.degToRad((ast.obl + 90 + p12) / 2);
    p1C = MyMath.fixRad((ts12 - 270) / 2);
    astro.house12 = MyMath.fixDeg(ascp1(p1A, p1B, p1C) - ascp2(p1A, p1B, p1C));
    astro.house6 = MyMath.fixDeg(astro.house12 + 180);
}
//We put 3 points inside and return an angle
function ascp1(p1A, p1B, p1C){
    var ascp1 = MyMath.radToDeg(Math.atan(Math.sin(p1A) / Math.cos(p1B) * Math.tan(p1C)));
    if (Math.cos(p1B) < 0) { ascp1 = ascp1 + 180;} //to avoid Math.atan returning wrong value (page 8)
    return ascp1;
}
//We put 3 points inside and return an angle
function ascp2(p1A, p1B, p1C) {
    var ascp2 = MyMath.radToDeg(Math.atan(-Math.cos(p1A) / Math.sin(p1B) * Math.tan(p1C)));
    if (Math.sin(p1B) < 0) { ascp2 = ascp2 + 180;} //to avoid Math.atan returning wrong value (page 8)
    return ascp2;
}
//this function update the sidereal times (chapter 11 page 83)
function getSidereal(){
    var year = parseInt(document.getElementById('year').value);
    var month = parseInt(document.getElementById('month').value);
    var day = parseInt(document.getElementById('day').value);
    var hH = parseInt(document.getElementById('hour').value);
    var mM = parseInt(document.getElementById('min').value);
    var sS = parseInt(document.getElementById('sec').value);
    var lg = parseFloat(document.getElementById('longitude').value);
    var t = MyMath.jdToCent(MyMath.dateToJd(year, month, day, 0, 0, 0)); //we need time for the day at 00h00
    var o = 100.46061837 + 36000.770053608 * t + 0.000387933 * Math.pow(t,2) - Math.pow(t,3) / 38710000;
    var o0 = o;
    var hT = (hH + mM / 60 + sS / 3600) * 1.00273790935 * 15 ;
    var nt = ast.nut * 3600;
    var ob = MyMath.degToRad(ast.obl * 3600);
    var cor = (nt + Math.cos(ob)) / 3600;
    o = MyMath.fixDeg((o + hT + cor));
    astro.sidereal = o;
    astro.sidereal0 = MyMath.fixDeg(o0 + cor) * 3600;

    lg = (lg * 3600);
    var local = ((hH * 3600 + mM * 60 + sS)* 15 + lg); local = (1296000 + local) % 1296000;
    var loc = local;

    var sT = astro.sidereal0;
    var rect = ((mM + sS * 60) * 0.10) / 60;
    var tSN = sT + loc + rect; tSN = (1296000 + tSN) % 1296000;
    astro.siderealB = tSN / 3600;
}