var PantallaDeInicio = function(opt){
    this.o = opt;
    this.start();
};

PantallaDeInicio.prototype.start = function (un_panel) {
    this.ui = $('#pantalla_de_inicio');
    this.txt_nombre_jugador_1 = this.ui.find('#txt_nombre_jugador_1');
    this.txt_nombre_jugador_2 = this.ui.find('#txt_nombre_jugador_2');
    this.txt_nombre_partida = this.ui.find('#txt_nombre_partida');
    this.btn_crear_partida = this.ui.find("#btn_crear_partida");
    this.btn_unirse_a_partida = this.ui.find("#btn_unirse_a_partida");

    var _this = this;
    this.btn_crear_partida.click(function () {
        var nombre_partida = _this.txt_nombre_partida.val();
        _this.iniciarVistaYJugadores();
        var partida = new PartidaDePulseada({ nombre: nombre_partida});
    });
    
    this.btn_unirse_a_partida.click(function () {
        _this.iniciarVistaYJugadores();
    });
};

PantallaDeInicio.prototype.iniciarVistaYJugadores = function () {
    var nombre_partida = this.txt_nombre_partida.val();
    var vista_partida = new VistaDeUnaPartida({partida: nombre_partida});
    var nombre_jugador_1 = this.txt_nombre_jugador_1.val().trim();
    var nombre_jugador_2 = this.txt_nombre_jugador_2.val().trim();
    if(nombre_jugador_1 != ""){
        var jugador_1 = new Joystick({ jugador: nombre_jugador_1,
            partida: nombre_partida,
            posicion_vista: new paper.Point(paper.project.view.size.width - 100, paper.project.view.size.height - 100),
            cursores: { left: 37, up: 38, right: 39, down: 40 }
        });
    }
    if(nombre_jugador_2 != ""){
        var jugador_2 = new Joystick({ jugador: nombre_jugador_2,
            partida: nombre_partida,
            posicion_vista: new paper.Point(100, paper.project.view.size.height - 100), 
            cursores: { left: 65, up: 87, right: 68, down: 83}
        });
    }    
    var pantalla_pulseada = $("#pantalla_pulseada");
    $.mobile.changePage(pantalla_pulseada, { transition: "flip" });
};