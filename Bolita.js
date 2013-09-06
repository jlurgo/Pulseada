var Bolita = function(opt){  
    this.o = opt;
    this.start();  
};

Bolita.prototype.start = function(){       
    this.circulo = new paper.Path.Circle(paper.project.view.center, 30);
    this.circulo.fillColor = 'red';
    this.masa = 0.01;
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    
    this.portal.pedirMensajes(  new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.fuerza"),
                                function(mensaje){_this.fuerzaRecibida(mensaje);});
    this.velocidad = {x:0, y:0};
    this.fuerza = {x:0, y:0};
    this.posicion = {x:paper.project.view.center.x, y:paper.project.view.center.y};
    
    this.periodoDeMuestreo_ms = 200;
    this.periodoDeMuestreo_s = this.periodoDeMuestreo_ms/1000;
    
    var _this = this;
    paper.view.onFrame  = function(event) {
        _this.circulo.position = new paper.Point(_this.posicion.x, _this.posicion.y);
    };
    setInterval(function(){
        _this.actualizarPosicion();
    }, this.periodoDeMuestreo);
    
    //this.vista_fuerza = new paper.Path.Line(this.circulo.position, this.circulo.position));
    this.vista_fuerza = new paper.Path();
    this.vista_fuerza.strokeColor = 'blue';
    this.vista_fuerza.strokeWidth = 5;
};

Bolita.prototype.fuerzaRecibida = function(fuerza){   
    this.fuerza.x = fuerza.x;
    this.fuerza.y = fuerza.y;    
};

Bolita.prototype.actualizarPosicion = function(fuerza){   
    this.velocidad.x += this.fuerza.x * this.periodoDeMuestreo_s / this.masa;
    this.velocidad.y += this.fuerza.y * this.periodoDeMuestreo_s / this.masa;
    this.velocidad.x -= this.velocidad.x * 0.01;
    this.velocidad.y -= this.velocidad.y * 0.01;
    
    this.posicion.x += this.velocidad.x * this.periodoDeMuestreo_s/1000;
    this.posicion.y += this.velocidad.y * this.periodoDeMuestreo_s/1000;
    
    this.vista_fuerza.segments = [
	   [this.circulo.position],
	   [this.circulo.position.add([this.fuerza.x*100, this.fuerza.y*100])]
    ];
};