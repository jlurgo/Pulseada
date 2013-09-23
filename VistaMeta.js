var VistaMeta = function(opt){  
    this.o = opt;
    this.start();  
};

VistaMeta.prototype.start = function () {   
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    var _this = this;
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.meta"),
                                             new FiltroXClaveValor("partida", this.o.partida),
                                            new FiltroXClaveValor("jugador", this.o.jugador)]),
                                function (mensaje) { _this.metaRecibida(mensaje); });
    
    this.posicion = new paper.Point(this.o.posicion.x, this.o.posicion.y);
    this.dibujar();
};

VistaMeta.prototype.metaRecibida = function (meta) {  
    this.posicion = new paper.Point(meta.posicion.x, meta.posicion.y);
    this.dibujar();
};

VistaMeta.prototype.dibujar = function(){
    if(this.circulo) this.circulo.remove();
    if(this.txt_nombre_jugador) this.txt_nombre_jugador.remove();
    
    this.circulo = new paper.Path.Circle(this.posicion, this.o.radio);
    this.circulo.fillColor = 'red';
    this.circulo.opacity = 0.2;
    this.txt_nombre_jugador = new paper.PointText(this.posicion);
    this.txt_nombre_jugador.fillColor = 'red';
    this.txt_nombre_jugador.content = this.o.jugador;    
};