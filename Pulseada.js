var onDeviceReady = function() {       
    var clienteHTTP = new NodoClienteHTTP('http://router-vortex.herokuapp.com', 10);             
    //var clienteHTTP = new NodoClienteHTTP('http://localhost:3000', 100);             
    NodoRouter.instancia.conectarBidireccionalmenteCon(clienteHTTP);
    
    //var socket = io.connect('http://localhost:3000');    
    //var socket = io.connect('http://router-vortex.herokuapp.com');
    //var conector_socket = new NodoConectorSocket(socket);    
    //NodoRouter.instancia.conectarBidireccionalmenteCon(conector_socket);
    var inicio = new PantallaDeInicio();    
};

$(document).ready(function() {  
    // are we running in native app or in browser?
    window.isphone = false;
    if(document.URL.indexOf("file://") == -1 && document.URL.indexOf("http://") == -1) {
        window.isphone = true;
    }

    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});

