const databaseManager = {
    DBname: "tracksDB",
    trackStorageName: "audioTracks",
    DB: null,
    tracksContainer: null,

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
        const storage = dataBase.createObjectStore(databaseManager.trackStorageName, { keyPath: 'key', autoIncrement: true });
        storage.createIndex("lookForTrack", "trackName", { unique: false });
    },

    addTrack: () => {
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

        document.querySelector("#input__track__name").value = "";
        document.querySelector("#input__track__artist").value = "";
        document.querySelector("#input__add__track").value = "";
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
                    const section = document.querySelector("#audiohub__section__audioplayer");
                    deploySection(section);
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


    playTrack: (trackKey, callback) => {
        const transaction = databaseManager.DB.transaction([databaseManager.trackStorageName]);
        const storage = transaction.objectStore(databaseManager.trackStorageName);
        const request = storage.get(trackKey);

        request.onsuccess = function (event) {
            const result = event.target.result;

            const audioData = new Blob([result.audio], { type: 'audio/mpeg' });
            const audioURL = URL.createObjectURL(audioData);
            const audioPlayer = document.querySelector("#audioPlayer");
            audioPlayer.setAttribute("src", audioURL);

            audioPlayer.addEventListener("error", (event) => {
                console.error("Error al cargar o reproducir el archivo de audio:", event);
                console.error("Código de error:", audioPlayer.error.code);
            });

            const trackNameContainer = document.querySelector("#h3__track__name");
            trackNameContainer.innerHTML = result.trackName;

            const artistNameContainer = document.querySelector("#h4__artist__name");
            artistNameContainer.innerHTML = result.artistName;

            // Ejecutar el callback si se proporciona uno
            if (callback) {
                callback();
            }
        };
        audioPlayerManager.currentTrackKey = trackKey;
    }


}



