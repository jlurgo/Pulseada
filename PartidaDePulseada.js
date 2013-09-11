var PartidaDePulseada = function(opt){  
    this.o = opt;
    this.start();  
};

PartidaDePulseada.prototype.start = function(){
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    var _this = this;
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.unirse"),
                                             new FiltroXClaveValor("partida", this.o.nombre)]),
                                function (mensaje) { _this.solicitudDeUnirseRecibida(mensaje); });
    
    this.bolita = new Bolita({partida:this.o.nombre});
    
};

PartidaDePulseada.prototype.solicitudDeUnirseRecibida = function(solicitud){
    this.portal.enviarMensaje({
        tipoDeMensaje: "vortex.pulseada.unirse.confirmacion",
        jugador: solicitud.jugador,
        partida: this.o.nombre
    });
    
    this.bolita.agregarFuerza(new Fuerza({
        jugador:solicitud.jugador,
        partida: this.o.nombre
    }));
};