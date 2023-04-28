
function deploySection(section) {
    document.body.classList.toggle("no-scroll");
    section.classList.toggle("deploy__section");
}

function activeSwitch() {
    const switchBTN = document.querySelectorAll(".switch");
    switchBTN.forEach(function (element, position) {
      element.addEventListener("click", ()=>{
        element.classList.toggle("move__switch")
      })
    });
}

activeSwitch();
