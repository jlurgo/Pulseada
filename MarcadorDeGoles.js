var MarcadorDeGoles = function(opt){  
    $.extend(true, this, opt)
    this.start();  
};

MarcadorDeGoles.prototype.start = function () { 
    this.ui = $('#plantilla_marcador_de_goles').clone();
    //this.portal = new NodoPortalBidi();
    //NodoRouter.instancia.conectarBidireccionalmenteCon(this.portal);

    var _this = this;
    Vx.when({tipoDeMensaje: "vortex.pulseada.gol",
             partida: this.partida,
             jugador: this.jugador},
            function (mensaje) { _this.golRecibido(mensaje); });
    
    this.ui.text(this.jugador + ":" + this.goles);
};

MarcadorDeGoles.prototype.golRecibido = function(){
    this.goles+=1,
    this.ui.text(this.jugador + ":" + this.goles);
};

MarcadorDeGoles.prototype.dibujarEn = function(panel){
    panel.append(this.ui);
};