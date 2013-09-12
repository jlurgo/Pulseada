var VistaBolita = function (opt) {
    this.o = opt;
    this.start();
};

VistaBolita.prototype.start = function () {
    this.circulo = new paper.Path.Circle(new paper.Point(50, 50), 30);
    this.circulo.fillColor = 'red';
    this.masa = 50;
    this.fuerzas = [];
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    var _this = this;
    paper.view.onFrame = function (event) {
        //no se por que no puedo sacar esto. funciona raro.
    };

    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.bolita.posicion"),
                                                new FiltroXClaveValor("partida", this.o.partida)]),
                                function (mensaje) { _this.posicionRecibida(mensaje); });
    
    this.cuerpo = this.circulo;
};

VistaBolita.prototype.posicionRecibida = function (mensaje_posicion) {
    this.circulo.position = new paper.Point(mensaje_posicion.posicion.x, mensaje_posicion.posicion.y);
    paper.project.view.center = this.circulo.position;
    for (i = 0; i < this.fuerzas.length; i++) {
        this.fuerzas[i].dibujar();
    }
};

VistaBolita.prototype.agregarVistaFuerza = function (fuerza) {
    this.fuerzas.push(new VistaFuerza({
        jugador: fuerza.jugador,
        partida: this.o.partida,
        cuerpo_target: this.circulo
    }));
};
