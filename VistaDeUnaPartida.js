var VistaDeUnaPartida = function(opt){  
    this.o = opt;
    this.start();  
};

VistaDeUnaPartida.prototype.start = function () {
    paper.setup($("#canvas_campo_de_juego")[0]);
    this.bolita = new VistaBolita({partida: this.o.partida});

    paper.view.draw();
    
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    var _this = this;
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.unirse.confirmacion"),
                                             new FiltroXClaveValor("partida", this.o.partida)]),
                                function (mensaje) { _this.confirmacionRecibida(mensaje); });
};

VistaDeUnaPartida.prototype.confirmacionRecibida = function (confirmacion) {
    this.bolita.agregarVistaFuerza(new VistaFuerza({
        jugador: confirmacion.jugador,
        partida: this.o.partida,
        cuerpo_target: this.bolita.cuerpo
    }));
};