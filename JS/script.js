const topLayer = document.querySelector(".topLayer");

const enableBtn = document.getElementById("maskEnable");
const disableBtn = document.getElementById("maskDisable");


let mouseX =0 , mouseY=0;
let currentX =0, currentY=0;
let radius = 40;
let targetRadius = 150;

const topMain = document.querySelector(".topLayer main");
const bottomMain = document.querySelector(".bottomLayer main");


function animate(){
    currentX += (mouseX -currentX) *0.1;
    currentY += (mouseY -currentY) *0.1;

    document.documentElement.style.setProperty("--x" , currentX+ "px");
    document.documentElement.style.setProperty("--y" , currentY + "px");

    requestAnimationFrame(animate);
}


function animateRadius(){
    radius += (targetRadius-radius)*0.1;

    document.documentElement.style.setProperty("--r" , radius + "px");
    requestAnimationFrame(animateRadius);
}

function syncHeight() {
    const maxHeight = Math.max( topMain.scrollHeight , bottomMain.scrollHeight);

    topMain.style.maxHeight = maxHeight + "px";
    bottomMain.style.maxHeight = maxHeight + "px";
}


topLayer.classList.remove("no-interaction");

enableBtn.addEventListener("click", (e) => {
    topLayer.classList.remove("mask-off");
    topLayer.classList.add("no-interaction");
    enableBtn.style.display = "none";

    const rect = e.currentTarget.getBoundingClientRect();

    const startX = rect.left + (rect.width/2);
    const startY = rect.top + (rect.height/2);

    document.documentElement.style.setProperty("--x" , startX + "px");
    document.documentElement.style.setProperty("--y" , startY + "px");

    radius = 0
    targetRadius = 150

    
});



disableBtn.addEventListener("click" , (e) =>{
    topLayer.classList.remove("no-interaction");
    enableBtn.style.display = "block";

    const rect = e.currentTarget.getBoundingClientRect();

    const startX = rect.left + (rect.width/2);
    const startY = rect.top + (rect.height/2);

    document.documentElement.style.setProperty("--x" , startX + "px");
    document.documentElement.style.setProperty("--y" , startY + "px");

    targetRadius = 0;

    setTimeout(() => {
        topLayer.classList.add("mask-off");
    },300);

    

})


document.addEventListener("mousemove" ,(e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
} )


window.addEventListener("load" , syncHeight());
window.addEventListener("resize" , syncHeight());
animateRadius();
animate();