var ConcretViewModelAnalisis = function() {

	var datos = [[20,30],[10,15]],
		velas = [[20,30],[10,15]],
		volumenes_tiempo = [[20,30],[10,15]],
		volumenes_precio1 = [[20,30],[10,15]],
		volumenes_precio2 = [[20,30],[10,15]],
		sugerencias = [[20,30],[10,15]],
		sma14 = [[20,30],[10,15]],
		sma200 = [[20,30],[10,15]] 
		;

	var myViewModel = {
				nemo:"AAPL",
				min:0,
				max:0,
				ymin:0,
				ymax:0,
				velasJaponesas: ko.observable( this.velas ),
				volumen_tiempo: ko.observable( this.volumenes_tiempo ),
				volumen_precio1: ko.observable( this.volumenes_precio1 ),
				volumen_precio2: ko.observable( this.volumenes_precio2 ),
				sugerencias: ko.observable(this.sugerencias),
				sma14: ko.observable( this.sma14 ),
				sma200: ko.observable( this.sma200 ),
				listaAcciones: ko.observableArray(),
				m12_min:0,
				m12_max:0,
				m12_ymin:0,
				m12_ymax:0,
				m12_velasJaponesas: ko.observable( this.velas ),
				m12_volumen_tiempo: ko.observable( this.volumenes_tiempo ),
				m12_volumen_precio1: ko.observable( this.volumenes_precio1 ),
				m12_volumen_precio2: ko.observable( this.volumenes_precio2 ),
				m12_sugerencias: ko.observable(this.sugerencias),
				m12_sma14: ko.observable( this.sma14 ),
				m12_sma200: ko.observable( this.sma200 ),
				m22_min:0,
				m22_max:0,
				m22_ymin:0,
				m22_ymax:0,
				m22_velasJaponesas: ko.observable( this.velas ),
				m22_volumen_tiempo: ko.observable( this.volumenes_tiempo ),
				m22_volumen_precio1: ko.observable( this.volumenes_precio1 ),
				m22_volumen_precio2: ko.observable( this.volumenes_precio2 ),
				m22_sugerencias : ko.observable(this.sugerencias),
				m22_sma14: ko.observable( this.sma14 ),
				m22_sma200: ko.observable( this.sma200 )
			};

	
	
	function publicUpdate( nemo, nuevoDato ) {
	
		var listaAcciones = this.getViewModel().listaAcciones();
		var nuevaListaAcciones = [];
		var hecho = false;
		for( indice in listaAcciones ) {
			var dato = {"nemo":listaAcciones[indice].nemo,"precio":listaAcciones[indice].precio};
			if( dato.nemo == nemo ) {
				dato.precio = Math.round(nuevoDato[1]*100)/100;
				hecho = true;
			}
			nuevaListaAcciones.push(dato);		
		}
		if(!hecho) {
			var dato = {"nemo":nemo,"precio": Math.round(nuevoDato[1]*100)/100};
			nuevaListaAcciones.push(dato);	
		}
		
		this.getViewModel().listaAcciones.removeAll();
		this.getViewModel().listaAcciones( nuevaListaAcciones );
	
		if( nemo == this.getViewModel().nemo ) {
			this.datos.push(nuevoDato);
			var _datos = this.datos;
			this.getViewModel().min = _datos[0][0];
			this.getViewModel().max = _datos[_datos.length-1][0];		
			this.getViewModel().ymin = _.min(build_single(_datos,3));
			this.getViewModel().ymax = _.max(build_single(_datos,2));
			this.getViewModel().velasJaponesas( datos_a_velas( _datos ) );		
			this.getViewModel().volumen_tiempo ( build_pair(_datos, 0,5) );		
			this.getViewModel().volumen_precio1 ( datos_a_volumenprecio(_datos,_.first(_datos,_datos.length/2))  );
			this.getViewModel().volumen_precio2 ( datos_a_volumenprecio(_datos,_.last(_datos,_datos.length/2))   );
			this.getViewModel().sugerencias ( _datos );
			this.getViewModel().sma14 ( SMA(build_pair(_datos,0,1),14)   );
			this.getViewModel().sma200 ( SMA(build_pair(_datos,0,1),20)   );			
			
		}
	
	}
		
	

	function publicSetDatos(_datos, _datos_1y) {
	
		this.datos = _datos;
		this.getViewModel().min = _datos[0][0];
		this.getViewModel().max = _datos[_datos.length-1][0];		
		this.getViewModel().ymin = _.min(build_single(_datos,3));
		this.getViewModel().ymax = _.max(build_single(_datos,2));
		this.getViewModel().velasJaponesas( datos_a_velas( _datos ) );
		this.getViewModel().volumen_tiempo ( build_pair(_datos, 0,5) );
		this.getViewModel().volumen_precio1 ( datos_a_volumenprecio(_datos,_.first(_datos,_datos.length/2))  );
		this.getViewModel().volumen_precio2 ( datos_a_volumenprecio(_datos,_.last(_datos,_datos.length/2))   );
		this.getViewModel().sugerencias ( _datos  );
		this.getViewModel().sma14 ( SMA(build_pair(_datos,0,1),14)   );
		this.getViewModel().sma200 ( SMA(build_pair(_datos,0,1),20)   );
		
		var _datos_12m = _.first(_datos_1y,90);
		this.getViewModel().m12_min = _datos_12m[0][0];
		this.getViewModel().m12_max = _datos_12m[_datos_12m.length-1][0];		
		this.getViewModel().m12_ymin = _.min(build_single(_datos_12m,3));
		this.getViewModel().m12_ymax = _.max(build_single(_datos_12m,2));
		this.getViewModel().m12_velasJaponesas( datos_a_velas( _datos_12m,21 ) );
		this.getViewModel().m12_volumen_tiempo ( build_pair(_datos_12m, 0,5) );
		this.getViewModel().m12_volumen_precio1 ( datos_a_volumenprecio(_datos_12m,_.first(_datos_12m,_datos_12m.length/2))  );
		this.getViewModel().m12_volumen_precio2 ( datos_a_volumenprecio(_datos_12m,_.last(_datos_12m,_datos_12m.length/2))   );
		this.getViewModel().m12_sugerencias ( _datos_12m );
		this.getViewModel().m12_sma14 ( SMA(build_pair(_datos_12m,0,1),14)   );
		this.getViewModel().m12_sma200 ( SMA(build_pair(_datos_12m,0,1),20)   );
		
		var _datos_22m = _.first(_datos_1y,30);
		this.getViewModel().m22_min = _datos_22m[0][0];
		this.getViewModel().m22_max = _datos_22m[_datos_22m.length-1][0];		
		this.getViewModel().m22_ymin = _.min(build_single(_datos_22m,3));
		this.getViewModel().m22_ymax = _.max(build_single(_datos_22m,2));
		this.getViewModel().m22_velasJaponesas( datos_a_velas( _datos_22m,30 ) );
		this.getViewModel().m22_volumen_tiempo ( build_pair(_datos_22m, 0,5) );
		this.getViewModel().m22_volumen_precio1 ( datos_a_volumenprecio(_datos_22m,_.first(_datos_22m,_datos_22m.length/2))  );
		this.getViewModel().m22_volumen_precio2 ( datos_a_volumenprecio(_datos_22m,_.last(_datos_22m,_datos_22m.length/2))   );
		this.getViewModel().m22_sugerencias ( _datos_22m  );
		this.getViewModel().m22_sma14 ( SMA(build_pair(_datos_22m,0,1),14)   );
		this.getViewModel().m22_sma200 ( SMA(build_pair(_datos_22m,0,1),20)   );
		
		
	}
	
	function publicAddDato( _dato ) {
		this.datos.push( _dato );
	}
	
	function publicClear() {
		this.datos = [];
	}

	function publicGetViewModel() {
	
		return this.viewModel; 
		
	}  
  
  return {
  	viewModel: myViewModel,
  	setDatos: publicSetDatos,
		addDato: publicAddDato,
		clear: publicClear,
		getViewModel: publicGetViewModel,
		Update: publicUpdate
	};

}


