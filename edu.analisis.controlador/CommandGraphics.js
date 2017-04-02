ko.bindingHandlers.velasJaponesas = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    
    	var ymin = viewModel.ymin;
    	var ymax = viewModel.ymax;
    	var xmin = viewModel.min;
    	var xmax = viewModel.max;
    	if( $(element).parents("#grafica1").size() > 0 ) {
    		ymin = viewModel.m12_ymin;
    		ymax = viewModel.m12_ymax;
    		xmin = viewModel.m12_min;
    		xmax = viewModel.m12_max;
    	} else if( $(element).parents("#grafica2").size() > 0 ) {
    		ymin = viewModel.m22_ymin;
    		ymax = viewModel.m22_ymax;
    		xmin = viewModel.m22_min;
    		xmax = viewModel.m22_max;
    	}
    	    
    	options = { series: { candlestick: { active: true, show: true,rangeWidth:1,bodyWidth:"40%" } }
				,xaxis:  { mode: "time", min: xmin, max: xmax }
				,yaxis:  { min: ymin, max: ymax }
				,grid:   { hoverable: true, clickable: false,color:"rgb(0,0,0)"}
   		};



      if($(".velas:checked").size()==0) {
          options.series.candlestick.upColor = "rgb(200,200,200)";
          options.series.candlestick.downColor = "rgb(200,200,200)";
        }


    

    	var datos = valueAccessor()();
    	if(typeof datos != "undefined") {

        productoConcretoViewModelAnalizadorVelas.setData(datos,ymin,ymax);

        var data = createCandlestick(datos);
  			$.plot($(element),data,this.options);

  				
  			var previousPoint = null;
				
			 $(element).bind("plothover", function (event, pos, item) {
		        if (item) {
		            if (previousPoint != item.datapoint) {
	                    previousPoint = item.datapoint;
	                    
	                    $("#tooltip").remove();

	                    showTooltip(pos.pageX, pos.pageY,
	                                tipoVela(item.value[0],item.value[1],item.value[3],item.value[2],ymax,ymin) );
	                }
	            }
	            else {
	                $("#tooltip").remove();
	                previousPoint = null;            
	            }
		    });
    	}    	
    }
};
ko.bindingHandlers.volumen_tiempo = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    
  },
  update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
  
  	var ymin = viewModel.ymin;
    	var ymax = viewModel.ymax;
    	var xmin = viewModel.min;
    	var xmax = viewModel.max;
    	if( $(element).parents("#grafica1").size() > 0 ) {
    		ymin = viewModel.m12_ymin;
    		ymax = viewModel.m12_ymax;
    		xmin = viewModel.m12_min;
    		xmax = viewModel.m12_max;
    	} else if( $(element).parents("#grafica2").size() > 0 ) {
    		ymin = viewModel.m22_ymin;
    		ymax = viewModel.m22_ymax;
    		xmin = viewModel.m22_min;
    		xmax = viewModel.m22_max;
    	}
  	
  	options = { series: { bars: { show: true, barWidth: 0.6 } }
			,xaxis:  { mode: "time", min: xmin, max: xmax }
			,grid:   { hoverable: true, clickable: true}
  	};
  	
  	var datos = valueAccessor()();
   		if(typeof datos != "undefined") {  	      		  
    		$.plot($(element),[datos],this.options);
		}
	}
};
ko.bindingHandlers.volumen_precio = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

    	var ymin = viewModel.ymin;
    	var ymax = viewModel.ymax;
    	var xmin = viewModel.min;
    	var xmax = viewModel.max;
    	if( $(element).parents("#grafica1").size() > 0 ) {
    		ymin = viewModel.m12_ymin;
    		ymax = viewModel.m12_ymax;
    		xmin = viewModel.m12_min;
    		xmax = viewModel.m12_max;
    	} else if( $(element).parents("#grafica2").size() > 0 ) {
    		ymin = viewModel.m22_ymin;
    		ymax = viewModel.m22_ymax;
    		xmin = viewModel.m22_min;
    		xmax = viewModel.m22_max;
    	}
    
    
    
    
    	var datos = valueAccessor()();
    	
    	if (typeof datos != "undefined") {
    	
	    	var datos_step = ((datos[datos.length-1][1]-datos[0][1] ) / datos.length) * 0.6;
  	  	var precio_maximo = _.max( build_single(datos,0) );
    		var zona1 = precio_maximo * 0.7, zona2 = precio_maximo * 0.2, zona3 = precio_maximo * 0.2 ;
    



    
    		options = { series: { bars: { show:true, barWidth:datos_step, horizontal:true, lineWidth: 1, } }
					,grid:   { hoverable: false, clickable: false, borderWidth:0, color:"rgb(255,255,255)"}
					,yaxis:  { min: ymin, max: ymax }
					,colors: ["rgb(255,255,0)","rgb(255,100,0)","rgb(255,0,0)","rgb(0,0,255)"]

   			};

        if($(".volumen_precio:checked").size()==0) {
          options.colors = ["rgb(200,200,200)","rgb(200,200,200)","rgb(200,200,200)","rgb(200,200,200)"];
        }
   		
   			var gris = 90;
   			
	   		var datos_zona0 = [], datos_zona1 = [], datos_zona2 = [], datos_zona3 = [];
  	 		for(dato in datos) {
   				if ( datos[dato][0] == precio_maximo ) {
                    tendenciaDato = datos[dato][1];
   					datos_zona0.push(datos[dato]);
   				} else if ( datos[dato][0] > zona1 ) {
   					datos_zona1.push(datos[dato]);
	   			} else if ( datos[dato][0] > zona2 ) {
  	 				datos_zona2.push(datos[dato]);
   				} else {
   					datos_zona3.push(datos[dato]);
   				}
   			}
   		
   			//options.xaxis.min = Date.UTC(2010,0,31,12,0);
    		//options.xaxis.max = Date.UTC(2010,1,16,12,0);

				$.plot($(element),[datos_zona0,datos_zona1,datos_zona2,datos_zona3],this.options);
			}
			
    }
};

