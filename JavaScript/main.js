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
}


window.addEventListener("load", startAudioHub);