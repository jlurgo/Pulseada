var VistaDeUnaPartida = function(opt){  
    this.o = opt;
    this.start();  
};

VistaDeUnaPartida.prototype.start = function () {
    paper.setup($("#canvas_campo_de_juego")[0]);
    this.bolita = new VistaBolita({partida: this.o.partida});

    paper.view.draw();
    
    paper.view.onFrame = function (event) {
        //no se por que no puedo sacar esto. funciona raro.
    };
    
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    var _this = this;
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.jugador"),
                                             new FiltroXClaveValor("partida", this.o.partida)]),
                                function (mensaje) { _this.jugadorRecibido(mensaje); });
    
    this.jugadores = {};
    this.metas = [];
    this.contenedor_marcadores_de_goles = $('#contenedor_marcadores_de_goles');
};

VistaDeUnaPartida.prototype.jugadorRecibido = function(jugador){
    if(this.jugadores[jugador.nombre] !== undefined) return;
    this.jugadores[jugador.nombre] = {
        meta: new VistaMeta({
                partida:jugador.partida,
                jugador: jugador.nombre,
                posicion: jugador.meta.posicion,
                radio: jugador.meta.radio
            }),
        fuerza: new VistaFuerza({
            partida: jugador.partida,
            jugador: jugador.nombre,
            cuerpo_target: this.bolita.cuerpo,
            fuerza_inicial: new paper.Point(jugador.fuerza.x, jugador.fuerza.y)
        }),
        marcador: new MarcadorDeGoles({
            partida: jugador.partida,
            jugador: jugador.nombre,
            goles: jugador.goles
        })
    };
    this.bolita.agregarVistaFuerza(this.jugadores[jugador.nombre].fuerza);
    this.jugadores[jugador.nombre].marcador.dibujarEn(this.contenedor_marcadores_de_goles)
};

