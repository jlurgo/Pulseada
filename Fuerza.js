var Fuerza = function(opt){  
    this.o = opt;
    this.start();  
};

Fuerza.prototype.start = function () {
    //this.portal = new NodoPortalBidi();
    //NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    this.jugador = this.o.jugador;
    var _this = this;
    Vx.when({   tipoDeMensaje: "vortex.pulseada.fuerza",
                partida: this.o.partida,
                jugador: this.o.jugador},
            function (mensaje) { _this.fuerzaRecibida(mensaje); });
    this.vector = new paper.Point(0, 0);
};

Fuerza.prototype.fuerzaRecibida = function (msg_fuerza) {
    this.vector = new paper.Point(msg_fuerza.x, msg_fuerza.y);
};