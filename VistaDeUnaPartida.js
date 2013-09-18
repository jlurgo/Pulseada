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
    
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.meta"),
                                             new FiltroXClaveValor("partida", this.o.partida)]),
                                function (mensaje) { _this.metaRecibida(mensaje); });
    this.jugadores = {};
    this.metas = [];
};

VistaDeUnaPartida.prototype.fuerzaRecibida = function(fuerza){
    if(this.jugadores[fuerza.jugador] !== undefined) return;
    this.jugadores[fuerza.jugador] = {};
    this.bolita.agregarVistaFuerza(fuerza);
};

VistaDeUnaPartida.prototype.metaRecibida = function(meta){
    if(this.jugadores[meta.jugador].meta !== undefined) return;
    this.jugadores[meta.jugador].meta = new VistaMeta(meta);
};