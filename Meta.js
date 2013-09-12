var Meta = function(opt){  
    this.o = opt;
    this.start();  
};

Meta.prototype.start = function () {   
    this.posicion = new paper.Point(500, 500).multiply(paper.Point.random());
    this.circulo = new paper.Path.Circle(this.posicion, 80);
    this.circulo.strokeColor = "red";
};