const databaseManager = {
    DBname: "tracksDB",
    trackStorageName: "audioTracks",
    DB: null,
    key: 0,
    tracksContainer: null,

    generateKey: () => {
        if (localStorage.getItem("trackKey")) {
            databaseManager.key = parseInt(localStorage.getItem("trackKey"));
            databaseManager.key = databaseManager.key + 1;
            localStorage.setItem("trackKey", databaseManager.key);
        } else {
            localStorage.setItem("trackKey", "0");
            databaseManager.key = parseInt(localStorage.getItem("trackKey"));
        }
    },

    initDatabase: () => {
        databaseManager.tracksContainer = document.querySelector(".tracks__container");

        const btnADDtrack = document.querySelector("#form__addtrack__btn__submit");
        btnADDtrack.addEventListener("click", () => {
            databaseManager.addTrack();
            const sectionADDtrack = document.querySelector(".audiohub__section__addtrack");
            deploySection(sectionADDtrack);
        });

        const request = indexedDB.open(databaseManager.DBname);

        request.addEventListener("error", databaseManager.showError);
        request.addEventListener("success", databaseManager.startDataBase);
        request.addEventListener("upgradeneeded", databaseManager.createStorage);
    },

    showError: (event) => {
        alert("Tuvimos u error cargando la música" + event.code + " / " + event.message);
    },

    startDataBase: (event) => {
        databaseManager.DB = event.target.result;

        const transaction = databaseManager.DB.transaction([databaseManager.trackStorageName]);
        const storage = transaction.objectStore(databaseManager.trackStorageName);
        const countRequest = storage.count();

        countRequest.onsuccess = () => {
            if (countRequest.result > 0) {
                databaseManager.printTracks();
            }
        };

    },

    createStorage: (event) => {
        const dataBase = event.target.result;
        const storage = dataBase.createObjectStore(databaseManager.trackStorageName, { keyPath: 'key' });
        storage.createIndex("lookForTrack", "trackName", { unique: false });
    },

    addTrack: () => {
        databaseManager.generateKey();
        const trackName = document.querySelector("#input__track__name").value;
        const artistName = document.querySelector("#input__track__artist").value;
        const track = document.querySelector("#input__add__track").files[0];

        const reader = new FileReader();
        reader.readAsArrayBuffer(track);
        reader.onload = function () {

            const audioData = reader.result;

            const transaction = databaseManager.DB.transaction([databaseManager.trackStorageName], "readwrite");
            const storage = transaction.objectStore(databaseManager.trackStorageName);
            transaction.addEventListener("complete", databaseManager.printTracks);

            const request = storage.add({
                key: databaseManager.key,
                trackName: trackName,
                artistName: artistName,
                audio: audioData
            });

            // Acceder a la clave del objeto que acabas de agregar
            request.onsuccess = function (event) {
                const insertedKey = event.target.result;
                console.log("Key del objeto insertado:", insertedKey);
            };
        };
    },

    printTracks: () => {
        databaseManager.tracksContainer.innerHTML = "";
    
        const transaction = databaseManager.DB.transaction([databaseManager.trackStorageName]);
        const storage = transaction.objectStore(databaseManager.trackStorageName);
    
        const pointer = storage.openCursor();
    
        pointer.addEventListener("success", (event) => {
            const pointer = event.target.result;
            if (pointer) {
                const trackKey = pointer.key;
    
                const trackDiv = document.createElement("div");
                trackDiv.classList.add("track");
    
                trackDiv.addEventListener("click", () => {
                    databaseManager.playTrack(trackKey);
                });
    
                trackDiv.innerHTML =
                    '<div class="track__img__container">' +
                    '<img name="trackIMG" src="assets/music/pista-images/audio__image__one.jpg" alt="">' +
                    '</div>' +
                    '<div class="track__description">' +
                    '<h3>' +
                    pointer.value.trackName +
                    '</h3>' +
                    '<h4>' +
                    pointer.value.artistName +
                    '</h4>' +
                    '</div>';
                databaseManager.tracksContainer.appendChild(trackDiv);
    
                pointer.continue();
            }
        });
    },
    

    playTrack: (trackKey) => {
        const section = document.querySelector("#audiohub__section__audioplayer");
        deploySection(section);
        console.log(trackKey);

        const transaction = databaseManager.DB.transaction([databaseManager.trackStorageName]);
        const storage = transaction.objectStore(databaseManager.trackStorageName);
        const request = storage.get(trackKey);

        request.onsuccess = function (event) {
            const result = event.target.result;

            const audioPlayer = document.querySelector(".audiohub__audioplayer");
            audioPlayer.innerHTML =
                '<div class="audioplayer__img__container">' +
                '<img src="assets/music/pista-images/audio__image__one.jpg" alt="">' +
                '</div>' +

                '<div class="audioplayer__container__description">' +
                '<h3>' +
                result.trackName +
                '</h3>' +
                '<h4>' +
                result.artistName +
                '</h4>' +
                '</div>';
        };

    }
}



