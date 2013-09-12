var PartidaDePulseada = function(opt){  
    this.o = opt;
    this.start();  
};

PartidaDePulseada.prototype.start = function(){
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    var _this = this;
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.actualizarFuerza"),
                                             new FiltroXClaveValor("partida", this.o.nombre)]),
                                function (mensaje) { _this.fuerzaRecibida(mensaje); });
    
    this.bolita = new Bolita({partida:this.o.nombre});
    this.jugadores = {};
    this.metas = [];
};

PartidaDePulseada.prototype.fuerzaRecibida = function(fuerza){
    if(this.jugadores[fuerza.jugador] !== undefined) return;
    this.jugadores[fuerza.jugador] = true;
    this.bolita.agregarFuerza(fuerza);
    var meta = new Meta({
        jugador: fuerza.jugador
    });
    this.metas.push(meta);
    this.portal.enviarMensaje({
        tipoDeMensaje: "vortex.pulseada.nuevaMeta",
        partida: this.o.partida,
        posicion: { x: meta.posicion.x, y: meta.posicion.y },
        jugador: fuerza.jugador,
        radio: meta.radio
    });
};