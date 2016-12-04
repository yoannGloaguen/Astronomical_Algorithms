<section id="section" class="hover-grab" onmousedown="if(document.body.clientWidth > 1024) {Grab.start_drag(document.getElementById('section'), event)};">
    <canvas id="myCanvas1"></canvas>
    <!--signs-->
    <div class="signs"><div>♉</div></div>
    <div class="signs"><div>♈</div></div>
    <div class="signs"><div>♓</div></div>
    <div class="signs"><div>♒</div></div>
    <div class="signs"><div>♑</div></div>
    <div class="signs"><div>♐</div></div>
    <div class="signs"><div>♏</div></div>
    <div class="signs"><div>♎</div></div>
    <div class="signs"><div>♍</div></div>
    <div class="signs"><div>♌</div></div>
    <div class="signs"><div>♋</div></div>
    <div class="signs"><div>♊</div></div>
    <canvas id="myCanvas2"></canvas>
    <!--houses-->
    <span id="housesBox">
        <div class="signs" id="house1" onmouseover="showVariables(astro.house1);">
            <span class="houses">I<span class="none" id="house1Infos"></span></span>
        </div>
        <div class="signs" id="house2">
            <span class="houses">II<span class="none" id="house2Infos"></span></span>
        </div>
        <div class="signs" id="house3">
            <span class="houses">III<span class="none" id="house3Infos"></span></span>
        </div>
        <div class="signs" id="house4">
            <span class="houses">IV<span class="none" id="house4Infos"></span></span>
        </div>
        <div class="signs" id="house5">
            <span class="houses">V<span class="none" id="house5Infos"></span></span>
        </div>
        <div class="signs" id="house6">
            <span class="houses">VI<span class="none" id="house6Infos"></span></span>
        </div>
        <div class="signs" id="house7">
            <span class="houses">VII<span class="none" id="house7Infos"></span></span>
        </div>
        <div class="signs" id="house8">
            <span class="houses">VIII<span class="none" id="house8Infos"></span></span>
        </div>
        <div class="signs" id="house9">
            <span class="houses">IX<span class="none" id="house9Infos"></span></span>
        </div>
        <div class="signs" id="house10" onmouseover="showVariables(astro.house10);">
            <span class="houses">X<span class="none" id="house10Infos"></span></span>
        </div>
        <div class="signs" id="house11">
            <span class="houses">XI<span class="none" id="house11Infos"></span></span>
        </div>
        <div class="signs" id="house12">
            <span class="houses">XII<span class="none" id="house12Infos"></span></span>
        </div>
    </span>
    <!--planets-->
    <div class="signs hover-p" id="moon" onmouseover="showVariables(ast.moonLongitude);">
        <div>
            &nbsp;<span>☽<span id="moonInfos"></span></span>&nbsp;
        </div>
    </div>
    <div class="signs hover-p" id="mercury" onmouseover="showVariables(ast.mercuryLongitude);">
        <div>
            &nbsp;<span>☿<span id="mercuryInfos"></span></span>&nbsp;
        </div>
    </div>
    <div class="signs hover-p" id="venus" onmouseover="showVariables(ast.venusLongitude);">
        <div>
            &nbsp;<span>♀<span id="venusInfos"></span></span>&nbsp;
        </div>
    </div>
    <div class="signs hover-p" id="mars" onmouseover="showVariables(ast.marsLongitude);">
        <div>
            &nbsp;<span>♂<span id="marsInfos"></span></span>&nbsp;
        </div>
    </div>
    <div class="signs hover-p" id="jupiter" onmouseover="showVariables(ast.jupiterLongitude);">
        <div>
            &nbsp;<span>♃<span id="jupiterInfos"></span></span>&nbsp;
        </div>
    </div>
    <div class="signs hover-p" id="saturn" onmouseover="showVariables(ast.saturnLongitude);">
        <div>
            &nbsp;<span>♄<span id="saturnInfos"></span></span>&nbsp;
        </div>
    </div>
    <div class="signs hover-p" id="uranus" onmouseover="showVariables(ast.uranusLongitude);">
        <div>
            &nbsp;<span>♅<span id="uranusInfos"></span></span>&nbsp;
        </div>
    </div>
    <div class="signs hover-p" id="neptune" onmouseover="showVariables(ast.neptuneLongitude);">
        <div>
            &nbsp;<span>♆<span id="neptuneInfos"></span></span>&nbsp;
        </div>
    </div>
    <div class="signs hover-p" id="sun" onmouseover="showVariables(ast.sunLongitude);">
        <div>
            &nbsp;<span>☉<span id="sunInfos"></span></span>&nbsp;
        </div>
    </div>
</section>