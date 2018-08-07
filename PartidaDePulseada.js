var PartidaDePulseada = function(opt){  
    this.o = opt;
    this.start();  
};

PartidaDePulseada.prototype.start = function(){
    //this.portal = new NodoPortalBidi();
    //NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    var _this = this;
    Vx.when({tipoDeMensaje: "vortex.pulseada.join",
             partida: this.o.nombre},
             function (mensaje) { _this.jugadorUniendose(mensaje); });
    
    Vx.when({tipoDeMensaje: "vortex.pulseada.fuerza",
             partida: this.o.nombre},
             function (mensaje) { _this.fuerzaRecibida(mensaje); });
    
    Vx.when({tipoDeMensaje: "vortex.pulseada.gol",
            partida: this.o.nombre},
            function (mensaje) { _this.golRecibido(mensaje); });
    
    this.bolita = new Bolita({partida:this.o.nombre});
    this.jugadores = {};
};

PartidaDePulseada.prototype.jugadorUniendose = function(solicitud){
    if(this.jugadores[solicitud.jugador] == undefined) {
        this.jugadores[solicitud.jugador] = {
            fuerza_recibida : true,
            meta: new Meta({
                partida:this.o.nombre,
                jugador: solicitud.jugador,
                radio: 80,
                punto_de_referencia: this.bolita.posicion
            }),
            fuerza: new Fuerza({
                partida: this.o.nombre,
                jugador: solicitud.jugador,
                vector_inicial: new paper.Point(solicitud.x, solicitud.y)
            }),
            goles: 0
        };
        this.bolita.agregarFuerza(this.jugadores[solicitud.jugador].fuerza);
        this.enviarJugadores();
    }
    if(this.todasLasFuerzasRecibidas()){ 
        this.bolita.actualizarPosicion();
        this.blanquearFuerzasRecibidas();
    }
};

PartidaDePulseada.prototype.fuerzaRecibida = function(fuerza){
    if(this.jugadores[fuerza.jugador] !== undefined) {
        this.jugadores[fuerza.jugador].fuerza_recibida = true;
    } 
    if(this.todasLasFuerzasRecibidas()){ 
        this.bolita.actualizarPosicion();
        this.blanquearFuerzasRecibidas();
    }
    console.log("Fuerza del jugador " + fuerza.jugador + " recibida: " + JSON.stringify(fuerza));
};

PartidaDePulseada.prototype.golRecibido = function(gol){
    this.jugadores[gol.jugador].goles += 1;
};

PartidaDePulseada.prototype.todasLasFuerzasRecibidas = function(){
    var todas_recibidas = true;
    for(var jugador in this.jugadores){
        if(this.jugadores[jugador].fuerza_recibida == false) todas_recibidas = false;
    }
    return todas_recibidas;
};

PartidaDePulseada.prototype.blanquearFuerzasRecibidas = function(){
    for(var jugador in this.jugadores){
        this.jugadores[jugador].fuerza_recibida = false;
    }
};

PartidaDePulseada.prototype.enviarJugadores = function(){
    for(var jugador in this.jugadores){
        Vx.send({
            tipoDeMensaje:"vortex.pulseada.jugador",
            partida: this.o.nombre,
            nombre: jugador,
            fuerza: {
                x: this.jugadores[jugador].fuerza.x, 
                y: this.jugadores[jugador].fuerza.y
            },
            meta:{
                posicion:{
                    x: this.jugadores[jugador].meta.posicion.x, 
                    y: this.jugadores[jugador].meta.posicion.y
                },
                radio: this.jugadores[jugador].meta.radio
            },
            goles: this.jugadores[jugador].goles
        });
    }
};