var PartidaDePulseada = function(opt){  
    this.o = opt;
    this.start();  
};

PartidaDePulseada.prototype.start = function(){
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    var _this = this;
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.fuerza"),
                                             new FiltroXClaveValor("partida", this.o.nombre)]),
                                function (mensaje) { _this.fuerzaRecibida(mensaje); });
    
    this.bolita = new Bolita({partida:this.o.nombre});
    this.jugadores = {};
};

PartidaDePulseada.prototype.fuerzaRecibida = function(fuerza){
    if(this.jugadores[fuerza.jugador] !== undefined) {
        this.jugadores[fuerza.jugador].fuerza_recibida = true;
    } else {
        this.jugadores[fuerza.jugador] = {fuerza_recibida : true};
        this.bolita.agregarFuerza(fuerza);
    }
    if(this.todasLasFuerzasRecibidas()){ 
        this.bolita.actualizarPosicion();
        this.blanquearFuerzasRecibidas();
    }
    console.log("Fuerza del jugador " + fuerza.jugador + " recibida: " + JSON.stringify(fuerza));
};

PartidaDePulseada.prototype.todasLasFuerzasRecibidas = function(){
    var todas_recibidas = true;
    for(var jugador in this.jugadores){
        if(this.jugadores[jugador].fuerza_recibida == false) todas_recibidas = false;
    }
    return todas_recibidas;
};

PartidaDePulseada.prototype.blanquearFuerzasRecibidas = function(){
    for(var jugador in this.jugadores){
        this.jugadores[jugador].fuerza_recibida = false;
    }
};