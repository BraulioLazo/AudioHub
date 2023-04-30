function startAudioHub() {

   databaseManager.initDatabase();


   document.querySelector("#add__track").onclick = () => {
      const sectionADDtrack = document.querySelector(".audiohub__section__addtrack");
      deploySection(sectionADDtrack);
   };

   document.querySelector("#add__album").onclick = () => {
      const sectionADDalbum = document.querySelector("#audiohub__section__addalbum");
      deploySection(sectionADDalbum);
   };

   document.querySelector(".tools__icon__container").onclick = () => {
      const sectionConfiguration = document.querySelector(".audiohub__section__configuration");
      deploySection(sectionConfiguration);
   };

   document.querySelector("#close__configuration").onclick = () => {
      const sectionConfiguration = document.querySelector(".audiohub__section__configuration");
      deploySection(sectionConfiguration);
   };

   const audioplayerBTN = document.querySelectorAll(".btn__audioPlayer");
   audioplayerBTN.forEach((element) => {
      element.addEventListener("click", () => {
         element.classList.add("btn__audioplayer__efect");
         setTimeout(() => {
            element.classList.remove("btn__audioplayer__efect");
         }, 300);
      });
   });

   document.querySelector("#full__screen__btn").onclick = () => {
      if (!fullScreenAPI.isFullScreenEnable) {
         fullScreenAPI.fullScreenCompatibility();
      } else {
         fullScreenAPI.cancelFullScreen();
      }
   };

   document.addEventListener("fullscreenchange", fullScreenAPI.handleFullScreenChange);
}


window.addEventListener("load", startAudioHub);