var ConcretViewModelAnalizadorVelas = function () {

	var ultimos_datos = {};
	var ultimos_datos_maxmin = {};
	var myplugins = [];
	var consejos = [];

	var myViewModel = {
		personName: 'Bob',
		personAge: 123
	};

	function publicGetSugerencias() {

		return consejos;

	}


	function publicGetViewModel() {
	
		return this.viewModel; 
		
	} 

	function publicUpdate( nemo, nuevoDato ) {

	};

	function publicSetData(datos,ymin,ymax) {

		var results = [];

		var config = {max:ymax, min: ymin};
		for(dato in datos) {
			attachInfoVela(datos[dato],config);	
		}		
		for(plugin in this.myplugins) {
			var thisplugin = this.myplugins[plugin];
			var result = thisplugin.execute(datos,config);
			if(typeof result != "undefined") {
				result.vela = datos[datos.length-1];	
			}			
			results.push(result);
		}

		var util_results = [];
		for(result in results) {
			if(typeof results[result] !== 'undefined') {
				util_results.push(results[result]);
			}
		}

        console.log(tendenciaDato);
        /*if(   parseFloat($($(".tablaOrigen tr").eq(4)).find(".precio").text())  >  tendenciaDato  ) {
            jQuery(".compraventa .comprar").click();
        } else {
            jQuery(".compraventa .vender").click();            
        }*/
        
		if(util_results.length > 0) {
			consejos.push(util_results[0]);
            
            
            
			if(util_results[0].sugerencia == "baja") {				
				jQuery(".compraventa .vender").click();
			}
			if(util_results[0].sugerencia == "alza") {
				jQuery(".compraventa .comprar").click();
			}
		}

	};



	function publicSetDatos() {};

	function publicSetPlugins(plugins) {
		this.myplugins = plugins;
	};
  
	/*
	 * Revealing Module Pattern
	*/
	return {
		viewModel: myViewModel,
		setDatos: publicSetDatos,
		setData: publicSetData,
		getViewModel: publicGetViewModel,
		Update: publicUpdate,
		plugins: myplugins,
		setPlugins: publicSetPlugins,
		getSugerencias: publicGetSugerencias
	};

};