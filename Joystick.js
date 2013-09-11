var Joystick = function(opt){  
    this.o = opt;
    this.start();  
};

Joystick.prototype.start = function(){
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    this.fuerza = {x:0, y:0};
    this.ultima_fuerza_enviada = {x:0, y:0};
    
    this.left_press = false;
    this.up_press = false;
    this.right_press = false;
    this.down_press = false;
    this.last_left = Date.now();
    this.last_up = Date.now();
    this.last_right = Date.now();
    this.last_down = Date.now();
    
    var _this = this;
    $(document).keydown(function(e){
        if (e.keyCode == _this.o.cursores.left && _this.left_press == false) { //left
            _this.fuerza.x = -1000/(Date.now() - _this.last_left);            
            _this.last_left = Date.now();
            _this.left_press = true;
            _this.enviarFuerza();
        }
        if (e.keyCode == _this.o.cursores.up && _this.up_press == false) { //up
            _this.fuerza.y = -1000/(Date.now() - _this.last_up);            
            _this.last_up = Date.now();
            _this.up_press = true;
            _this.enviarFuerza();
        }
        if (e.keyCode == _this.o.cursores.right && _this.right_press == false) { //right
            _this.fuerza.x = 1000/(Date.now() - _this.last_right);            
            _this.last_right = Date.now();
            _this.right_press = true;
            _this.enviarFuerza();
        }
        if (e.keyCode == _this.o.cursores.down && _this.down_press == false) { //down
            _this.fuerza.y = 1000/(Date.now() - _this.last_down);            
            _this.last_down = Date.now();
            _this.down_press = true;
            _this.enviarFuerza();
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
    
    setInterval(function(){        
        _this.enviarFuerza();
        _this.fuerza.x = 0;
        _this.fuerza.y = 0;
    },500);
};

Joystick.prototype.enviarFuerza = function(){
    if(this.ultima_fuerza_enviada.x == this.fuerza.x && this.ultima_fuerza_enviada.y == this.fuerza.y) return;
    this.portal.enviarMensaje({ tipoDeMensaje: "vortex.pulseada.actualizarFuerza",
                                jugador:this.o.jugador,
                                partida: this.o.partida,
                                x : this.fuerza.x,
                                y : this.fuerza.y
                              });
    this.ultima_fuerza_enviada.x = this.fuerza.x;
    this.ultima_fuerza_enviada.y = this.fuerza.y;
};