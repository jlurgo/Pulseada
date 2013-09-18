var VistaMeta = function(opt){  
    this.o = opt;
    this.start();  
};

VistaMeta.prototype.start = function () {   
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    var _this = this;
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.meta"),
                                             new FiltroXClaveValor("partida", this.o.partida)]),
                                function (mensaje) { _this.metaRecibida(mensaje); });
    
    this.posicion = new paper.Point(this.o.posicion.x, this.o.posicion.y);
    this.circulo = new paper.Path.Circle(this.posicion, this.o.radio);
    this.circulo.fillColor = 'red';
    this.circulo.opacity = 0.2;
    this.txt_nombre_jugador = new paper.PointText(this.posicion);
    this.txt_nombre_jugador.fillColor = 'red';
    this.txt_nombre_jugador.content = this.o.jugador;
};

VistaMeta.prototype.metaRecibida = function (meta) {  
    this.circulo.moveTo([meta.posicion.x, meta.posicion.y]);
    this.txt_nombre_jugador.moveTo([meta.posicion.x, meta.posicion.y]);
};