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
    this.fuerza = new paper.Point(0, 0);
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

    this.vista_fuerza = new paper.Path();
    
    this.punta_flecha = new paper.Path();
    this.punta_flecha.add(new paper.Point(-5, 10));
    this.punta_flecha.add(new paper.Point(0, 0));
    this.punta_flecha.add(new paper.Point(5, 10));
    this.punta_flecha.fillColor = 'blue';
    this.punta_flecha.closed = true;    
    this.vista_fuerza.strokeColor = 'blue';    
};

Bolita.prototype.fuerzaRecibida = function (fuerza) {
    this.fuerza = new paper.Point(fuerza.x, fuerza.y);  
};

Bolita.prototype.actualizarPosicion = function (fuerza) {
    this.velocidad = this.velocidad.add(this.fuerza.multiply(this.periodoDeMuestreo_s * (1 / this.masa)));
    this.velocidad = this.velocidad.multiply(0.99);
    this.circulo.position = this.circulo.position.add(this.velocidad.multiply(this.periodoDeMuestreo_s));
    
    this.vista_fuerza.segments = [
       [this.circulo.position.add(this.fuerza.multiply(-500))],
       [this.circulo.position]
    ];
    
    var intersecciones_con_bolita = this.circulo.getIntersections(this.vista_fuerza);
    this.punta_flecha.remove();
    if(intersecciones_con_bolita.length>0){
        var versor_fuerza = this.fuerza.normalize(this.fuerza.length*2);
        this.vista_fuerza.segments = [
           [intersecciones_con_bolita[0].point.add(this.fuerza.multiply(-10))],
           [intersecciones_con_bolita[0].point.add(versor_fuerza.multiply(-0.7))]
        ]; 
        this.vista_fuerza.strokeWidth = this.fuerza.length;
        
        this.punta_flecha = new paper.Path([intersecciones_con_bolita[0].point.add(versor_fuerza.rotate(135)),
            intersecciones_con_bolita[0].point,
            intersecciones_con_bolita[0].point.add(versor_fuerza.rotate(-135))
        ]);
        this.punta_flecha.fillColor = 'blue';
        this.vista_fuerza.strokeColor = 'blue';          
        this.punta_flecha.closed = true;    
    }
};