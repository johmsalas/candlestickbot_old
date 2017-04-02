var ConcretGraficadorAnalisis = function () {

	function publicGetHTML (ancho, alto, dato) {
	
		var altoInf = alto / 5;
		alto = alto * 4/5;

		return ('<div class="analisis_tecnico">'+
				'<div class="grafica" style="position:relative; height:'+alto+'px;">'+
					'<div class="grafica_precio_volumen" data-bind="volumen_precio: '+dato+'volumen_precio1" style="opacity:1;height: '+alto+'px; width:'+(ancho/2)+'px; position:absolute; top:0px left: 0px;"></div>'+
					'<div class="grafica_precio_volumen" data-bind="volumen_precio: '+dato+'volumen_precio2" style="opacity:1;height: '+alto+'px; width:'+(ancho/2)+'px; position:absolute; top:0px; left: '+(ancho/2)+'px;"></div>'+					
					'<div class="grafica_over" data-bind="SMA: '+dato+'sma14" style="height: '+alto+'px; width:'+ancho+'px; position:absolute; top:0px left: 0px;"></div>'+
					'<div class="grafica_sma" data-bind="SMA: '+dato+'sma200" style="height: '+alto+'px; width:'+ancho+'px; position:absolute; top:0px left: 0px;"></div>'+
					'<div class="grafica_sma" data-bind="velasJaponesas: '+dato+'velasJaponesas" style="height: '+alto+'px; width:'+ancho+'px; position:absolute; top:0px left: 0px;"></div>'+					
					'<div class="grafica_sugerencias" data-bind="sugestions: '+dato+'volumen_precio2" style="opacity:1;height: '+alto+'px; width:'+(ancho)+'px; position:absolute; top:0px; left: 0px;"></div>'+
				'</div>'+
				'<div class="grafica_tiempo_volumen"" data-bind="volumen_tiempo: '+dato+'volumen_tiempo" style="height: '+(altoInf)+'px; width:'+ancho+'px;"></div>'+
				'<div class="grafica_rsi"></div>'+
			'</div>'+
			'<div class="opcionesgrafica">'+
				'<input type="checkbox" class="velas" checked><p>Velas</p>'+
				//'<input type="checkbox" class="volumen_tiempo"><p>Volumen tiempo</p>'+
				'<input type="checkbox" class="volumen_precio" checked><p>Volumnen precio</p>'+
				//'<input type="checkbox" class="volumen_sugestions"><p>Sugerencias</p>'+
				//'<input type="checkbox" class="volumen_sma"><p>Promedio movil</p>'+
			'</div>'
			);
	
	}
	
		        
  
	/*
	 * Revealing Module Pattern
	*/
	return {
		getHTML: publicGetHTML
	};


};



var ConcretAnalizadorVelas = function () {

	function publicGetHTML () {
	
		return ('<table>'+
							'<tr><td></td><td></td><td></td><td></td><td></td></tr>'+
							'<tr><td>0%</td><td>0%</td><td>0%</td><td>0%</td><td>0%</td></tr>'+
						'</table>'
			);
	
	
	}
	
		        
  
	/*
	 * Revealing Module Pattern
	*/
	return {
		getHTML: publicGetHTML
	};

};
