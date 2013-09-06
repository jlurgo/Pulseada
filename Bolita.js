var Bolita = function(opt){  
    this.o = opt;
    this.start();  
};

Bolita.prototype.start = function () {
    this.circulo = new paper.Path.Circle(paper.project.view.center, 30);
    this.circulo.fillColor = 'red';
    this.masa = 10;
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    this.portal.pedirMensajes(new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.fuerza"),
                                function (mensaje) { _this.fuerzaRecibida(mensaje); });

    this.velocidad = new paper.Point(0, 0);
    this.fuerza = new paper.Point(0, 0);
    this.posicion = paper.project.view.center.clone();

    this.periodoDeMuestreo_ms = 200;
    this.periodoDeMuestreo_s = this.periodoDeMuestreo_ms / 1000;

    var _this = this;
    paper.view.onFrame = function (event) {
        _this.circulo.position = _this.posicion;
    };
    setInterval(function () {
        _this.actualizarPosicion();
    }, this.periodoDeMuestreo);

    this.vista_fuerza = new paper.Path();
    this.vista_fuerza.strokeColor = 'blue';
    this.vista_fuerza.strokeWidth = 5;
};

Bolita.prototype.fuerzaRecibida = function (fuerza) {
    this.fuerza = new paper.Point(fuerza.x, fuerza.y);  
};

Bolita.prototype.actualizarPosicion = function (fuerza) {
    this.velocidad = this.velocidad.add(this.fuerza.multiply(this.periodoDeMuestreo_s * (1 / this.masa)));
    this.velocidad = this.velocidad.multiply(0.99);
    this.posicion = this.posicion.add(this.velocidad.multiply(this.periodoDeMuestreo_s));
    this.vista_fuerza.segments = [
	   [this.circulo.position],
	   [this.circulo.position.add(this.fuerza.multiply(50))]
    ];
};