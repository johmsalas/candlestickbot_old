var Portafolio = function () {

	var dinero = 1000000000;
	var totalTransado = 0;
	var acciones = {};
	
	function publicUpdate(nemo, nuevoDato) {
		if( typeof acciones[nemo] === "undefined" ) {
			acciones[nemo] = {
				nemo: nemo,
				valorCompra: 0,
				totalAcciones: 0,
				contenedor: jQuery("#portafolio-"+nemo),
				precioActualAccion: nuevoDato[1]
			};
		}
		
		acciones[nemo].precioActualAccion = nuevoDato[1];
		
		acciones[nemo].contenedor.find(".preciomercado").text(
			accounting.formatMoney(    (acciones[nemo].precioActualAccion)*acciones[nemo].totalAcciones,"")   );
		
	};
	
	function publicComprar(nemo) {
		acciones[nemo].valorCompra = acciones[nemo].precioActualAccion;
		acciones[nemo].totalAcciones = parseInt(dinero / acciones[nemo].precioActualAccion);

		var transado = (acciones[nemo].totalAcciones*acciones[nemo].precioActualAccion)
		dinero = dinero - transado;

		totalTransado += transado;


		
		acciones[nemo].contenedor.find(".preciocompra").text(accounting.formatMoney(acciones[nemo].valorCompra,""));
		acciones[nemo].contenedor.find(".totalacciones").text(accounting.formatMoney(acciones[nemo].totalAcciones,""));
		acciones[nemo].contenedor.find(".totalefectivo").text(accounting.formatMoney(dinero,""));

		jQuery("#total_transado").text(accounting.formatMoney(totalTransado,""));
		
	}
	
	function publicVender(nemo) {
		acciones[nemo].valorCompra = acciones[nemo].precioActualAccion;
		var transado = (acciones[nemo].totalAcciones*acciones[nemo].precioActualAccion);
		dinero = dinero + transado;
		acciones[nemo].totalAcciones = 0;

		totalTransado += transado;
		
		acciones[nemo].contenedor.find(".preciocompra").text(acciones[nemo].valorCompra);
		acciones[nemo].contenedor.find(".totalacciones").text(acciones[nemo].totalAcciones);
		acciones[nemo].contenedor.find(".totalefectivo").text(dinero);

		jQuery("#total_transado").text(accounting.formatMoney(totalTransado,""));
	}
	
	return {
		Update: publicUpdate,
		comprar: publicComprar,		
		vender: publicVender
	};
	
}