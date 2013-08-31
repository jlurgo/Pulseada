var Joystick = function(opt){  
    this.o = opt;
    this.start();  
};

Joystick.prototype.start = function(){
    this.portal = new NodoPortalBidi();
    NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);
    this.fuerza = {x:0, y:0};
    
    this.left_press = false;
    this.up_press = false;
    this.right_press = false;
    this.down_press = false;
    
    var _this = this;
    $(document).keydown(function(e){
        if (e.keyCode == 37 && _this.left_press == false) { //left
            _this.fuerza.x-=1;
            _this.left_press = true;
        }
        if (e.keyCode == 38 && _this.up_press == false) { //up
            _this.fuerza.y-=1;
            _this.up_press = true;
        }
        if (e.keyCode == 39 && _this.right_press == false) { //right
            _this.fuerza.x+=1;
            _this.right_press = true;
        }
        if (e.keyCode == 40 && _this.down_press == false) { //down
            _this.fuerza.y+=1;
            _this.down_press = true;
        }
    });
    
    $(document).keyup(function(e){
        if (e.keyCode == 37) { //left
            _this.left_press = false;
        }
        if (e.keyCode == 38) { //up
            _this.up_press = false;
        }
        if (e.keyCode == 39) { //right
            _this.right_press = false;
        }
        if (e.keyCode == 40) { //down
            _this.down_press = false;
        }
    });
    
    var _this = this;
    setInterval(function(){        
        _this.portal.enviarMensaje({tipoDeMensaje: "vortex.pulseada.fuerza",
                                x : _this.fuerza.x,
                                y : _this.fuerza.y});
        _this.fuerza.x = 0;
        _this.fuerza.y = 0;
    },200);
};