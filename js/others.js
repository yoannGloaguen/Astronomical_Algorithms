//Other functions

//rotate items (used to rotate houses icons)
function rotate(elem, deg){
    elem.style.webkitTransform = 'rotate('+deg+'deg)';
    elem.style.mozTransform = 'rotate('+deg+'deg)';
    elem.style.msTransform = 'rotate('+deg+'deg)';
    elem.style.oTransform = 'rotate('+deg+'deg)';
    elem.style.transform = 'rotate('+deg+'deg)';
}
//to select next house
function nextHouse(house){
    if(house === astro.house1){ return astro.house2}
    else if(house === astro.house2){ return astro.house3}
    else if(house === astro.house3){ return astro.house4}
    else if(house === astro.house4){ return astro.house5}
    else if(house === astro.house5){ return astro.house6}
    else if(house === astro.house6){ return astro.house7}
    else if(house === astro.house7){ return astro.house8}
    else if(house === astro.house8){ return astro.house9}
    else if(house === astro.house9){ return astro.house10}
    else if(house === astro.house10){ return astro.house11}
    else if(house === astro.house11){ return astro.house12}
    else { return astro.house1}
}
// check odd houses return 0 for odd
function oddHouse(house){
    if(house === astro.house1 || house === astro.house3 || house === astro.house5
    || house === astro.house7 || house === astro.house9 || house === astro.house11){
        return 0}
    else { return 1}
}
//return 1 if longitude is for houses
function isHouses(longitude){
    if(longitude != astro.house1 && longitude != astro.house2 && longitude != astro.house3 && longitude != astro.house4
    && longitude != astro.house5 && longitude != astro.house6 && longitude != astro.house7 && longitude != astro.house8
    && longitude != astro.house9 && longitude != astro.house10 && longitude != astro.house11 && longitude != astro.house12)
    {return 0} else{return 1}
}