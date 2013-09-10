var Fuerza = function(opt){  
    this.o = opt;
    this.start();  
};

Fuerza.prototype.start = function () {
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.fuerza"),
                                             new FiltroXClaveValor("partida", this.o.partida),
                                             new FiltroXClaveValor("jugador", this.o.nombre)]),
                                function (mensaje) { _this.fuerzaRecibida(mensaje); });
    this.vector = this.o.vector_inicial;
};

Fuerza.prototype.fuerzaRecibida = function (confirmacion) {
    this.vector = new paper.Point(msg_fuerza.x, msg_fuerza.y);  
};