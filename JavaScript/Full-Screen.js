const fullScreenAPI = {

    isFullScreenEnable: false,

    fullScreenCompatibility: () => {
        if (document.fullscreenEnabled) {
            fullScreenAPI.goFullScreen();
        } else {
            console.error("El navegador no es compatible con el api full Screen");
        }
    },

    goFullScreen: () => {

        try {


            if (fullScreenAPI.isFullScreenEnable) {
                console.log("Full Screen ya esta activo");
                return;
            }

            const fullScreenElement = document.querySelector("body");
            if (fullScreenElement.requestFullscreen) {
                fullScreenElement.requestFullscreen();

            } else if (fullScreenElement.webkitRequestFullscreen) {
                fullScreenElement.webkitRequestFullscreen();

            } else if (fullScreenElement.msRequestFullscreen) {
                fullScreenElement.msRequestFullscreen();
            }

            fullScreenAPI.isFullScreenEnable = true;
        } catch (error) {
            console.error("El navegador no es compatible con el api full Screen");
        }
    },

    cancelFullScreen: () => {

        try {

            if (!fullScreenAPI.isFullScreenEnable) {
                console.log("Full Screen ya esta desactivado");
                return;
            }

            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

            fullScreenAPI.isFullScreenEnable = false;

        } catch (error) {
            console.error("Error al salir de pantalla completa");
        }
    },

    handleFullScreenChange: () => {

        if (document.fullscreenElement) {
            document.body.classList.add("fullscreen-scroll");
            document.querySelector(".full__screen__switch").classList.add("move__switch");
            
            fullScreenAPI.isFullScreenEnable = true;

        } else {
            document.body.classList.remove("fullscreen-scroll");
            document.querySelector(".full__screen__switch").classList.remove("move__switch");

            fullScreenAPI.isFullScreenEnable = false;
        }
    }
};