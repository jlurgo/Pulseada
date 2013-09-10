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

Bolita.prototype.agregarFuerza = function (fuerza) {
    this.fuerzas.push(fuerza);
};

Bolita.prototype.actualizarPosicion = function () {
    this.actualizarFuerzaResultante();
    this.velocidad = this.velocidad.add(this.fuerzaResultante.multiply(this.periodoDeMuestreo_s * (1 / this.masa)));
    this.velocidad = this.velocidad.multiply(0.99);
    this.circulo.position = this.circulo.position.add(this.velocidad.multiply(this.periodoDeMuestreo_s));
};

Bolita.prototype.actualizarFuerzaResultante = function () {    
    this.fuerzaResultante = new paper.Point(0, 0);
    for(var i=0; i<this.fuerzas.length; i++){
        this.fuerzaResultante = this.fuerzaResultante.add(this.fuerzas[i].vector);
    }
};