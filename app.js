var Graphics = {};
var mercado_concret;
var analizador_velas_plugins = [];

var productoConcretoViewModelAnalizadorVelas;

$(document).ready(function() {

	/*
	 * Inicializa el mercado
	 */

	mercado_concret = new Mercado();
	portafolio_concret = new Portafolio();
	var reloj = setInterval(function() { mercado_concret.emitirCierre() },300);
	

	/*
	 * Dadas las fabricas concretas genera productos concretos
	 */
	
	var fabricaConcreta = new AbstractGraficadorFactory();	
	fabricaConcreta.registerGraficador( "analisis", ConcretGraficadorAnalisis, ConcretViewModelAnalisis );
	fabricaConcreta.registerGraficador( "analizadorvelas", ConcretAnalizadorVelas, ConcretViewModelAnalizadorVelas );
	
	
	//Ventana principal
	var graficaMain = $("#grafica");
	graficaMain.html(fabricaConcreta.getGraficador("analisis").getHTML(graficaMain.width(),graficaMain.height(),""));
	//Marcos temporales
	var grafica1 = $("#grafica1");
	var grafica2 = $("#grafica2");
	var analizadorvelas = $("#analizadorvelas");
	grafica1.html(fabricaConcreta.getGraficador("analisis").getHTML(grafica1.width(),grafica1.height(),"m12_"));
	grafica2.html(fabricaConcreta.getGraficador("analisis").getHTML(grafica2.width(),grafica2.height(),"m22_"));
	analizadorvelas.html(fabricaConcreta.getGraficador("analizadorvelas").getHTML());
	
	
	var productoConcretoViewModel = fabricaConcreta.getViewModel("analisis");
	productoConcretoViewModelAnalizadorVelas = fabricaConcreta.getViewModel("analizadorvelas");
	ko.applyBindings(productoConcretoViewModel.getViewModel());
	productoConcretoViewModel.setDatos( mercado_concret.getCierresIntraday(productoConcretoViewModel.getViewModel().nemo),
		mercado_concret.getCierresYear(productoConcretoViewModel.getViewModel().nemo) );
		
	mercado_concret.addObserver( productoConcretoViewModel );
	mercado_concret.addObserver( portafolio_concret );
	mercado_concret.addObserver( productoConcretoViewModelAnalizadorVelas );

	/*
	 * Sistema de plugins de plugins
	 */
	productoConcretoViewModelAnalizadorVelas.setPlugins( analizador_velas_plugins );
		
		
	/*
	 * Orientación a eventos
	 */
	$(".tablaOrigen.lista.reordenable").click(function(target){
		productoConcretoViewModel.getViewModel().nemo = $(target.target).text();
		productoConcretoViewModel.setDatos( mercado_concret.getCierresIntraday(productoConcretoViewModel.getViewModel().nemo),
		 mercado_concret.getCierresYear(productoConcretoViewModel.getViewModel().nemo));
		return false;
	});
	$(".compraventa button").click(function() {
		var boton = $(this);
		var nemo = $("#currentnemo").html();
		if(boton.hasClass("comprar")) {
			portafolio_concret.comprar( nemo );
			boton.removeClass("comprar").addClass("vender").text("Vender");
		} else if(boton.hasClass("vender")) {
			portafolio_concret.vender( nemo );
			boton.removeClass("vender").addClass("comprar").text("Comprar");
		}
		return false;
	});

	$(".opcionesgrafica input").click(function(){

		//mercado_concret.forzarEmitirCierre();

	});
	
	$(".changeNemo").click(function(ev){
		ev.preventDefault();
	});



});
