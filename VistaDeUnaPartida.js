var VistaDeUnaPartida = function(opt){  
    this.o = opt;
    this.start();  
};

VistaDeUnaPartida.prototype.start = function () {
    paper.setup($("#canvas_campo_de_juego")[0]);
    this.bolita = new VistaBolita({partida: this.o.partida});

    paper.view.draw();
    
    paper.view.onFrame = function (event) {
        //no se por que no puedo sacar esto. funciona raro.
    };
    
    //this.portal = new NodoPortalBidi();
    //NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    var _this = this;
    Vx.when({tipoDeMensaje: "vortex.pulseada.jugador",
            partida: this.o.partida},
            function (mensaje) { _this.jugadorRecibido(mensaje); });
    
    Vx.when({tipoDeMensaje: "vortex.pulseada.bolita.posicion",
             partida: this.o.partida},
             function (mensaje) { _this.posicionRecibida(mensaje); });
    
    this.jugadores = {};
    this.metas = [];
    this.contenedor_marcadores_de_goles = $('#contenedor_marcadores_de_goles');
};

VistaDeUnaPartida.prototype.jugadorRecibido = function(jugador){
    if(this.jugadores[jugador.nombre] !== undefined) return;
    this.jugadores[jugador.nombre] = {
        meta: new VistaMeta({
                partida:jugador.partida,
                jugador: jugador.nombre,
                posicion: jugador.meta.posicion,
                radio: jugador.meta.radio
            }),
        fuerza: new VistaFuerza({
            partida: jugador.partida,
            jugador: jugador.nombre,
            cuerpo_target: this.bolita.cuerpo,
            fuerza_inicial: new paper.Point(jugador.fuerza.x, jugador.fuerza.y)
        }),
        marcador: new MarcadorDeGoles({
            partida: jugador.partida,
            jugador: jugador.nombre,
            goles: jugador.goles
        })
    };
    this.bolita.agregarVistaFuerza(this.jugadores[jugador.nombre].fuerza);
    this.jugadores[jugador.nombre].marcador.dibujarEn(this.contenedor_marcadores_de_goles)
};

VistaDeUnaPartida.prototype.posicionRecibida = function(pos){
    this.moverVistaHacia(new paper.Point(pos.posicion.x, pos.posicion.y));
};

VistaDeUnaPartida.prototype.moverVistaHacia = function(posicion){
    this.pasos_animacion_paneo = 10;
    this.periodo_animacion_paneo = 50;
    this.paso_actual_animacion_paneo = 0;
    this.vector_animacion_paneo = posicion.add(paper.project.view.center.multiply(-1));
    this.vector_animacion_paneo = this.vector_animacion_paneo.normalize(this.vector_animacion_paneo.length/this.pasos_animacion_paneo);
    
    this.avanzarFrameAnimacionPaneo();
};

VistaDeUnaPartida.prototype.avanzarFrameAnimacionPaneo = function(){
    paper.project.view.center = paper.project.view.center.add(this.vector_animacion_paneo);
    this.paso_actual_animacion_paneo += 1;
    if(this.paso_actual_animacion_paneo<this.pasos_animacion_paneo){
        var _this = this;
        setTimeout(function(){
            _this.avanzarFrameAnimacionPaneo();
        }, this.periodo_animacion_paneo);
    }
};