var CampoDeJuego = function(opt){  
    this.o = opt;
    this.start();  
};

CampoDeJuego.prototype.start = function(){
    paper.setup(this.o.canvas[0]);
    var joystick = new Joystick();
    var bolita = new Bolita();

    paper.view.draw();
};