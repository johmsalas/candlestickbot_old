var AbstractGraficadorFactory = function() {

	// Storage for our graficadores types
	var types_Graficador = {};
	var types_ViewModel = {};

	return {
		
		getGraficador: function ( type, customizations ) {
			var graficador = types_Graficador[type];
			return (graficador) ? new graficador(): new AbstractGraficadorProduct(customizations);
		},
		
		getViewModel: function ( type, customizations ) {
			var viewModel = types_ViewModel[type];
			return (viewModel) ? new viewModel(): new AbstractViewModelProduct(customizations);
		},

		registerGraficador: function ( type, ConcretGraficador, ConcretViewModel ) {
		
			var proto_1 = ConcretGraficador.prototype;
			var proto_2 = ConcretViewModel.prototype;
			types_Graficador[type] = ConcretGraficador;
			types_ViewModel[type] = ConcretViewModel; 
			
			return AbstractGraficadorFactory;
      	
    }
    
  };
};

