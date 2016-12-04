/* from OpenClassRoom (the page is no longer available) */
//basic function to grab elements

var dragged = null;
var Grab = {
	dX: 0,
	dY: 0,

	//we setup section position manually because weird things append with margin: auto
	grabInit: function(){
		document.getElementById('grabber').style.top = '20px';
		document.getElementById('grabber').style.left = '20px';
		document.getElementById('section').style.left =
		((document.body.clientWidth - document.getElementById('section').clientWidth) / 1.2)+'px';
		this.addEvent(document,'mousemove', this.drag_onmousemove);
		this.addEvent(document,'mouseup', this.drag_onmouseup);
	},

	start_drag: function(object,event)
	{
		dragged = object;

		event.returnValue = false;
		if( event.preventDefault ) event.preventDefault();

		//Coordonnées de la souris
		var x = event.clientX + window.scrollX;
		var y = event.clientY + window.scrollY;

		//Coordonnées de l'élément
		var eX = 0;
		var eY = 0;
		var element = object;
		do{
			eX += element.offsetLeft;
			eY += element.offsetTop;
			element = element.offsetParent;
		} while( element);

		//Calcul du décallage
		dX = x - eX;
		dY = y - eY;
	},
	drag_onmousemove: function(event){
		var x = event.clientX + window.scrollX;
		var y = event.clientY + window.scrollY;
		if( dragged != null){
			x -= dX;
			y -= dY;
			dragged.style.left = x + 'px';
			dragged.style.top = y + 'px';
		}

	},
	drag_onmouseup: function(){
		if (dragged != document.getElementById('section')){
			if (dragged.offsetTop <= 0){
				dragged.style.top = 0;
			}
			if (dragged.offsetLeft <= 0){
				dragged.style.left = 0;
			}
		}
		dragged = null;
	},

	addEvent: function(obj,event,fct){
		if( obj.attachEvent)
			obj.attachEvent('on' + event,fct);
		else
			obj.addEventListener(event,fct,true);
	}
};