var Bolita = function(opt){  
    this.o = opt;
    this.start();  
};

Bolita.prototype.start = function () {   
    this.masa = 0.5;
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    this.velocidad = new paper.Point(0, 0);
    this.fuerzaResultante = new paper.Point(0, 0);
    this.fuerzas = [];
    this.posicion = new paper.Point(700, 300);
    this.periodo_minimo = 200;
    var _this = this;
    this.proceso_inicial = setInterval(function(){
        _this.actualizarPosicion();
    }, this.periodo_minimo);
};

Bolita.prototype.agregarFuerza = function (fuerza) {  
    this.fuerzas.push(new Fuerza({
        partida: this.o.partida,
        jugador: fuerza.jugador,
        vector_inicial: new paper.Point(fuerza.x, fuerza.y)
    }));
    clearInterval(this.proceso_inicial);
};

Bolita.prototype.actualizarPosicion = function () {
    var now = Date.now();
    if(this.ultima_muestra === undefined) this.ultima_muestra = now;
    var periodoDeMuestreo_ms = (now - this.ultima_muestra);
    var timeout = this.periodo_minimo - periodoDeMuestreo_ms;
    if(timeout<0) timeout = 0;
    if(this.periodo_minimo>periodoDeMuestreo_ms) periodoDeMuestreo_ms = this.periodo_minimo;
    this.ultima_muestra = now + timeout;
    var periodoDeMuestreo_s = this.periodo_minimo * 5 / 1000; 
    
    var _this = this;
    setTimeout(function(){
        _this.actualizarFuerzaResultante();
        _this.velocidad = _this.velocidad.add(_this.fuerzaResultante.multiply(periodoDeMuestreo_s * (1 / _this.masa)));
        _this.posicion = _this.posicion.add(_this.velocidad.multiply(periodoDeMuestreo_s));
        _this.velocidad = _this.velocidad.multiply(0.75);
        _this.portal.enviarMensaje({
            tipoDeMensaje: "vortex.pulseada.bolita.posicion",
            partida: _this.o.partida,
            posicion: { x: _this.posicion.x, y: _this.posicion.y }
        });        
    }, timeout);
};

Bolita.prototype.actualizarFuerzaResultante = function () {    
    this.fuerzaResultante = new paper.Point(0, 0);
    for(var i=0; i<this.fuerzas.length; i++){
        this.fuerzaResultante = this.fuerzaResultante.add(this.fuerzas[i].vector);
    }
};