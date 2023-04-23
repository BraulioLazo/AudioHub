const databaseManager = {
    DBname: "tracksDB",
    storageName: "audioTracks",
    DB: null,
    key: 0,

    initDatabase: () => {
        const btnADDtrack = document.querySelector("#form__addtrack__btn__submit");
        btnADDtrack.addEventListener("click", databaseManager.addTrack);

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
    },

    createStorage: (event) => {
        const dataBase = event.target.result;
        const storage = dataBase.createObjectStore(databaseManager.storageName, { keyPath: 'key', autoIncrement: true });
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

            const transaction = databaseManager.DB.transaction(databaseManager.storageName, "readwrite");
            const storage = transaction.objectStore(databaseManager.storageName);

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
    }
}



