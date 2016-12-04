//same as Grab.js but to scale elements

var scaled = null;
var scaledDirection = 'y';

var WindowScale = {
    dY: 0,
    dX: 0,

    scaleInit: function(){
        document.getElementById('astronomic').style.height = '200px';
        this.addEvent(document,'mousemove',this.scale_onmousemove);
        this.addEvent(document,'mouseup',this.scale_onmouseup);
    },

    start_scaleY: function(object,event)
    {
        scaledDirection = 'y';
        scaled = object;

        event.returnValue = false;
        if( event.preventDefault ) event.preventDefault();

        //Coordonnées de l'élément
        var element = object;
        var eY = 0;
        do{
            eY += element.offsetTop;
            element = element.offsetParent;
        } while(element);

        //Calcul du décallage
        dY = eY;
    },
    start_scaleX: function(object,event)
    {
        scaledDirection = 'x';
        scaled = object;

        event.returnValue = false;
        if( event.preventDefault ) event.preventDefault();

        //Coordonnées de l'élément
        var element = object;
        var eX = 0;
        do{
            eX += element.offsetLeft;
            element = element.offsetParent;
        } while(element);

        //Calcul du décallage
        dX = eX;
    },
    scale_onmousemove: function(event){
        var y = event.clientY + window.scrollY;
        var x = event.clientX + window.scrollX;
        if(scaled){
            if(scaledDirection == 'y'){
                y -= dY;
                scaled.style.height = y + 'px';
            } else{
                x -= dX;
                scaled.style.width = x + 'px';
            }
        }
    },
    scale_onmouseup: function(){
        scaled = null;
    },

    addEvent: function(obj,event,fct){
        if( obj.attachEvent)
            obj.attachEvent('on' + event,fct);
        else
            obj.addEventListener(event,fct,true);
    }
};