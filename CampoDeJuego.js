var CampoDeJuego = function(opt){  
    this.o = opt;
    this.start();  
};

CampoDeJuego.prototype.start = function(){
    paper.setup(this.o.canvas[0]);
    var joystick1 = new Joystick({jugador:"Player 1", asc_left:37, asc_up:38, asc_right:39, asc_down:40});
    var joystick2 = new Joystick({jugador:"Player 2", asc_left:65, asc_up:87, asc_right:68, asc_down:83});
    var bolita = new Bolita();
    
    paper.view.draw();
};