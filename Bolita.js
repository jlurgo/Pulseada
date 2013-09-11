var Bolita = function(opt){  
    this.o = opt;
    this.start();  
};

Bolita.prototype.start = function () {   
    this.masa = 1;
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    this.velocidad = new paper.Point(0, 0);
    this.fuerzaResultante = new paper.Point(0, 0);
    this.fuerzas = [];
    this.posicion = new paper.Point(500, 500);
    this.ultima_posicion_enviada = new paper.Point(0, 0);
    
    this.periodoDeMuestreo_ms = 200;
    this.periodoDeMuestreo_s = this.periodoDeMuestreo_ms / 1000;

    var _this = this;
    setInterval(function () {
        _this.actualizarPosicion();
    }, this.periodoDeMuestreo_ms);  
};

Bolita.prototype.agregarFuerza = function (fuerza) {
    this.fuerzas.push(fuerza);
};

Bolita.prototype.actualizarPosicion = function () {
    this.actualizarFuerzaResultante();
    this.velocidad = this.velocidad.add(this.fuerzaResultante.multiply(this.periodoDeMuestreo_s * (1 / this.masa)));
    this.velocidad = this.velocidad.multiply(0.99);
    this.posicion = this.posicion.add(this.velocidad.multiply(this.periodoDeMuestreo_s));

    if (this.ultima_posicion_enviada.x == this.posicion.x && this.ultima_posicion_enviada.y == this.posicion.y) return;

    for (var i = 0; i < this.fuerzas.length; i++) {
        this.fuerzas[i].enviar();
    }
    this.portal.enviarMensaje({
        tipoDeMensaje: "vortex.pulseada.bolita.posicion",
        partida: this.o.partida,
        posicion: { x: this.posicion.x, y: this.posicion.y }
    });

    this.ultima_posicion_enviada = this.posicion;
};

Bolita.prototype.actualizarFuerzaResultante = function () {    
    this.fuerzaResultante = new paper.Point(0, 0);
    for(var i=0; i<this.fuerzas.length; i++){
        this.fuerzaResultante = this.fuerzaResultante.add(this.fuerzas[i].vector);
    }
};