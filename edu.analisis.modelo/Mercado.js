var Mercado = function () {

	var pausado = false;

	var horaMercado = 24,
			tiempoAvance = 1
	;
	
	function privateEmitirCierre() {
	
		if(!pausado) {
		
			horaMercado += tiempoAvance;
		
            if(horaMercado < BAC.today.length) {
				mercado_concret.notify(BAC.nemo ,BAC.today[horaMercado]);
			}
            if(horaMercado < PFAVAL.today.length) {
				mercado_concret.notify(PFAVAL.nemo ,PFAVAL.today[horaMercado]);
			}			
			if(horaMercado < MSFT.today.length) {
				mercado_concret.notify(MSFT.nemo ,MSFT.today[horaMercado]);
			}
			if(horaMercado < AAPL.today.length) {
				mercado_concret.notify(AAPL.nemo ,AAPL.today[horaMercado]);
			}
            
		
		}

	}

	function privateForzarEmisionCierre() {

        if(horaMercado < BAC.today.length) {
			mercado_concret.notify(BAC.nemo ,BAC.today[horaMercado]);
		}
        if(horaMercado < PFAVAL.today.length) {
			mercado_concret.notify(PFAVAL.nemo ,PFAVAL.today[horaMercado]);
		}		
		if(horaMercado < MSFT.today.length) {
			mercado_concret.notify(MSFT.nemo ,MSFT.today[horaMercado]);
		}
		if(horaMercado < AAPL.today.length) {
			mercado_concret.notify(AAPL.nemo ,AAPL.today[horaMercado]);
		}
        

	}
	
	function publicSetContext(context) {
		this.mercado = context;
	}
	
	/**
	 * Observable Pattern
	*/

	var publicObservers = new ObserverList();
		
	function publicGetCierresIntraday(nemo) {
	
		/*MSFT = [[1353682978,27.4100,27.4155,27.4000,27.4155,53800]
,[1353683037,27.4010,27.4200,27.4001,27.4100,60800]
,[1353683098,27.4050,27.4100,27.4000,27.4050,144800]
,[1353683153,27.4150,27.4200,27.4010,27.4010,86800]
,[1353683219,27.4300,27.4300,27.4100,27.4100,178600]
,[1353683272,27.4300,27.4300,27.4100,27.4250,566500]
,[1353683335,27.4300,27.4400,27.4200,27.4350,125700]
,[1353683395,27.4250,27.4299,27.4200,27.4200,53200]
,[1353683459,27.4400,27.4499,27.4200,27.4200,234600]
,[1353683519,27.4800,27.4900,27.4400,27.4400,241600]
,[1353683579,27.4950,27.5000,27.4800,27.4900,833300]
,[1353683639,27.5000,27.5000,27.4900,27.5000,208600]
,[1353683695,27.5100,27.5200,27.5000,27.5000,107600]
,[1353683758,27.5250,27.5350,27.5100,27.5100,250300]
,[1353683816,27.5300,27.5300,27.5200,27.5200,88300]
,[1353683879,27.5500,27.5500,27.5200,27.5200,142800]
,[1353683938,27.5450,27.5500,27.5400,27.5500,113200]
,[1353683999,27.5600,27.5600,27.5400,27.5500,297100]
,[1353684058,27.5700,27.5800,27.5500,27.5600,800200]
,[1353684118,27.5700,27.5800,27.5600,27.5701,158900]
,[1353684178,27.6100,27.6100,27.5650,27.5650,177500]
,[1353684236,27.6190,27.6200,27.6000,27.6200,82200]
,[1353684299,27.6233,27.6500,27.6150,27.6190,147300]
,[1353684356,27.6300,27.6300,27.6200,27.6200,184300]
,[1353684415,27.6450,27.6450,27.6250,27.6300,205800]
,[1353684475,27.6650,27.6700,27.6300,27.6400,247000]
];*/
		
		
			var datos;
        if(nemo=="PFAVAL") {
			datos=PFAVAL.today;
		} else if(nemo=="AAPL") {
			datos=AAPL.today;
		} else if(nemo=="MSFT") {
			datos=MSFT.today;
		} else if(nemo=="BAC") {
			datos=BAC.today;
		}
		return _.first( datos, horaMercado+1 );
	
	}
	
	function publicGetCierresYear(nemo) {
	
	
		var datos;
        if(nemo=="PFAVAL") {
			datos=PFAVAL1Y;
		} else if(nemo=="AAPL") {
			datos=AAPL1Y;
		} else if(nemo=="MSFT") {
			datos=MSFT1Y;
		} else if(nemo=="BAC") {
			datos=BAC1Y;
		}
        
		
		if(!datos.alreadyFormated) {
			for(var dato in datos.year) {
				var a = "ds";
				var tiempo = ""+datos.year[dato][0];
				var year = tiempo.substring(0,4);
				var month = tiempo.substring(4,6);
				var day = tiempo.substring(6);			
				datos.year[dato][0] = Date.UTC(year, month, day);
			}
			datos.alreadyFormated = true;
		}
	
		return datos.year;
	
	}
	
	
	publicAddObserver = function( observer ){
  		this.observers.Add( observer );
	};
	
	publicRemoveObserver = function( observer ){
  		this.observers.RemoveIndexAt( this.observers.IndexOf( observer, 0 ) );
	};

	publicNotify = function( nemo, context ){
  		var observerCount = this.observers.Count();
  		for(var i=0; i < observerCount; i++){
    		this.observers.Get(i).Update( nemo, context );
  		}
	};
 
 
 	$(".controles #play").click(function() {
 		pausado = false;
 	});
 	
 	$(".controles #pause").click(function() {
 		pausado = true;
 	});
 

	/*
	 * Revealing Module Pattern
	*/
	return {
		getCierresIntraday: publicGetCierresIntraday,
		getCierresYear: publicGetCierresYear,
		addObserver: publicAddObserver,
		removeObserver: publicRemoveObserver,
		notify: publicNotify,
		observers: publicObservers,
		setContext: publicSetContext,
		emitirCierre: privateEmitirCierre,
		forzarEmitirCierre: privateForzarEmisionCierre
	};

};