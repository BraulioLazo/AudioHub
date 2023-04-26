const audioPlayerManager = {
    audioPlayer: document.querySelector("#audioPlayer"),

    previousButton: document.querySelector("#btn__previous__track"),
    pauseButton: document.querySelector("#btn__pause"),
    playButton: document.querySelector("#btn__play"),
    stopButton: document.querySelector("#btn__stop"),
    nextButton: document.querySelector("#btn__next__track"),

    currentTimeDisplay: document.querySelector("#currentTime"),
    totalDurationDisplay: document.querySelector('#totalDuration'),

    play: () => {
        audioPlayerManager.audioPlayer.play();
    },

    pause: () => {
        audioPlayerManager.audioPlayer.pause();
    },

    stop: () => {
        audioPlayerManager.audioPlayer.pause();
        audioPlayerManager.audioPlayer.currentTime = 0;
    },

    onMetadataLoaded: (event) => {
        const totalDuration = audioPlayerManager.audioPlayer.duration;
        const totalMinutes = Math.floor(totalDuration / 60);
        const totalSeconds = Math.floor(totalDuration % 60);

        audioPlayerManager.totalDurationDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? "0" + totalSeconds : totalSeconds}`;
    },

    onTimeUpdate: () => {
        const currentTime = audioPlayerManager.audioPlayer.currentTime;
        const currentMinuts = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);

        audioPlayerManager.currentTimeDisplay.textContent = `${currentMinuts}:${currentSeconds < 10 ? "0" + currentSeconds : currentSeconds}`;
    },

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
    }
};


audioPlayerManager.init();