var Bolita = function(opt){  
    this.o = opt;
    this.start();  
};

Bolita.prototype.start = function(){       
    this.circulo = new paper.Path.Circle(paper.project.view.center, 30);
    this.circulo.fillColor = 'red';
    
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    
    this.portal.pedirMensajes(  new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.fuerza"),
                                function(mensaje){_this.fuerzaRecibida(mensaje);});
    this.velocidad = {x:0, y:0};
    this.fuerza = {x:0, y:0};
    this.posicion = {x:paper.project.view.center.x, y:paper.project.view.center.y};
    
    this.periodoDeMuestreo = 0.1;
    var _this = this;
    paper.view.onFrame  = function(event) {
        _this.actualizarPosicion();
    };
};

Bolita.prototype.fuerzaRecibida = function(fuerza){   
    this.fuerza.x = fuerza.x;
    this.fuerza.y = fuerza.y;    
};

Bolita.prototype.actualizarPosicion = function(fuerza){   
    this.velocidad.x += this.fuerza.x * this.periodoDeMuestreo;
    this.velocidad.y += this.fuerza.y * this.periodoDeMuestreo;
    this.velocidad.x -= this.velocidad.x * 0.1;
    this.velocidad.y -= this.velocidad.y * 0.1;
    
    this.posicion.x += this.velocidad.x * this.periodoDeMuestreo;
    this.posicion.y += this.velocidad.y * this.periodoDeMuestreo;
    
    this.circulo.position = new paper.Point(this.posicion.x, this.posicion.y);
};