var tendenciaDato = 0;

ko.bindingHandlers.sugestions = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {


      var basura = valueAccessor()();
    
      var consejos = productoConcretoViewModelAnalizadorVelas.getSugerencias();
      
      var data_consejos_subir = [];
      var data_consejos_bajar = [];
      var data_consejos_borde = [];

      for(i in consejos) {
        var consejo = consejos[i];
        if( consejo.vela[0] < 2000000000 ) {          
          if(consejo.sugerencia=="alza") {
            data_consejos_subir.push([consejo.vela[0],consejo.vela[2]]);
          } else {
            data_consejos_bajar.push([consejo.vela[0],consejo.vela[2]]);
          }  
        }
      }
      
      var ymin = viewModel.ymin;
      var ymax = viewModel.ymax;
      var xmin = viewModel.min;
      var xmax = viewModel.max;
      data_consejos_borde.push([xmin,(ymax+ymin)/2]);
      data_consejos_borde.push([xmax,(ymax+ymin)/2]);
      
      
     
        options = { 
          points: { show: true },
        };
      
        $.plot($(element),
          [
            {
              color: "#008800",
              data:data_consejos_subir,
              points:{ show: true,fill:true,fillColor: "#008800" }
            },
            {
              color: "#ff0000",
              data:data_consejos_bajar,
              points:{ show: true,fill:true,fillColor: "#ff0000" }
            },
            {
              color: "#ffffff",
              fill:true,
              data:data_consejos_borde,
              lines:{ show: true }
            }
          ]);
      
    }
};
ko.bindingHandlers.SMA = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    
    
    	var ymin = viewModel.ymin;
    	var ymax = viewModel.ymax;
    	var xmin = viewModel.min;
    	var xmax = viewModel.max;
    	if( $(element).parents("#grafica1").size() > 0 ) {
    		ymin = viewModel.m12_ymin;
    		ymax = viewModel.m12_ymax;
    		xmin = viewModel.m12_min;
    		xmax = viewModel.m12_max;
    	} else if( $(element).parents("#grafica2").size() > 0 ) {
    		ymin = viewModel.m22_ymin;
    		ymax = viewModel.m22_ymax;
    		xmin = viewModel.m22_min;
    		xmax = viewModel.m22_max;
    	}
    
    
    
    	options = { series: { lines: { show: true } }
				,xaxis:  { mode: "time", min: xmin, max: xmax }
				,grid:   { hoverable: false, clickable: true,color:"rgb(255,255,255)"}
				,yaxis:  { min: ymin, max: ymax }
				,colors: ["rgb(0,0,0)"]
				,legend: {show:false}
   		};
   		
   		var datos = valueAccessor()();
    	if(typeof datos != "undefined") {
    	
				var data = createCandlestick(datos);
				$.plot($(element),data,this.options);
				
			}
    }
};
function showTooltip(x, y, contents) {
    $('<div id="tooltip">' + contents + '</div>').css( {
        position: 'absolute',
        display: 'none',
        top: y + 5,
        left: x + 5,
        border: '1px solid #fdd',
        padding: '2px',
        'background-color': '#fee',
        opacity: 0.80
    }).appendTo("body").fadeIn(200);
};