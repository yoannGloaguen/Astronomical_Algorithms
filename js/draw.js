//everything related with canvas

var opt = {
    strokeSize: 1, //size of stuff inside the canvas*/
    pRange:2, //range of positive aspects
    nRange:8, //range of negative aspects
    pColor:'#161c38', //color of positive aspects
    nColor:'#c10000', //color of negative aspects
    grey:'#cccccc', //color for hidden aspect when a planet is selected
    mRange:3, //increment range for moon aspects +(3)
    playMe: null, //setInterval for play
    run: false, //true if play
    speed: 1, //speed 1 is 660sec/sec, speed 2 is 20h/sec, speed 3 is 40h/sec, 4 60h...
    updated: false, //when false every aspects are drawn on color
    lineWidth: 1 //for ctx.lineWidth
};
function init(){
    defaultValues(); //load default values to avoid problems when reloaded the page
    drawZodiacBase(); //draw all fixed elements on the canvas
    dateNow(); //return actual time and draw stuff (inside date.js)
    //for small media
    if(document.body.clientWidth > 1024) {
        Grab.grabInit();
        WindowScale.scaleInit();
    }
}
function calcZodiac(){
    positions(); //calculate planetary positions
    dateValue(); //update date on the window
    drawZodiac('none'); //drawZodiac
}
//draw basic elements (only once)
function drawZodiacBase(){
    checkFields();// check fields values and assign them to the global variables
    setupCanvas(1);//setup 1nd canvas (1 -> id = myCanvas1)
    //draw the 4 circles, the values inside () is the radius in % of the canvas strokeSize
    drawCircle(18); drawCircle(20); drawCircle(30); drawCircle(32);
    //draw all the degrees markers 1st and 2nd values are the coordinates
    //3rd is the incrementation in degrees
    //ex: (20, 30, 30) draw a line from 1rst(20) and last(30) circle every 30 degrees
    drawLines(18, 32, 30, 0, 360, 'myCanvas1'); drawLines(32, 30, 1, 0, 360, 'myCanvas1');
    drawLines(32, 29, 5, 0, 360, 'myCanvas1'); drawLines(0, 2, 90, 0, 360, 'myCanvas1');
    //adjust the position of the signs depending canvas's strokeSize
    signsPosition(25, 20); //position of the signs, the value determine the fontSize the bigger it is the smaller is the font
}
//draw moving elements (many time)
function drawZodiac(planetLongitude){
    setupCanvas(2); //setup 2nd canvas (2 -> id = myCanvas2)
    astroSign('red', 'blue', 'purple'); //change the color of sign and ascendant
    drawHouses(32, 18, 35, 1.5); //put the houses on the canvas
    drawPlanets(35, 18, 20, 2.5); //put the planets on the canvas
    drawAspect(18, opt.pRange, opt.nRange, opt.mRange, planetLongitude); //draw the aspects
    opt.updated = true; //for geo localization
}
//draw every aspects
function drawAspect(x1, pRange, nRange, mRange, planetLongitude){
    var sexRange = pRange; //range of sextile value
    var squRange = nRange; //range of square value
    var triRange = pRange; //range of trigone value
    var oppRange = nRange; //range of opposite value
    var moonRange = mRange; //increment for moon
    if (opt.run && (opt.speed < -1 || opt.speed > 1)){ //we don't show houses on high speed
        var array = [
            ast.moonLongitude,
            ast.sunLongitude,
            ast.mercuryLongitude,
            ast.venusLongitude,
            ast.marsLongitude,
            ast.jupiterLongitude,
            ast.saturnLongitude,
            ast.uranusLongitude,
            ast.neptuneLongitude
        ];
    } else{ //if not playing or -1 < speed < 1 we show houses
         array = [
            ast.moonLongitude,
            ast.sunLongitude,
            ast.mercuryLongitude,
            ast.venusLongitude,
            ast.marsLongitude,
            ast.jupiterLongitude,
            ast.saturnLongitude,
            ast.uranusLongitude,
            ast.neptuneLongitude,
            astro.house1,
            astro.house10
        ];
    }
    array.sort(MyMath.sort);
    for(var i=0; i < array.length; i++) {
        //we will draw aspects every time the angle between planets or house1/10 is inside those values
        var sexMin = 60 - sexRange, sexMax = 60 + sexRange; //for sextile (nothing else :)) 60°
        var squMin = 90 - squRange, squMax = 90 + squRange; //for square 90°
        var triMin = 120 - squRange, triMax = 120 + triRange; //for trigone 120°
        var oppMin = 180 - oppRange, oppMax = 180 + oppRange; //for opposite 180°
        //we add +moonRange -moonRange for moon, because moon move faster, we increase range of the aspect
        if (array[i] === ast.moonLongitude){
            sexMin -= moonRange; sexMax  += moonRange;
            squMin -= moonRange; squMax  += moonRange;
            triMin -= moonRange; triMax  += moonRange;
            oppMin -= moonRange; oppMax  += moonRange;
        }
        for(var j = 1; j < array.length - i; j++) {
            //sextile (more or less 60° between 2 planets)
            if ((array[i] - array[i+j] < sexMax) && (array[i] - array[i+j] > sexMin)
                || (array[i] - array[i+j] < 360 - sexMin) && (array[i] - array[i+j] > 360 - sexMax)){
                if (array[i] === planetLongitude || array[i+j]  === planetLongitude || planetLongitude === 'none'){
                    drawAspectLine(x1, array[i], array[i+j], opt.pColor);
                } else {
                    drawAspectLine(x1, array[i], array[i + j], opt.grey);
                }
            }
            //square (more or less 90° between 2 planets)
            if ((array[i] - array[i+j] < squMax) && (array[i] - array[i+j] > squMin)
                || (array[i] - array[i+j] < 360 - squMin) && (array[i] - array[i+j] > 360 - squMax)){
                if (array[i] === planetLongitude || array[i+j]  === planetLongitude || planetLongitude === 'none'){
                    drawAspectLine(x1, array[i], array[i+j], opt.nColor);
                } else {
                    drawAspectLine(x1, array[i], array[i + j], opt.grey);
                }
            }
            //trigone (more or less 120° between 2 planets)
            if ((array[i] - array[i+j] < triMax) && (array[i] - array[i+j] > triMin)
                || (array[i] - array[i+j] < 360 - triMin) && (array[i] - array[i+j] > 360 - triMax)){
                if (array[i] === planetLongitude || array[i+j]  === planetLongitude || planetLongitude === 'none'){
                    drawAspectLine(x1, array[i], array[i+j], opt.pColor);
                } else {
                    drawAspectLine(x1, array[i], array[i + j], opt.grey);
                }
            }
            //opposite (more or less 180° between 2 planets)
            if ((array[i] - array[i+j] < oppMax) && (array[i] - array[i+j] > oppMin)){
                if (array[i] === planetLongitude || array[i+j]  === planetLongitude || planetLongitude === 'none'){
                    drawAspectLine(x1, array[i], array[i+j], opt.nColor);
                } else{
                    drawAspectLine(x1, array[i], array[i+j], opt.grey);
                }
            }
        }
    }
}
//draw lines between planets and houses
function drawAspectLine(x1, p1, p2, color){
    var c = document.getElementById("myCanvas2");
    var ctx = c.getContext("2d");

    var p1X = opt.strokeSize / 2 + (opt.strokeSize * x1 / 100) * Math.cos(MyMath.degToRad(-p1+60));
    var p1Y = opt.strokeSize / 2 + (opt.strokeSize * x1 / 100) * Math.sin(MyMath.degToRad(-p1+60));
    var p2X = opt.strokeSize / 2 + (opt.strokeSize * x1 / 100) * Math.cos(MyMath.degToRad(-p2+60));
    var p2Y = opt.strokeSize / 2 + (opt.strokeSize * x1 / 100) * Math.sin(MyMath.degToRad(-p2+60));

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(p1X, p1Y);
    ctx.lineTo(p2X, p2Y);
    ctx.lineWidth = opt.lineWidth;
    ctx.stroke();
}
//put the houses inside the Zodiac
function drawHouses(newDist, x1, fontSize, fontSize2){
    astralPosition('house1', 0, newDist, fontSize, fontSize2, astro.house1, '#0c2715');
    astralPosition('house2', x1, newDist, fontSize, fontSize2, astro.house2, '#874d4d');
    astralPosition('house3', x1, newDist, fontSize, fontSize2, astro.house3, '#874d4d');
    astralPosition('house4', 0, newDist, fontSize, fontSize2, astro.house4, '#0c2715');
    astralPosition('house5', x1, newDist, fontSize, fontSize2, astro.house5, '#874d4d');
    astralPosition('house6', x1, newDist, fontSize, fontSize2, astro.house6, '#874d4d');
    astralPosition('house7', 0, newDist, fontSize, fontSize2, astro.house7, '#0c2715');
    astralPosition('house8', x1, newDist, fontSize, fontSize2, astro.house8, '#874d4d');
    astralPosition('house9', x1, newDist, fontSize, fontSize2, astro.house9, '#874d4d');
    astralPosition('house10', 0, newDist, fontSize, fontSize2, astro.house10, '#0c2715');
    astralPosition('house11', x1, newDist, fontSize, fontSize2, astro.house11, '#874d4d');
    astralPosition('house12', x1, newDist, fontSize, fontSize2, astro.house12, '#874d4d');
}
//put planets around the Zodiac
function drawPlanets(dist, x1, fontSize, fontSize2){
    //we first sort longitudes (the biggest 1st), to compare them later 1 by 1
    var array = [
        ast.moonLongitude,
        ast.sunLongitude,
        ast.mercuryLongitude,
        ast.venusLongitude,
        ast.marsLongitude,
        ast.jupiterLongitude,
        ast.saturnLongitude,
        ast.uranusLongitude,
        ast.neptuneLongitude
    ];
    array.sort(MyMath.sort);
    var toClose = 10; //the distance in degrees between each assets
    var newDist = dist; // we want to keep the default value stored, so we can reset it later
    //we call the function to draw the sorted numbers
    for(var i=0; i < array.length; i++) {
        //we compare the closest value,
        // we don't forget to compare the smallest value with the biggest ( || array[0] - array[i]...)
        if (array[i] - array[i+1] < toClose || array[0] - array[i] > 360 - toClose){
                newDist += 6; //if they are to close we increment 'dist" so they don't stack
        } else {
            newDist = dist; //else we reset 'dist" to default
        }
        if (array[i] === ast.moonLongitude) { astralPosition('moon', x1, newDist, fontSize, fontSize2, ast.moonLongitude, '#161c38');
        } else if (array[i] === ast.sunLongitude) { astralPosition('sun', x1, newDist, fontSize, fontSize2, ast.sunLongitude, '#c12700');
        } else if (array[i] === ast.mercuryLongitude) { astralPosition('mercury', x1, newDist, fontSize, fontSize2, ast.mercuryLongitude, '#dd8600');
        } else if (array[i] === ast.venusLongitude) { astralPosition('venus', x1, newDist, fontSize, fontSize2, ast.venusLongitude, '#024e5e');
        } else if (array[i] === ast.marsLongitude) { astralPosition('mars', x1, newDist, fontSize, fontSize2, ast.marsLongitude, '#5e0202');
        } else if (array[i] === ast.jupiterLongitude) { astralPosition('jupiter', x1, newDist, fontSize, fontSize2, ast.jupiterLongitude, '#00a0dd');
        } else if (array[i] === ast.saturnLongitude) { astralPosition('saturn', x1, newDist, fontSize, fontSize2, ast.saturnLongitude, '#8d00dd');
        } else if (array[i] === ast.uranusLongitude) { astralPosition('uranus', x1, newDist, fontSize, fontSize2, ast.uranusLongitude, '#296311');
        } else { astralPosition('neptune', x1, newDist, fontSize, fontSize2, ast.neptuneLongitude, '#00536b');}
    }
}
//position of the planets on the Zodiac (iD, distance from center, relative fontSize (small value give big size) , position in degrees)
function astralPosition(iD, x1, dist, fontSize, fontSize2, longitude, color){
    var p = MyMath.fixDeg( - longitude + 60); // we adjust the position because Zodiac run in revers and start right side
    var pH = MyMath.fixDeg( - longitude + 60); //for houses we increase rotation by 10° because we want to put houses at right side of the line
    // see drawLines function for more infos
    var p1X = opt.strokeSize / 2 + (opt.strokeSize * dist * 1.1 / 100) * Math.cos(MyMath.degToRad(p));
    var p1Y = opt.strokeSize / 2 + (opt.strokeSize * dist * 1.1/ 100) * Math.sin(MyMath.degToRad(p));
    //for houses
    var p1XH = opt.strokeSize / 2 + (opt.strokeSize * (dist * 1) / 100) * Math.cos(MyMath.degToRad(pH));
    var p1YH = opt.strokeSize / 2 + (opt.strokeSize * (dist * 1) / 100) * Math.sin(MyMath.degToRad(pH));
    //we change the size of the item
    document.getElementById(iD).style.height = (opt.strokeSize / 15) + 'px';
    document.getElementById(iD).style.width = (opt.strokeSize / 15) + 'px';
    document.getElementById(iD).style.fontSize = (opt.strokeSize / fontSize) + 'px';
    //for planets
    if (isHouses(longitude) == 0 ){
        //top left position of the block is strokeSize/15, we cut strokeSize/30 to align it from the center
        document.getElementById(iD).style.marginLeft = (p1X-(opt.strokeSize/30))+'px';
        document.getElementById(iD).style.marginTop = (p1Y-(opt.strokeSize/30))+'px';
    } else{ //for houses
        //top left position of the block is strokeSize/15, we cut strokeSize/30 to align it from the center
        document.getElementById(iD).style.marginLeft = (p1XH-(opt.strokeSize/30))+'px';
        document.getElementById(iD).style.marginTop = (p1YH-(opt.strokeSize/30))+'px';
        rotate(document.getElementById(iD), (- longitude + 150)); //rotate the houses symbols
        if(oddHouse(longitude) == 0){
            var to = nextHouse(longitude);
            //we have to reduce every angle by 60° to have lines in good position
            //nb : fixDeg return an angle between 0 and 360° fixDeg(30 - 60) which is -30 will return 330°
            if(MyMath.fixDeg(longitude - 60) > MyMath.fixDeg(to - 60)){ //for exemple we need to draw lines from 330° to 30°
                drawLines(18, 20, 1, MyMath.fixDeg((longitude - 60)), 360, 'myCanvas2'); //1st we draw lines from 330° to 360°
                drawLines(18, 20, 1, 0, (to - 60), 'myCanvas2'); //then from 0° to 30°
            } else{
                drawLines(18, 20, 1, MyMath.fixDeg((longitude - 60)), MyMath.fixDeg((to - 60)), 'myCanvas2');
            }
        }
    }
    document.getElementById(iD+'Infos').style.fontSize = (opt.strokeSize / fontSize / fontSize2) + 'px';
    document.getElementById(iD+'Infos').innerHTML = MyMath.dMS((longitude + 60) % 30, false); //the value in ° ' " false = only °
    document.getElementById(iD).title = MyMath.dMS((longitude + 60) % 30, true); //we return full info for hover title
    document.getElementById(iD).style.color = color;
    document.getElementById(iD+'Infos').style.color = color;

    var c = document.getElementById("myCanvas2");
    var ctx = c.getContext("2d");

    p1X = opt.strokeSize / 2 + (opt.strokeSize * x1 / 100) * Math.cos(MyMath.degToRad(p));
    p1Y = opt.strokeSize / 2 + (opt.strokeSize * x1 / 100) * Math.sin(MyMath.degToRad(p));
    var p2X = opt.strokeSize / 2 + (opt.strokeSize * (dist) / 100) * Math.cos(MyMath.degToRad(p));
    var p2Y = opt.strokeSize / 2 + (opt.strokeSize * (dist) / 100) * Math.sin(MyMath.degToRad(p));

    ctx.beginPath();
    ctx.moveTo(p1X, p1Y);
    ctx.lineTo(p2X, p2Y);
    ctx.lineWidth = opt.lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}
