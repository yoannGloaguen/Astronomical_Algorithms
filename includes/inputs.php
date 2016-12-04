<div id="grabber" class="grabber">
    <div class="scaleX" onmousedown="if(document.body.clientWidth > 1024) {WindowScale.start_scaleX(document.getElementById('grabber'), event)}"></div>
    <div class="menuTime hover-grab" onmousedown="if(document.body.clientWidth > 1024) {Grab.start_drag(document.getElementById('grabber'), event)};">
        <input id="dateValue" class ="padding-5 hover-grab" type="button" name="birth" maxlength="4" value="date" size="5" readonly/>
    </div>
    <div class="showHide" onclick="showHide('birth');">◻</div>
    <div id='birth' class="menu">
        <?php include 'options.php' ?> <!--contain the inputs-->
        <div class="now-hereValues">
            <input class="now-here hover-pointer padding-5" type="button" name="now" value="now" onclick="if(!opt.run){dateNow();}" readonly/>
            <input class="now-here hover-pointer padding-5" type="button" name="here" value="here" onclick="if(!opt.run){localPositions();}" readonly/>
        </div>
        <p>day:
            <input class="varInputs" id="day" type="text" name="day" maxlength="2" value="27" size="1" onkeyup="if(!opt.run){validate('day', false);}"/>
            month:
            <input class="varInputs" id="month" type="text" name="month" maxlength="2" value="05" size="1" onkeyup="if(!opt.run){validate('month', false);}"/>
            year:
            <input class="varInputs" id="year" type="text" name="year" maxlength="4" value="1986" size="3" onkeyup="if(!opt.run){validate('year', false);}"/>
        </p>
        <p>time <em>(utc)</em>
            h: <input class="varInputs" id="hour" type="text" name="hour" maxlength="2" value="19" size="1" onkeyup="if(!opt.run){validate('hour', false);}"/>
            min: <input class="varInputs" id="min" type="text" name="min" maxlength="2" value="55" size="1" onkeyup="if(!opt.run){validate('min', false);}"/>
            s: <input class="varInputs" id="sec" type="text" name="sec" maxlength="2" value="00" size="1" onkeyup="if(!opt.run){validate('sec', false);}"/>
        </p>
        <p>latitude <em>(°dec)</em>:
            <input class="varInputs" id="latitude" type="text" name="latitude" maxlength="6" value="+45.71" size="5" onkeyup="if(!opt.run){validate('latitude', false);}"/>
            longitude <em>(°dec)</em>:
            <input class="varInputs" id="longitude" type="text" name="longitude" maxlength="7" value="+004.80" size="6" onkeyup="if(!opt.run){validate('longitude', false);}"/>
        </p>
        <div  class ="message none" id="validateDay"><p>bad value for day</p></div>
        <div  class ="message none" id="validateMonth"><p>month require a value between 1 and 12</p></div>
        <div  class ="message none" id="validateYear"><p>year require a rounded</p></div>
        <div  class ="message none" id="validateHour"><p>hour require a value between 0 and 23</p></div>
        <div  class ="message none" id="validateMin"><p>minute require a value between 0 and 59</p></div>
        <div  class ="message none" id="validateSec"><p>second require a value between 0 and 59</p></div>

        <div  class ="message none" id="validateLat"><p>latitude require a value between -90 and +90</p></div>
        <div  class ="message none" id="validateLon"><p>longitude require a value between -180 and +180</p></div>
        <div class="message none" id="loading"><p id="loadingMessage">loading coordinates</p></div>
    </div>
    <?php include 'includes/variables.php' ?>
</div>