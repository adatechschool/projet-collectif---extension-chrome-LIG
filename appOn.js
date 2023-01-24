//on écoute le changement du storage déclenché par le bouton de la popup
chrome.storage.onChanged.addListener(() => {
    chrome.storage.local.get(["toggle"]).then ((result) => {
        console.log(result.toggle)
        if (result.toggle == true){
            console.log("ça marche")
            contrast();
            createLoupe(); 
        } else {
            console.log("ça marche aussi");
            noContrast();
            deleteLoupe();
        }
    })
})
    //puis on lance le changement de contraste et la loupe.
    
function noContrast(){
    document.body.style.filter = "invert(0) hue-rotate(180deg)"
    document.body.style.fontSize = "medium"
    let media = document.querySelectorAll("img, picture, video")
    media.forEach((mediaItem) =>{
    mediaItem.style.filter = "invert(0) hue-rotate(180deg)"
    })
}    
      
        
        



function contrast (){
    // creer le contraste de la page web. modifiaction du css via js.

    document.body.style.filter = "invert(1) hue-rotate(180deg)"
    document.body.style.fontSize = "xx-large"
    let media = document.querySelectorAll("img, picture, video")
    media.forEach((mediaItem) =>{
    mediaItem.style.filter = "invert(1) hue-rotate(180deg)"
    })
}

function createLoupe (){
    // creation de la loupe
    let loupe = document.createElement('div');
    loupe.setAttribute('id','loupe');
    document.body.appendChild(loupe);

    // css de la loupe
    loupe.style.width = "100px"
    loupe.style.height = "100px"
    loupe.style.borderRadius = "60px"
    loupe.style.border = "solid 3px rgb(212, 8, 42)"
    loupe.style.position = "absolute"

    // zoom et mouvement de la loupe
    let zoom = 1
    document.body.onmousemove = function(){
        loupe.style.left = event.clientX + "px";
        loupe.style.top = event.clientY + "px";
        loupe.style.backgroundSize = (1000 * zoom) + "px";
        loupe.style.backgroundPosition = ((-loupe.offsetLeft * zoom) - 150) + "px " + ((-loupe.offsetTop * zoom) - 150) + "px ";
    }
}

function deleteLoupe (){
    loupe.style.display = "none"
}