//position of the signs, the bigger is signSize the smaller is the font
function signsPosition(position, signSize){
    var p = 15; // 15 degrees
    var n = 0;
    while(n < 12){
        // see drawLines function for more infos
        var p1X = opt.strokeSize / 2 + (opt.strokeSize * position / 100) * Math.cos(MyMath.degToRad(p));
        var p1Y = opt.strokeSize / 2 + (opt.strokeSize * position / 100) * Math.sin(MyMath.degToRad(p));
        //we change the size of each item
        document.getElementsByClassName('signs')[n].style.height = (opt.strokeSize / 15) + 'px';
        document.getElementsByClassName('signs')[n].style.width = (opt.strokeSize / 15) + 'px';
        document.getElementsByClassName('signs')[n].style.fontSize = (opt.strokeSize / signSize) + 'px';
        //top left position of the block is strokeSize/5, we cut strokeSize/10 to align it from the center
        document.getElementsByClassName('signs')[n].style.marginLeft = (p1X-(opt.strokeSize/30))+'px';
        document.getElementsByClassName('signs')[n].style.marginTop = (p1Y-(opt.strokeSize/30))+'px';
        n++;
        p = p+30;
    }
}
//'x1 && x2' for radius in % of section's stroke size, 'deg' next line degree
function drawLines(x1, x2, deg, from, to, canvas){
    var c = document.getElementById(canvas);
    var ctx = c.getContext("2d");
    var p = MyMath.fixDeg(- from);
    var n = MyMath.fixDeg(from)/deg;
    while(n < (to/deg)){
        if ((deg == 90) || (deg == 30) || (p%30 !== 0)){ // we make sure to don't double lines (the long ones every 30 degrees)
            // p1X, p1Y && p2X, p2Y are the coordinate of the 2 dots we need to path
            // we use this to get them => x = x0 + r*cos(t) y = y0 + r*sin(t),
            // x0,y0 are the coordinates of the center r, the radius, t the angle
            var p1X = opt.strokeSize / 2 + (opt.strokeSize * x1 / 100) * Math.cos(MyMath.degToRad(p));
            var p1Y = opt.strokeSize / 2 + (opt.strokeSize * x1 / 100) * Math.sin(MyMath.degToRad(p));
            var p2X = opt.strokeSize / 2 + (opt.strokeSize * x2 / 100) * Math.cos(MyMath.degToRad(p));
            var p2Y = opt.strokeSize / 2 + (opt.strokeSize * x2 / 100) * Math.sin(MyMath.degToRad(p));
            ctx.lineWidth = opt.lineWidth * 0.6;
            ctx.beginPath();
            ctx.moveTo(p1X, p1Y);
            ctx.lineTo(p2X, p2Y);
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
        n++;
        p = p - deg;
    }
}
//x for radius in % of section's strokeSize
function drawCircle(x){
    var c = document.getElementById("myCanvas1"); //canvas
    var ctx = c.getContext("2d"); //Context
    ctx.beginPath();
    ctx.lineWidth = opt.lineWidth * 0.6;
    ctx.arc(opt.strokeSize / 2, opt.strokeSize / 2, opt.strokeSize * x/100, 0, 2 * Math.PI);
    ctx.stroke();
}
//setup position, stroke size
function setupCanvas(index){
    document.getElementById("section").style.width = opt.strokeSize+'px'; //apply section's strokeSize to width
    document.getElementById("section").style.height = opt.strokeSize+'px'; //apply section's strokeSize to height
    var c = document.getElementById("myCanvas"+index); //Canvas
    var ctx = c.getContext("2d"); //Context
    ctx.canvas.width  = opt.strokeSize; //change canvas width
    ctx.canvas.height = opt.strokeSize; //change canvas height
    ctx.clearRect(0, 0, opt.strokeSize, opt.strokeSize);
    opt.lineWidth = 1 + parseFloat(document.getElementById('strokeSize').value); //we want lineWidth to be relative to size of elements
}
// check fields values and assign them to the global variables
function checkFields(){
    //we check if we are on small media, if we are, we change the canvas size to fit screen size,
    // else we change if for the one we put on the options
    if (document.body.clientWidth <= 1024) {
        opt.strokeSize = document.body.clientWidth;
    }else{
        opt.strokeSize = screen.width * document.getElementById("strokeSize").value; //check section's strokeSize
    }
    opt.pRange = parseInt(document.getElementById("pRange").value);
    opt.nRange = parseInt(document.getElementById("nRange").value);
    opt.mRange = parseInt(document.getElementById("mRange").value);
}
// default values for buton default values
function defaultValues(){
    document.getElementById("pRange").value = '2';
    document.getElementById("nRange").value = '8';
    document.getElementById("mRange").value = '3';
    document.getElementById("strokeSize").value = 0.4;
}
//change colors of sign and ascendant
function astroSign(colorSign, colorAscendant, colorBoth){
    var sign = document.getElementsByClassName('signs'); //sign[i] will be the sign or ascendant
    var j = 60;  // range of sign will be between j and j-30

    for(var i = 0; i < sign.length; i++){
        sign[i].style.color = 'black';
    }

    for(i = 0; i < sign.length; i++){
        if (opt.run == false || (opt.speed > -2 && opt.speed < 2)){
            //we check where is house1 (ascendant)
            if(astro.house1 < j && astro.house1 >= (j-30)){
                sign[i].style.color = colorAscendant;
            }
        }
        //we check where is the sun (sign)
        if(ast.sunLongitude < j && ast.sunLongitude >= (j-30)){
            sign[i].style.color = colorSign;
            if (opt.run == false || (opt.speed > -2 && opt.speed < 2)){
                //we check where is house1 (ascendant)
                if(astro.house1 < j && astro.house1 >= (j-30)){
                    sign[i].style.color = colorBoth;
                }
            }
        }
        j -= 30;
        if (j === 0){ j = 360;}
    }
}
//for -1 < speed < 1
function speed1(){
    opt.speed = 1;
    document.getElementById('speed').value = 'speed: '+opt.speed;
    if (opt.run){
        if (opt.speed < -1 || opt.speed > 1){document.getElementById('housesBox').style.display = 'none';}
        else{document.getElementById('housesBox').style.display = '';}
    }
}
//for speed +=1
function speedUp(){
    opt.speed += 1;
    if (opt.speed >= 10){opt.speed = 9;}
    if (opt.speed == 0){opt.speed = 1;}
    document.getElementById('speed').value = 'speed: '+opt.speed;
    if (opt.run){
        if (opt.speed < -1 || opt.speed > 1){document.getElementById('housesBox').style.display = 'none';}
        else{document.getElementById('housesBox').style.display = '';}
    }
}
//for speed -=1
function speedDown(){
    opt.speed -= 1;
    if (opt.speed <= -10){opt.speed = -9;}
    if (opt.speed == 0){opt.speed = -1;}
    document.getElementById('speed').value = 'speed: '+opt.speed;
    if (opt.run){
        if (opt.speed < -1 || opt.speed > 1){document.getElementById('housesBox').style.display = 'none';}
        else{document.getElementById('housesBox').style.display = '';}
    }
}
//play function
function playMe(speed){
    var i;
    document.getElementById('speed').value = 'speed: '+opt.speed;
    var inputs = document.getElementsByClassName('varInputs');
    if (opt.run){ //if playing we clear interval and display houses
        for(i = 0; i < inputs.length; i++){inputs[i].readOnly = false;} //we can modify inputs
        document.getElementById('housesBox').style.display = '';
        document.getElementById('play').value = '▶';
        clearInterval(opt.playMe);
        opt.run = false;
        drawZodiac('none'); //drawZodiac
    } else{ //we set interval and hide houses if -1 < speed < 1
        for(i = 0; i < inputs.length; i++){inputs[i].readOnly = true;} //we dont modify inputs while running
        if (opt.speed < -1 || opt.speed > 1){document.getElementById('housesBox').style.display = 'none';}
        document.getElementById('play').value = '⏸';
        opt.run = true;
        opt.playMe = setInterval(run, 50);
    }
}
//function to run each frame
  /*  this one might be refactored  */
function run(){
    var planetLongitude ='none';
    if (opt.speed > 0) {
        if (opt.speed == 1) { //for speed 1 we increase sec by 33 each frame and update other values (min, hours)
            document.getElementById('sec').value = parseInt(document.getElementById('sec').value) + 33;
            if (parseInt(document.getElementById('sec').value) > 59) {
                document.getElementById('sec').value = parseInt(document.getElementById('sec').value) - 60;
                document.getElementById('min').value = parseInt(document.getElementById('min').value) + 1;
                if (parseInt(document.getElementById('min').value) > 59) {
                    document.getElementById('min').value = parseInt(document.getElementById('min').value) - 60;
                    document.getElementById('hour').value = parseInt(document.getElementById('hour').value) + 1;
                }
            }
        } else { //for speed > 1 we increase hours by 1 each frame
            document.getElementById('hour').value = parseInt(document.getElementById('hour').value) + opt.speed - 1;
        }
        if (parseInt(document.getElementById('hour').value) > 23) { //we update other values (month, year)
            document.getElementById('hour').value = parseInt(document.getElementById('hour').value) - 24;
            document.getElementById('day').value = parseInt(document.getElementById('day').value) + 1;
            if (checkDay()) {
                document.getElementById('day').value = 1;
                document.getElementById('month').value = parseInt(document.getElementById('month').value) + 1;
                if (parseInt(document.getElementById('month').value) > 12) {
                    document.getElementById('month').value = 1;
                    document.getElementById('year').value = parseInt(document.getElementById('year').value) + 1;
                }
            }
        }
    } else if(opt.speed < 0){ //reverse (same but we decrease values)
        if (opt.speed == -1) {
            document.getElementById('sec').value = parseInt(document.getElementById('sec').value) - 33;
            if (parseInt(document.getElementById('sec').value) < 0) {
                document.getElementById('sec').value = parseInt(document.getElementById('sec').value) + 60;
                document.getElementById('min').value = parseInt(document.getElementById('min').value) - 1;
                if (parseInt(document.getElementById('min').value) < 0) {
                    document.getElementById('min').value = 59;
                    document.getElementById('hour').value = parseInt(document.getElementById('hour').value) - 1;
                }
            }
        } else {
            document.getElementById('hour').value = parseInt(document.getElementById('hour').value) + opt.speed + 1;
        }
        if (parseInt(document.getElementById('hour').value) < 0) {
            document.getElementById('hour').value = parseInt(document.getElementById('hour').value) + 24;
            document.getElementById('day').value = parseInt(document.getElementById('day').value) - 1;
            if (parseInt(document.getElementById('day').value) < 1) {
                document.getElementById('day').value = 31;
                document.getElementById('month').value = parseInt(document.getElementById('month').value) - 1;
                while (checkDay()){
                    document.getElementById('day').value = parseInt(document.getElementById('day').value) - 1;
                }
                if (parseInt(document.getElementById('month').value) < 1) {
                    document.getElementById('month').value = 12;
                    document.getElementById('year').value = parseInt(document.getElementById('year').value) - 1;
                }
            }
        }
    }
    if (opt.speed < -1 || opt.speed > 1){
        dateValue();
        positions(); //calculate planetary positions
        // setup position/strokeSize of the canvas
        setupCanvas(2);
        astroSign('red', 'blue'); //change the color of sign and ascendant
        drawPlanets(35, 18, 20, 2.5); //put the planets on the canvas
        drawAspect(18, opt.pRange, opt.nRange, opt.mRange, planetLongitude); //draw the aspects
    } else{
        dateValue();
        positions(); //calculate planetary positions
        // setup position/strokeSize of the canvas
        setupCanvas(2); //setup 2nd canvas (2 -> id = myCanvas2)
        astroSign('red', 'blue', 'purple'); //change the color of sign and ascendant
        drawHouses(32, 18, 35, 1.5); //put the houses on the canvas
        drawPlanets(35, 18, 20, 2.5); //put the planets on the canvas
        drawAspect(18, opt.pRange, opt.nRange, opt.mRange, planetLongitude); //draw the aspects
    }
}