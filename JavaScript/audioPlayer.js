const audioPlayerManager = {
    audioPlayer: document.querySelector("#audioPlayer"),

    previousButton: document.querySelector("#btn__previous__track"),
    pauseButton: document.querySelector("#btn__pause"),
    playButton: document.querySelector("#btn__play"),
    stopButton: document.querySelector("#btn__stop"),
    nextButton: document.querySelector("#btn__next__track"),

    currentTimeDisplay: document.querySelector("#currentTime"),
    totalDurationDisplay: document.querySelector('#totalDuration'),

    totalDurationSeconds: 0,

    currentTrackKey: null,

    play: () => {
        audioPlayerManager.audioPlayer.play();
    },

    pause: () => {
        audioPlayerManager.audioPlayer.pause();
    },

    stop: () => {
        audioPlayerManager.audioPlayer.pause();
        audioPlayerManager.audioPlayer.currentTime = 0;
        audioPlayerManager.remainingDurationSeconds = audioPlayerManager.totalDurationSeconds;

        document.querySelector(".progress").style.width = "0%";
    },

    onMetadataLoaded: (event) => {
        const totalDuration = audioPlayerManager.audioPlayer.duration;
        const totalMinutes = Math.floor(totalDuration / 60);
        const totalSeconds = Math.floor(totalDuration % 60);
        audioPlayerManager.totalDurationSeconds = totalMinutes * 60 + totalSeconds;
        audioPlayerManager.remainingDurationSeconds = audioPlayerManager.totalDurationSeconds;

        audioPlayerManager.totalDurationDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? "0" + totalSeconds : totalSeconds}`;
    },

    onTimeUpdate: () => {
        const currentTime = audioPlayerManager.audioPlayer.currentTime;
        const currentMinuts = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);

        audioPlayerManager.currentTimeDisplay.textContent = `${currentMinuts}:${currentSeconds < 10 ? "0" + currentSeconds : currentSeconds}`;

        // Actualiza la barra de progreso
        const progressPercentage = (currentTime / audioPlayerManager.totalDurationSeconds) * 100;
        document.querySelector(".progress").style.width = `${progressPercentage}%`;
    },

    playNextTrack: () => {
        const transaction = databaseManager.DB.transaction([databaseManager.trackStorageName]);
        const storage = transaction.objectStore(databaseManager.trackStorageName);
        const request = storage.getAllKeys();

        request.onsuccess = () => {
            const trackKeys = request.result;
            console.log(trackKeys)


            if (!trackKeys.length) {
                console.log("No hay pistas disponibles.");
                return;
            }

            let currentTrackIndex = trackKeys.indexOf(audioPlayerManager.currentTrackKey);
            let nextTrackKey;

            if (currentTrackIndex < 0 || currentTrackIndex === trackKeys.length - 1) {
                // Si no se encuentra la llave actual, o es la última del arreglo,
                // se reproduce la primera pista del arreglo
                nextTrackKey = trackKeys[0];
            } else {
                // De lo contrario, se reproduce la siguiente pista en el arreglo
                nextTrackKey = trackKeys[currentTrackIndex + 1];
            }
            databaseManager.playTrack(nextTrackKey, () => {
                audioPlayerManager.play();
            });
        }; 
    },

    playPreviousTrack: () => {
        const transaction = databaseManager.DB.transaction([databaseManager.trackStorageName]);
        const storage = transaction.objectStore(databaseManager.trackStorageName);
        const getAllKeysRequest = storage.getAllKeys();
      
        getAllKeysRequest.onsuccess = () => {
          const trackKeys = getAllKeysRequest.result;
          const currentTrackIndex = trackKeys.indexOf(audioPlayerManager.currentTrackKey);
          let previousTrackKey = null;
      
          if (currentTrackIndex <= 0) {
            // Si no se encuentra la llave actual, o es la primera del arreglo,
            // se reproduce la última pista del arreglo
            previousTrackKey = trackKeys[trackKeys.length - 1];
          } else {
            // De lo contrario, se reproduce la pista anterior en el arreglo
            previousTrackKey = trackKeys[currentTrackIndex - 1];
          }
      
          databaseManager.playTrack(previousTrackKey, () => {
            audioPlayerManager.play();
          });
        };
      }
      ,

    init: () => {
        audioPlayerManager.playButton.addEventListener("click", () => {
            audioPlayerManager.play();
        });

        audioPlayerManager.pauseButton.addEventListener("click", () => {
            audioPlayerManager.pause();
        });

        audioPlayerManager.stopButton.addEventListener("click", () => {
            audioPlayerManager.stop();
        });

        audioPlayerManager.audioPlayer.addEventListener("loadedmetadata", audioPlayerManager.onMetadataLoaded);
        audioPlayerManager.audioPlayer.addEventListener("timeupdate", audioPlayerManager.onTimeUpdate);

        audioPlayerManager.audioPlayer.addEventListener("ended", () => {
            audioPlayerManager.playNextTrack();
        });

        audioPlayerManager.nextButton.addEventListener("click", () => {
            audioPlayerManager.playNextTrack();
        });

        audioPlayerManager.previousButton.addEventListener("click", () => {
            audioPlayerManager.playPreviousTrack();
        });

    }
};


audioPlayerManager.init();