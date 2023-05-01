function startAudioHub() {

   databaseManager.initDatabase();

   // DESPLEGAR el formulario para agregar PISTA
   document.querySelector("#add__track").onclick = () => {
      const sectionADDtrack = document.querySelector(".audiohub__section__addtrack");
      deploySection(sectionADDtrack);
   };

   // DESPLEGAR el formulario para AGREGAR ALBUM
   document.querySelector("#add__album").onclick = () => {
      const sectionADDalbum = document.querySelector("#audiohub__section__addalbum");
      deploySection(sectionADDalbum);
   };

   // DESPLEGAR el menu de CONFIGURACION
   document.querySelector(".tools__icon__container").onclick = () => {
      const sectionConfiguration = document.querySelector(".audiohub__section__configuration");
      deploySection(sectionConfiguration);
   };

   // CERRAR el menu de CONFIGURACION
   document.querySelector("#close__configuration").onclick = () => {
      const sectionConfiguration = document.querySelector(".audiohub__section__configuration");
      deploySection(sectionConfiguration);
   };

   // Efecto en botones del AudioPlayer
   const audioplayerBTN = document.querySelectorAll(".btn__audioPlayer");
   audioplayerBTN.forEach((element) => {
      element.addEventListener("click", () => {
         element.classList.add("btn__audioplayer__efect");
         setTimeout(() => {
            element.classList.remove("btn__audioplayer__efect");
         }, 300);
      });
   });

   // Desplegar FULL SCREEN
   document.querySelector("#full__screen__btn").onclick = () => {
      if (!fullScreenAPI.isFullScreenEnable) {
         fullScreenAPI.fullScreenCompatibility();
      } else {
         fullScreenAPI.cancelFullScreen();
      }
   };

   document.addEventListener("fullscreenchange", fullScreenAPI.handleFullScreenChange);

   // MINIMIZAR el reproductor
   document.querySelector("#collapse__audioplayer").onclick = () => {
      const sectionAudioplayer = document.querySelector("#audiohub__section__audioplayer");
      sectionAudioplayer.classList.add("minimize__audioplayer");
   };

   // MAXIMIZAR el reproductor
   document.querySelector("#audiohub__section__audioplayer").onclick = (event) => {
      
      const sectionAudioplayer = document.querySelector("#audiohub__section__audioplayer");

      if (event.target.classList.contains("audioplayer__child")) {
         sectionAudioplayer.classList.remove("minimize__audioplayer");
      }
   };
}


window.addEventListener("load", startAudioHub);