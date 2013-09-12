var Jugador = function(opt){  
    this.o = opt;
    this.start();  
};

Jugador.prototype.start = function () {
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    
    this.joystick = new Joystick({
        partida: this.o.partida,
        jugador:this.o.nombre, 
        cursores: this.o.cursores
    });    
};