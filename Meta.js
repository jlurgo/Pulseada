var Meta = function(opt){  
    $.extend(true, this, opt)
    this.start();  
};

Meta.prototype.start = function () {   
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    
    var _this = this;
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.bolita.posicion"),
                                             new FiltroXClaveValor("partida", this.partida)]),
                                function (mensaje) { _this.posicionBolitaRecibida(mensaje); });
//    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.join"),
//                                             new FiltroXClaveValor("partida", this.partida)]),
//                                function (mensaje) { _this.enviarPosicion(); });
    
    this.circulo = new paper.Path.Circle(new paper.Point(0,0), this.radio);
    this.circulo.fillColor = 'red';
    this.circulo.opacity = 0;
    this.ubicarse();
};

Meta.prototype.posicionBolitaRecibida = function(posicion_bolita) {  
    if(this.circulo.contains(new paper.Point(posicion_bolita.posicion.x, posicion_bolita.posicion.y))){
        this.ubicarse();
    }
};

Meta.prototype.ubicarse = function () { 
    this.posicion = paper.project.view.center.multiply(paper.Point.random());
    this.circulo.remove();
    this.circulo = new paper.Path.Circle(this.posicion, this.radio);
    this.enviarPosicion();
};

Meta.prototype.enviarPosicion = function () { 
    this.portal.enviarMensaje({
            tipoDeMensaje:"vortex.pulseada.meta",
            partida: this.partida,
            jugador: this.jugador,
            posicion: {
                x: this.posicion.x, 
                y: this.posicion.y
            },
            radio: this.radio
        });
};