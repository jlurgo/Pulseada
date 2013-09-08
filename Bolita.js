var Bolita = function(opt){  
    this.o = opt;
    this.start();  
};

Bolita.prototype.start = function () {
    this.circulo = new paper.Path.Circle(paper.project.view.center, 30);
    this.circulo.fillColor = 'red';
    this.masa = 50;
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    this.portal.pedirMensajes(new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.fuerza"),
                                function (mensaje) { _this.fuerzaRecibida(mensaje); });

    this.velocidad = new paper.Point(0, 0);
    this.fuerzaResultante = new paper.Point(0, 0);
    this.fuerzas = [];
    this.posicion = paper.project.view.center.clone();

    this.periodoDeMuestreo_ms = 200;
    this.periodoDeMuestreo_s = this.periodoDeMuestreo_ms / 1000;

    var _this = this;
    paper.view.onFrame = function (event) {
        //no se por que no puedo sacar esto. funciona raro.
    };
    setInterval(function () {
        _this.actualizarPosicion();
    }, this.periodoDeMuestreo);  
};

Bolita.prototype.fuerzaRecibida = function (msg_fuerza) {
    if(this.fuerzas[msg_fuerza.jugador] !== undefined) return;
    this.fuerzas[msg_fuerza.jugador] = 1;
    this.fuerzas.push(new VistaFuerza({
            jugador: msg_fuerza.jugador,
            vector_inicial: new paper.Point(msg_fuerza.x, msg_fuerza.y),
            cuerpo_target: this.circulo
        })
     );
};

Bolita.prototype.actualizarPosicion = function () {
    this.actualizarFuerzaResultante();
    this.velocidad = this.velocidad.add(this.fuerzaResultante.multiply(this.periodoDeMuestreo_s * (1 / this.masa)));
    this.velocidad = this.velocidad.multiply(0.99);
    this.circulo.position = this.circulo.position.add(this.velocidad.multiply(this.periodoDeMuestreo_s));
    for(var i=0; i<this.fuerzas.length; i++){
        this.fuerzas[i].dibujar();
    }
};

Bolita.prototype.actualizarFuerzaResultante = function () {    
    this.fuerzaResultante = new paper.Point(0, 0);
    for(var i=0; i<this.fuerzas.length; i++){
        this.fuerzaResultante = this.fuerzaResultante.add(this.fuerzas[i].vector);
    }
};