var PantallaLogin = function(opt){
    this.o = opt;
    this.start();
};

PantallaLogin.prototype.start = function(un_panel){
    this.ui = $('#pantalla_login');
    this.txt_nombre_usuario = this.ui.find('#txt_nombre_usuario');
    this.btn_log_in = this.ui.find("#btn_log_in");
    
    var _this = this;

    this.btn_log_in.click(function() { 
         if(_this.txt_nombre_usuario.val() != ""){
            _this.o.callback_usuario(new Usuario(_this.txt_nombre_usuario.val()));
         }
     });
};