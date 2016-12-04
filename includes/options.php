<aside class="inputs">
    <input id="optionsMenu" class="showOptions hover-pointer not100" type="button" name="showHide" maxlength="1" value="options" size="5" onclick="showHide('options');" readonly/>
    <input id="speedDown" class="play hover-pointer padding-5" type="button" name="now" value="◀◀" onclick="speedDown();" readonly/>
    <input id="play" class="play hover-pointer padding-5" type="button" name="now" value="▶" onclick="playMe(1);" readonly/>
    <input id="speedUp" class="play hover-pointer padding-5" type="button" name="now" value="▶▶" onclick="speedUp();" readonly/>
    <input id="speed" class="speed hover-pointer padding-5" type="button" name="now" value="speed: 1" onclick="speed1();" readonly/>
    <div style="display: none;" class="menu" id="options">
        <div class="menu-inline">
            <input class="optionButtons hover-pointer" type="button" name="size" value="size" size="4" onclick="optionsToShow(0);" readonly/>
            <input class="optionButtons hover-pointer" type="button" name="size" value="aspects range" size="4" onclick="optionsToShow(1);" readonly/>
        </div>
        <div class="optionsToShow">
            <p id="hideSize" title="size of the canvas">size:
                <input class="optionInputs" id="strokeSize" type="text" name="size" maxlength="4" value="0.45" size="3"/>
            </p>
        </div>
        <div class="optionsToShow" style="display: none;">
            <p class="small-margin">
                positive aspects range(°):
                <input class="optionInputs" id="pRange" type="text" name="positive" maxlength="1" value="2" size="1"/>
            </p>
            <p class="small-margin">
                negative aspects range(°):
                <input class="optionInputs" id="nRange" type="text" name="negative" maxlength="1" value="8" size="1"/>
            </p>
            <p class="small-margin">
                moon aspects range(°):  +
                <input class="optionInputs" id="mRange" type="text" name="moon" maxlength="1" value="6" size="1"/>
            </p>
        </div>
        <input class="button" type="button" name="submit" value="restore default values" onclick="init();" readonly/>
        <input class="button" type="button" name="submit" value="submit options" onclick="checkFields(); drawZodiacBase(); calcZodiac();" readonly/>
    </div>
</aside>