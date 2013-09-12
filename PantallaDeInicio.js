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
        var vista_partida = new VistaDeUnaPartida({partida: nombre_partida});
        var partida = new PartidaDePulseada({ nombre: nombre_partida});
        var jugador_1 = new Jugador({ nombre: _this.txt_nombre_jugador_1.val(),
            partida: nombre_partida,
            cursores: { left: 37, up: 38, right: 39, down: 40 }
        });
        var jugador_2 = new Jugador({ nombre: _this.txt_nombre_jugador_2.val(),
            partida: nombre_partida,
            cursores: { left: 65, up: 87, right: 68, down: 83}
        });
        
        var pantalla_pulseada = $("#pantalla_pulseada");
        $.mobile.changePage(pantalla_pulseada, { transition: "flip" });
    });
    
    this.btn_unirse_a_partida.click(function () {
        var nombre_partida = _this.txt_nombre_partida.val();
        var jugador_1 = new Jugador({ nombre: _this.txt_nombre_jugador_1.val(),
            partida: nombre_partida,
            cursores: { left: 37, up: 38, right: 39, down: 40 }
        });
        var jugador_2 = new Jugador({ nombre: _this.txt_nombre_jugador_2.val(),
            partida: nombre_partida,
            cursores: { left: 65, up: 87, right: 68, down: 83}
        });
        var vista_partida = new VistaDeUnaPartida({partida: nombre_partida});
        var pantalla_pulseada = $("#pantalla_pulseada");
        $.mobile.changePage(pantalla_pulseada, { transition: "flip" });
    });
};