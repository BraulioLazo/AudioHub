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
}


window.addEventListener("load", startAudioHub);