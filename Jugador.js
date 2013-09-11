var Jugador = function(opt){  
    this.o = opt;
    this.start();  
};

Jugador.prototype.start = function () {
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.unirse.confirmacion"),
                                             new FiltroXClaveValor("partida", this.o.partida),
                                             new FiltroXClaveValor("jugador", this.o.nombre)]),
                                function (mensaje) { _this.confirmacionRecibida(mensaje); });
    var _this = this;
    setTimeout(function(){
        _this.enviarSolicitudDeUnirseAPartida();
    }, 100);
};

Jugador.prototype.enviarSolicitudDeUnirseAPartida = function () {
    this.portal.enviarMensaje({
        tipoDeMensaje: "vortex.pulseada.unirse",
        partida: this.o.partida,
        jugador: this.o.nombre
    }); 
    var _this = this;
    setTimeout(function(){
        _this.enviarSolicitudDeUnirseAPartida();
    }, 500);
};

Jugador.prototype.confirmacionRecibida = function (confirmacion) {
    this.joystick = new Joystick({
        partida: this.o.partida,
        jugador:this.o.nombre, 
        cursores: this.o.cursores
    });    
    this.enviarSolicitudDeUnirseAPartida = function(){};
};