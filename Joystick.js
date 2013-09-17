var Joystick = function(opt){  
    this.o = opt;
    this.start();  
};

Joystick.prototype.start = function(){
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    this.fuerza = {x:0, y:0};
    this.pulsaciones = {x:0, y:0};
    
    this.left_press = false;
    this.up_press = false;
    this.right_press = false;
    this.down_press = false;
    
    this.tiempoDeConteoEnMs = 2000;
    this.pasosDeProgreso = 100;
    
    var _this = this;
    $(document).keydown(function(e){
        if (e.keyCode == _this.o.cursores.left && _this.left_press == false) { //left
            _this.pulsaciones.x -= 1;  
            _this.left_press = true;
        }
        if (e.keyCode == _this.o.cursores.up && _this.up_press == false) { //up
            _this.pulsaciones.y -= 1;      
            _this.up_press = true;
        }
        if (e.keyCode == _this.o.cursores.right && _this.right_press == false) { //right
            _this.pulsaciones.x += 1;
            _this.right_press = true;
        }
        if (e.keyCode == _this.o.cursores.down && _this.down_press == false) { //down
            _this.pulsaciones.y += 1;
            _this.down_press = true;
        }
    });
    
    $(document).keyup(function(e){
        if (e.keyCode == _this.o.cursores.left) { //left
            _this.left_press = false;
        }
        if (e.keyCode == _this.o.cursores.up) { //up
            _this.up_press = false;
        }
        if (e.keyCode == _this.o.cursores.right) { //right
            _this.right_press = false;
        }
        if (e.keyCode == _this.o.cursores.down) { //down
            _this.down_press = false;
        }
    });
    
    this.portal.pedirMensajes(new FiltroAND([new FiltroXClaveValor("tipoDeMensaje", "vortex.pulseada.bolita.posicion"),
                                             new FiltroXClaveValor("partida", this.o.partida)]),
                                function (mensaje) { _this.posicionRecibida(mensaje); });
    
    this.poligono_auxiliar = new paper.Path.RegularPolygon(this.o.posicion_vista, this.pasosDeProgreso * 2, 30);
    this.poligono_auxiliar.rotate(180);
    this.tortaDeProgreso = new paper.Path();
    this.contando = false;
};

Joystick.prototype.posicionRecibida = function(meta){
    if(!(this.contando)){
        this.pulsaciones.x = 0;
        this.pulsaciones.y = 0;
        this.pasoActualDeProgreso = 0;
        this.tortaDeProgreso.removeSegments();
        this.tortaDeProgreso.fillColor = 'yellow';
        this.tortaDeProgreso.add(this.o.posicion_vista);
        this.tortaDeProgreso.add(this.poligono_auxiliar.segments[0].getPoint());
        this.actualizarProgresoDeConteoDePulsaciones();
    }
};

Joystick.prototype.actualizarProgresoDeConteoDePulsaciones = function(meta){
    this.tortaDeProgreso.arcTo(this.poligono_auxiliar.segments[this.pasoActualDeProgreso * 2].getPoint(), 
                               this.poligono_auxiliar.segments[this.pasoActualDeProgreso * 2 + 1].getPoint());
    this.pasoActualDeProgreso += 1;
    if(this.pasoActualDeProgreso >= this.pasosDeProgreso) {
        this.enviarFuerza();
        this.contando = false;
    } else{
        var _this = this;
        this.procesoConteo = setTimeout(function(){
            _this.actualizarProgresoDeConteoDePulsaciones();
        }, this.tiempoDeConteoEnMs/this.pasosDeProgreso)
        this.contando = true;
    }
};

Joystick.prototype.enviarFuerza = function(){
    this.portal.enviarMensaje({ tipoDeMensaje: "vortex.pulseada.fuerza",
                                jugador: this.o.jugador,
                                partida: this.o.partida,
                                x: this.pulsaciones.x,
                                y: this.pulsaciones.y
                              });
};

