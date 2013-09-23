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
    this.ubicarseAlrededorDe(this.punto_de_referencia);
};

Meta.prototype.posicionBolitaRecibida = function(posicion_bolita) {  
    var pos_bolita = new paper.Point(posicion_bolita.posicion.x, posicion_bolita.posicion.y);
    if(this.circulo.contains(pos_bolita)){
        this.ubicarseAlrededorDe(pos_bolita);
    }
};

Meta.prototype.ubicarseAlrededorDe = function (punto_referencia) { 
    this.posicion = punto_referencia.add(paper.Point.random().add(-0.5).multiply(500));
    if(this.circulo) this.circulo.remove();
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