/*
 * Conversores de formato
*/
function datos_a_velas(datos, numvelas) {

	numvelas = numvelas || 80;
	
	var _datos = [];
	var steps = Math.ceil(datos.length / numvelas);
	
	var indice = 0;
	var current = {tiempo:0,apertura:0, cierre:0, max:0, min:999999};
	while ( indice <= datos.length ) {
		if(typeof datos[indice] != "undefined" ) {
			if( indice % steps == 0 ) {
				current = {apertura:0, cierre:0, max:0, min:999999};
				current.apertura	= datos[indice][4];			
			}
			current.max = ( current.max > datos[indice][2] )? current.max: datos[indice][2];
			current.min = ( current.min < datos[indice][3] )? current.min: datos[indice][3];
			if( indice % steps == steps-1 ) {
				current.cierre = datos[indice][1];
				current.tiempo = datos[indice][0];
				_datos.push( [current.tiempo,current.apertura,current.cierre,current.min,current.max] );
			}			
		}

		indice++; 
	}
	
	//for(dato in datos) {
		//[ [Date.UTC(2010,1,1),50,52,52,49]
		//_datos.push( [datos[dato][0],datos[dato][4],datos[dato][1],datos[dato][3],datos[dato][2]] );
	//}
	
	return _datos;
	
}

function build_single( datos, indice1 ) {

	var _datos = [];
	for(dato in datos) {
		_datos.push( datos[dato][indice1]  );
	}
	
	return _datos;

}

function build_pair( datos, indice1, indice2 ) {

	var _datos = [];
	for(dato in datos) {
		_datos.push( [datos[dato][indice1], datos[dato][indice2]]  );
	}
	
	return _datos;

}

function datos_a_volumenprecio( datos, datos_filtrados ) {

	// datos: determina el rango para tomar los precios
	// datos_filtrados: una vez hallado el rango, se clasifica a datos_filtrados, por defecto tiene el valor de datos
	
	datos_filtrados = datos_filtrados || datos;

	var precios_volumen = build_pair(datos_filtrados, 1, 5);
	var precios = build_single(datos,1);
	var precios_min = _.min(precios);
	var precios_max = _.max(precios);
	var precios_step = (precios_max - precios_min)/50;
	
	//TODO - corregir
	var precios_grouped = [];
	precios_indice = precios_min;
	while( precios_indice <= precios_max ) {
		precios_grouped.push( [0,precios_indice] );
		precios_indice += precios_step;
	}
	
	for(dato in precios_volumen) {
		dato = precios_volumen[dato];
		for(precio in precios_grouped) {
			if( dato[0] >= precios_grouped[precio][1] && dato[0] < precios_grouped[precio][1]+precios_step ) {
				precios_grouped[precio][0] += dato[1];
			}
		}
	}
	
	return precios_grouped;
	

}

function SMA( datos, periodo ) {

	var _datos = []

	for( var i = 0; i < datos.length-20; i++ ) {
		for(var j = 0; j < periodo; j++) {
			if( typeof _datos[ i ] == "undefined" ) {
				_datos[ i ] = [datos[i+20][0],0]
			} 
			_datos[ i ][1] += datos[i+j][1]/periodo;
		}
	}
	_datos = _.without(_datos,NaN);
	
	return _datos;

}

function tipoVela(open, close, min, max, ymax, ymin) {

	var vela = [0,open, close, min, max];
	attachInfoVela(vela,{max:ymax,min:ymin});

	var tendencia = vela[5];

	//return "";
	return "tendencia = "+tendencia+", open = "+open+", close = "+close+", min = "+min+", max = "+max+
		'<table class="probabilidades">'+
			'<thead>'+
				'<tr><th></th><th>Dounji</th><th>Small</th><th>Medium</th><th>High</th></tr>'+
			'</thead>'+
			'<tbody>'+
				'<tr><td>Cuerpo</td><td>'+tworound(vela[6]['d'])+'</td><td>'+tworound(vela[6]['s'])+'</td><td>'+tworound(vela[6]['m'])+'</td><td>'+tworound(vela[6]['h'])+'</td></tr>'+
				'<tr><td>Superior</td><td>'+tworound(vela[7]['d'])+'</td><td>'+tworound(vela[7]['s'])+'</td><td>'+tworound(vela[7]['m'])+'</td><td>'+tworound(vela[7]['h'])+'</td></tr>'+
				'<tr><td>Inferior</td><td>'+tworound(vela[8]['d'])+'</td><td>'+tworound(vela[8]['s'])+'</td><td>'+tworound(vela[8]['m'])+'</td><td>'+tworound(vela[8]['h'])+'</td></tr>'+
			'</tbody>'+
		'</table>'

	;

}

function tworound(input){
	input = input * 100;
	input = Math.round(input);
	return input/100;
}

function attachInfoVela(vela, config) {

	//5: tendencia
	//6: cuerpo
	//7: sombra superior
	//8: sombra inferior
	
	//{
	//  d: %->porcentaje de probabilidad
	//  s: %->porcentaje de probabilidad
	//  m: %->porcentaje de probabilidad
	//  h: %->porcentaje de probabilidad
	//}
	//
	if(vela.length>6)return;

	var open, close, min, max;
	open = vela[1];
	close = vela[2];
	min = vela[3];
	max = vela[4];

	if(open > close) {
		vela[5] = "bajista"
	} else if(open < close) {
		vela[5] = "alcista"
	} else {
		vela[5] = "sin tendencia"
	}

	cuerpo = Math.abs(open-close);
	somsup = max - Math.max(open,close);
	sominf = Math.min(open,close) - min;


	//Las sombras y los cuerpos pertenencen al dominio de la logica borrosa
	//Definimos un tamaño de particiones para clasificar en cuantro tallas los tamaños: d (doji), s(small), m(medium) y h(high)

	var particion = (config['max'] - config['min'])/18;
	var smalllimit = 1*particion;
	var mediumlimit = 2*particion;
	var highlimit = 3*particion;
	var aroundlimit = 0.5*particion;

	var atributos = { 6:cuerpo, 7:somsup, 8: sominf };
	for (atributo in atributos) {
		var size = atributos[atributo];
		//probabilidad de que sea dounji, small, medium o high
		vela[atributo] = {
			d:  (  size>aroundlimit ) ? 0 : (aroundlimit-size)/(aroundlimit-0) ,
			s:  ( size>(smalllimit+aroundlimit) ) ? 0 : ((size<smalllimit && size>0)?1:  ((smalllimit+aroundlimit)-size)/((smalllimit+aroundlimit)-particion) ),
			m:  ( size<(smalllimit-aroundlimit) || size>(mediumlimit+aroundlimit) )? 0: ( size>(smalllimit) && size<(mediumlimit) )?1:  ((size<smalllimit)?
						(size-(smalllimit-aroundlimit))/(smalllimit-(smalllimit-aroundlimit))	    :   (mediumlimit-size)/(mediumlimit-(mediumlimit+aroundlimit))    ) ,
			h: ( size > highlimit ) ? 1 : ( size - (mediumlimit+aroundlimit) )/( highlimit - (mediumlimit+aroundlimit) )
		};
	};

}

function cloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
 
    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }
 
    return temp;
}




