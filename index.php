<!DOCTYPE html>
<html lang="en">
<head>
    <title>360 degrees</title>
    <meta charset="utf-8">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="css/style.css"/>
    <script type="text/javascript" src="js/buttons.js"></script> <!--functions for main interface-->
    <script type="text/javascript" src="js/draw.js"></script> <!--the functions that display things inside the canvas-->
    <script type="text/javascript" src="js/MyMath.js"></script> <!--mathematics functions-->
    <!--the functions that calculate periodic terms of planets-->
    <script type="text/javascript" src="js/astralPositions.js"></script>
    <script type="text/javascript" src="js/Arguments.js"></script>
    <script type="text/javascript" src="js/houses.js"></script> <!--the functions that calculate houses position-->
    <script type="text/javascript" src="js/Grab.js"></script> <!-- for window grabbing-->
    <script type="text/javascript" src="js/date.js"></script> <!-- for date-->
    <script type="text/javascript" src="js/others.js"></script> <!-- other functions for various things-->
    <script type="text/javascript" src="js/WindowScale.js"></script> <!-- other functions for various things-->
    <link rel="stylesheet" media="screen and (max-width: 1024px)" href="css/smallMedia.css" type="text/css" />
    <link rel="stylesheet" media="(orientation:portrait)" href="css/smallMedia.css" type="text/css" />
</head>
    <body onmousedown="if (opt.run == false && opt.updated == false){ drawZodiac('none');}">
        <aside id ="variablesBox" class="variables">
            <?php include 'includes/inputs.php' ?> <!--contain the variables to show-->
        </aside>
        <?php include 'includes/canvas.php' ?> <!--the section where all the stuff is displayed-->
        <!--<div class="bigMedia">
            <div class="jMDiv">wip using Jean Meeus - <a class="jMLink" href="Astronomical Algorithms 2.pdf" target="_blank">"astronomical algorithms"</a></div>
        </div>-->
        <script>init();</script> <!-- initialize values on load -->
    </body>
</html>