var Meta = function(opt){  
    $.extend(true, this, opt)
    this.start();  
};

Meta.prototype.start = function () {   
    //this.portal = new NodoPortalBidi();
    //NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    
    var _this = this;
    Vx.when({   tipoDeMensaje: "vortex.pulseada.bolita.posicion",
                partida: this.partida},
            function (mensaje) { _this.posicionBolitaRecibida(mensaje); });
    this.ubicarseAlrededorDe(this.punto_de_referencia);
};

Meta.prototype.posicionBolitaRecibida = function(posicion_bolita) {  
    var pos_bolita = new paper.Point(posicion_bolita.posicion.x, posicion_bolita.posicion.y);
    if(this.circulo.contains(pos_bolita)){
        Vx.send({
            tipoDeMensaje:"vortex.pulseada.gol",
            partida: this.partida,
            jugador: this.jugador
        });
        this.ubicarseAlrededorDe(pos_bolita);
    }
};

Meta.prototype.ubicarseAlrededorDe = function (punto_referencia) { 
    var x_random = Math.random();
    var y_random = Math.random();
    x_random = x_random - 0.5;
    y_random = y_random - 0.5;
    
    this.posicion = punto_referencia.add(new paper.Point(x_random, y_random).normalize(1).multiply(250));
    if(this.circulo) this.circulo.remove();
    this.circulo = new paper.Path.Circle(this.posicion, this.radio);
    this.enviarPosicion();
};

Meta.prototype.enviarPosicion = function () { 
    Vx.send({
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