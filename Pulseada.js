var onDeviceReady = function() {         
    var pantalla_pulseada = $("#pantalla_pulseada");
    var _this = this;
    var login = new PantallaLogin({
        callback_usuario: function(un_usuario){
            campo_de_juego = new CampoDeJuego({usuario: un_usuario, 
                                                   canvas:$("#canvas_campo_de_juego")});   
            $.mobile.changePage (pantalla_pulseada, { transition: "flip"});
        }
    });
};

$(document).ready(function() {  
    // are we running in native app or in browser?
    window.isphone = false;
    if(document.URL.indexOf("file://") == -1) {
        window.isphone = true;
    }

    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});

