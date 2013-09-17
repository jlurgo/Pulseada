var VistaFuerza = function(opt){  
    this.o = opt;
    this.start();  
};

VistaFuerza.prototype.start = function () {
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    this.jugador = this.o.jugador;
    var _this = this;
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.fuerza"),
                                                new FiltroXClaveValor("partida", this.o.partida),
                                                new FiltroXClaveValor("jugador", this.o.jugador)]),
                                function (mensaje) { _this.fuerzaRecibida(mensaje); });
    
    this.vector = new paper.Point(0,0);
    
    this.cuerpo_flecha = new paper.Path();
    this.punta_flecha = new paper.Path();    
    this.color = {
		hue: Math.random() * 360,
		saturation: 1,
		brightness: 1
	};

};

VistaFuerza.prototype.fuerzaRecibida = function (msg_fuerza) {
    this.vector = new paper.Point(msg_fuerza.x, msg_fuerza.y);  
    this.dibujar();
};

VistaFuerza.prototype.dibujar = function () {
    var recta_corte = new paper.Path()
    recta_corte.strokeWidth = 0;
    recta_corte.segments = [
       [this.o.cuerpo_target.position.add(this.vector.multiply(-500))],
       [this.o.cuerpo_target.position]
    ];
    
    var intersecciones_con_cuerpo_target = this.o.cuerpo_target.getIntersections(recta_corte);
    recta_corte.remove();
    this.punta_flecha.remove();
    this.cuerpo_flecha.remove();
    
    if(intersecciones_con_cuerpo_target.length > 0){
        var versor_fuerza = this.vector.normalize(this.vector.length*2);
        this.cuerpo_flecha = new paper.Path();
        this.cuerpo_flecha.strokeColor = this.color; 
        this.cuerpo_flecha.segments = [
           [intersecciones_con_cuerpo_target[0].point.add(this.vector.multiply(-10))],
           [intersecciones_con_cuerpo_target[0].point.add(versor_fuerza.multiply(-0.7))]
        ]; 
        this.cuerpo_flecha.strokeWidth = this.vector.length;
        
        this.punta_flecha = new paper.Path([intersecciones_con_cuerpo_target[0].point.add(versor_fuerza.rotate(135)),
            intersecciones_con_cuerpo_target[0].point,
            intersecciones_con_cuerpo_target[0].point.add(versor_fuerza.rotate(-135))
        ]);
        this.punta_flecha.fillColor = this.color;      
        this.punta_flecha.closed = true;  
        
        this.cuerpo_flecha.opacity = 0.5;
        this.punta_flecha.opacity = 0.5;
    }
};