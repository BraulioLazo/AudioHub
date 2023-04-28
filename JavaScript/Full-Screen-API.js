const fullScreenAPI = {

    isFullScreenEnable: false,

    goFullScreen: () => {
        try {

            if (fullScreenAPI.isFullScreenEnable) {
                console.log('Full Screen ya esta habilitada');
                return;
            }

            const main = document.querySelector("main");
            if (main.requestFullscreen) {
                main.requestFullscreen();
            } else if (main.webkitRequestFullscreen) {
                main.webkitRequestFullscreen();
            } else if (main.msRequestFullscreen) {
                main.msRequestFullscreen();
            }

            fullScreenAPI.isFullScreenEnable = true;

        } catch (error) {
            console.error("Error en la peticion de FULL SCREEN: " + error);
        }
    },

    cancelFullScreen: () => {
        try {

            if (!fullScreenAPI.isFullScreenEnable) {
                console.log("Full Screen ya esta desabilitada");
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
            console.error("Error al desabilitar FULL SCREEN: " + error);
        }
    }
};