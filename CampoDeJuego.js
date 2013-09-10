var CampoDeJuego = function(opt){  
    this.o = opt;
    this.start();  
};

CampoDeJuego.prototype.start = function () {
    paper.setup(this.o.canvas[0]);
    this.bolita = new VistaBolita({partida: this.o.partida});

    paper.view.draw();
};