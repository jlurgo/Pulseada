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
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.fuerza"),
                                             new FiltroXClaveValor("partida", this.o.partida)]),
                                function (mensaje) { _this.fuerzaRecibida(mensaje); });
    
    this.jugadores = {};
    this.metas = [];
};

VistaDeUnaPartida.prototype.fuerzaRecibida = function(fuerza){
    if(this.jugadores[fuerza.jugador] !== undefined) return;
    this.jugadores[fuerza.jugador] = true;
    this.bolita.agregarVistaFuerza(fuerza);
};

VistaDeUnaPartida.prototype.posicionRecibida = function(meta){
    this.metas.push(new VistaMeta(meta));
};