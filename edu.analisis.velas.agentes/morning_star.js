var morning_star = function() {

	/* 

	Una de las pautas de tres velas más esperadas tras una tendencia bajista
	que se desea que se acabe es la denominada “morning star”, traducida como
	“lucero del alba” o como “estrella de la mañana”. Su nombre es muy
	representativo de esta pauta alcista porque simboliza el despertar de
	las subidas en las cotizaciones.

	Esta formación de tres velas se compone de las siguientes. La primera vela
	es negra con cuerpo real grande que se produce en una tendencia bajista
 	clara. La segunda vela abre con un gap y tiene el cuerpo real pequeño cuya
 	apertura y cierre están por debajo de la vela anterior pudiendo ser una
 	vela negra o blanca. La tercera y última vela abre con gap al alza y
 	desarrolla un cuerpo real blanco grande que cierra dentro de los niveles
 	del cuerpo de la primera vela negra.

	La fiabilidad del lucero del alba (morning star) será tanto mayor según en los
	niveles que se produce, es decir, dependiendo de la claridad de la tendencia
	bajista previa y de la zona si es de soporte. De confirmarse, el nivel más bajo
	de la formación marca un soporte.

	*/

	function publicExecute( data, config ) {

		if(data.length>=3) {

			var vela1 = data[data.length-3];
			var vela2 = data[data.length-2];
			var vela3 = data[data.length-1];

			var probabilidad = 1;

			if(vela1[5]!="bajista") probabilidad = probabilidad * 0;
			if(vela3[5]!="alcista") probabilidad = probabilidad * 0;
			if(vela1[2]<=vela2[1]) probabilidad = probabilidad * 0;//confirmamos gap
			if(vela2[2]<=vela3[1]) probabilidad = probabilidad * 0;//confirmamos gap
			if(vela2[1]>=vela1[2] || vela2[2]>=vela1[2]) probabilidad = probabilidad * 0;//la segunda vela debe estar por debajo de la primera
			if(vela3[2]>vela1[2] || vela3[2]<vela1[1]) probabilidad = probabilidad * 0;//la tercera vela cierra en el cuerpo de la primera

			//confirmamos los tamaños de las velas
			probabilidad = probabilidad * vela1[6]['h'];
			probabilidad = probabilidad * vela2[6]['s'];
			probabilidad = probabilidad * vela3[6]['h'];

			if(probabilidad > 0) {
				console.log(probabilidad);	
			}			

		}

	};


	return {
		execute: publicExecute
	};

}();

analizador_velas_plugins.push(morning_star);













var martillo = function() {

	/* 
El significado del martillo es más intuitivo. Durante la sesión los precios
 han tenido una caída fuerte (como muestra la gran sombra inferior) que es
  continuación de la tendencia bajista que traía el precio, pero para el
   final de la sesión se han recuperado y cierran cerca de los máximos.
    El mercado ha rechazado rápidamente los precios tan bajos que se han
     alcanzado a mitad de sesión, mostrando que la tendencia bajista pierde
      fuerza y a esos precios los vendedores no están dispuestos a bajar más
       los precios y los compradores los encuentran atractivos.

       Si el martillo tiene éxito y funciona como tal, los precios no deberían
        caer por debajo del mínimo de la sesión en que se forma el martillo,
        aunque podrían no subir inmediatamente e incluso volver a esa zona de mínimos,
        sin romperla, en las siguiente sesiones.

	*/

	function publicExecute( data, config ) {

		if(data.length>=3) {

			var vela1 = data[data.length-3];
			var vela2 = data[data.length-2];
			var vela3 = data[data.length-1];

			var probabilidad = 1;

			if(vela1[5]!="bajista") probabilidad = probabilidad * 0;
			if(vela3[5]!="alcista") probabilidad = probabilidad * 0;
			
			//confirmamos los tamaños de las velas
			probabilidad = probabilidad * vela2[6]['s'];
			probabilidad = probabilidad * vela2[7]['d'];
			probabilidad = probabilidad * vela2[8]['h'];

			if(probabilidad > 0) {
				console.log(probabilidad);	
			}			

		}

	};


	return {
		execute: publicExecute
	};

}();

analizador_velas_plugins.push(martillo);















var hombrecolgado = function() {

	/* 
Para que un hombre colgado sea considerado como tal es necesario
 que se produzca una confirmación en la vela siguiente. Dicha
  confirmación consiste en que la siguiente vela tenga el cuerpo negro
   y su cierre quede por debajo del cuerpo del hombre colgado, tal y
    como se ve en el gráfico anterior. Esta confirmación se debe a que 
    la larga sombra del hombre colgado en principio tiene implicaciones
     alcistas, ya que supone que el mercado se ha recuperado de una fuerte
      caída en la misma sesión. Por eso es imprescindible que la siguiente
       vela muestre que el mercado vuelve a caer y los precios que fueron
        rechazados la sesión anterior son aceptados en la siguiente sesión.

	*/

	function publicExecute( data, config ) {

		if(data.length>=3) {

			var vela1 = data[data.length-3];
			var vela2 = data[data.length-2];
			var vela3 = data[data.length-1];

			var probabilidad = 1;

			if(vela1[5]!="alcista") probabilidad = probabilidad * 0;
			if(vela3[5]!="bajista") probabilidad = probabilidad * 0;
			
			//confirmamos los tamaños de las velas
			probabilidad = probabilidad * vela2[6]['s'];
			probabilidad = probabilidad * vela2[7]['d'];
			probabilidad = probabilidad * vela2[8]['h'];

			if(probabilidad > 0) {
				console.log(probabilidad);	
			}			

		}

	};


	return {
		execute: publicExecute
	};

}();

analizador_velas_plugins.push(hombrecolgado);










var envolventealcista = function() {

	/* 
La envolvente alcista tiene que aparecer al final de una tendencia bajista y la envolvente bajista tras una tendencia alcista. Si cualquiera de ellas aparece en medio de un movimiento lateral pierden su significado.
El punto más bajo de la envolvente alcista (sombras de las 2 velas incluídas) debe considerarse como zona de soporte y el punto más alto de la envolvente bajista (igualmente incluyendo las sombras) como zona de resistencia.

	*/

	function publicExecute( data, config ) {

		if(data.length>=3) {

			var vela1 = data[data.length-3];
			var vela2 = data[data.length-2];
			var vela3 = data[data.length-1];

			var probabilidad = 1;

			if(vela1[5]!="bajista") probabilidad = probabilidad * 0;
			if(vela2[5]!="bajista") probabilidad = probabilidad * 0;
			if(vela3[5]!="alcista") probabilidad = probabilidad * 0;
			if(vela3[2]<=vela2[1] || vela2[1]>=vela1[2]) probabilidad = probabilidad * 0;//envolvimiento
			
			
			if(probabilidad > 0) {
				return {
					patron: 'envolvente alcista',
					probabilidad: probabilidad,
					sugerencia: 'alza'
				}
				console.log(probabilidad);	
			}			

		}

	};


	return {
		execute: publicExecute
	};

}();

analizador_velas_plugins.push(envolventealcista);















var envolventebajista = function() {

	/* 
La envolvente alcista tiene que aparecer al final de una tendencia bajista y la envolvente bajista tras una tendencia alcista. Si cualquiera de ellas aparece en medio de un movimiento lateral pierden su significado.
El punto más bajo de la envolvente alcista (sombras de las 2 velas incluídas) debe considerarse como zona de soporte y el punto más alto de la envolvente bajista (igualmente incluyendo las sombras) como zona de resistencia.

	*/

	function publicExecute( data, config ) {

		if(data.length>=3) {

			var vela1 = data[data.length-3];
			var vela2 = data[data.length-2];
			var vela3 = data[data.length-1];

			var probabilidad = 1;

			if(vela1[5]!="alcista") probabilidad = probabilidad * 0;
			if(vela2[5]!="alcista") probabilidad = probabilidad * 0;
			if(vela3[5]!="bajista") probabilidad = probabilidad * 0;
			if(vela3[2]>=vela2[1] || vela2[1]<=vela1[2]) probabilidad = probabilidad * 0;//envolvimiento
			
			
			if(probabilidad > 0) {
				return {
					patron: 'envolvente bajista',
					probabilidad: probabilidad,
					sugerencia: 'baja'
				}
				console.log(probabilidad);	
			}

		}

	};


	return {
		execute: publicExecute
	};

}();

analizador_velas_plugins.push(envolventebajista);

















var nubeoscura = function() {

	/* 
Es una figura de vuelta bajista, por lo que aparece al final de una tendencia alcista.
 Es un patrón formado por 2 velas. La primera es una vela blanca con un cuerpo grande
  y la segunda vela es negra, con el cuerpo también grande. La apertura de la vela
   negra está por encima del cierre de la vela blanca y el cierre de la vela negra
    penetra casi todo el cuerpo de la vela blanca, sin llegar a quedar por debajo
     de la apertura de la vela blanca
	*/

	function publicExecute( data, config ) {

		if(data.length>=3) {

			var vela1 = data[data.length-3];
			var vela2 = data[data.length-2];
			var vela3 = data[data.length-1];

			var probabilidad = 1;

			if(vela1[5]!="alcista") probabilidad = probabilidad * 0;
			if(vela2[5]!="alcista") probabilidad = probabilidad * 0;
			if(vela3[5]!="bajista") probabilidad = probabilidad * 0;
			if(vela3[2]<=vela2[1] || vela2[1]<=vela1[2]) probabilidad = probabilidad * 0;//envolvimiento
			
			
			if(probabilidad > 0) {
				return {
					patron: 'nube oscura',
					probabilidad: probabilidad,
					sugerencia: 'alza'
				}
				console.log(probabilidad);	
			}

		}

	};


	return {
		execute: publicExecute
	};

}();

analizador_velas_plugins.push(nubeoscura);















var pautapenetrante = function() {

	/* 
Es el equivalente alcista de la nube oscura. Por tanto es una figura
 de vuelta alcista que aparece al final de una tendencia bajista. La
  pauta penetrante está formada por 2 velas, ambas de cuerpo grande.
   La primera es una vela negra y la segunda es una vela blanca. La
    apertura de la vela blanca está debajo del cierre de la vela negra,
     y el cierre de la vela blanca penetra profundamente en el cuerpo
      de la vela negra, pero sin llegar a quedar por encima de la
       apertura de la vela negra
	*/

	function publicExecute( data, config ) {

		if(data.length>=3) {

			var vela1 = data[data.length-3];
			var vela2 = data[data.length-2];
			var vela3 = data[data.length-1];

			var probabilidad = 1;

			if(vela1[5]!="bajista") probabilidad = probabilidad * 0;
			if(vela2[5]!="bajista") probabilidad = probabilidad * 0;
			if(vela3[5]!="alcista") probabilidad = probabilidad * 0;
			if(vela3[2]>=vela2[1] || vela2[1]>=vela1[2]) probabilidad = probabilidad * 0;//envolvimiento
			
			
			if(probabilidad > 0) {
				return {
					patron: 'pauta penetrante',
					probabilidad: probabilidad,
					sugerencia: 'alza'
				}
				console.log(probabilidad);	
			}

		}

	};


	return {
		execute: publicExecute
	};

}();

analizador_velas_plugins.push(pautapenetrante);















var estrellaatardecer = function() {

	/* 

	Una de las pautas de tres velas más esperadas tras una tendencia bajista
	que se desea que se acabe es la denominada “morning star”, traducida como
	“lucero del alba” o como “estrella de la mañana”. Su nombre es muy
	representativo de esta pauta alcista porque simboliza el despertar de
	las subidas en las cotizaciones.

	Esta formación de tres velas se compone de las siguientes. La primera vela
	es negra con cuerpo real grande que se produce en una tendencia bajista
 	clara. La segunda vela abre con un gap y tiene el cuerpo real pequeño cuya
 	apertura y cierre están por debajo de la vela anterior pudiendo ser una
 	vela negra o blanca. La tercera y última vela abre con gap al alza y
 	desarrolla un cuerpo real blanco grande que cierra dentro de los niveles
 	del cuerpo de la primera vela negra.

	La fiabilidad del lucero del alba (morning star) será tanto mayor según en los
	niveles que se produce, es decir, dependiendo de la claridad de la tendencia
	bajista previa y de la zona si es de soporte. De confirmarse, el nivel más bajo
	de la formación marca un soporte.

	*/

	function publicExecute( data, config ) {

		if(data.length>=3) { 

			var vela1 = data[data.length-3];
			var vela2 = data[data.length-2];
			var vela3 = data[data.length-1];

			var probabilidad = 1;

			if(vela1[5]!="bajista") probabilidad = probabilidad * 0;
			if(vela3[5]!="alcista") probabilidad = probabilidad * 0;
			if(vela1[2]<=vela2[1]) probabilidad = probabilidad * 0;//confirmamos gap
			if(vela2[2]<=vela3[1]) probabilidad = probabilidad * 0;//confirmamos gap
			if(vela2[1]>=vela1[2] || vela2[2]>=vela1[2]) probabilidad = probabilidad * 0;//la segunda vela debe estar por debajo de la primera
			if(vela3[2]>vela1[2] || vela3[2]<vela1[1]) probabilidad = probabilidad * 0;//la tercera vela cierra en el cuerpo de la primera

			//confirmamos los tamaños de las velas
			probabilidad = probabilidad * vela1[6]['h'];
			probabilidad = probabilidad * vela2[6]['s'];
			probabilidad = probabilidad * vela3[6]['h'];

			if(probabilidad > 0) {
				console.log(probabilidad);	
			}

		}

	};


	return {
		execute: publicExecute
	};

}();

analizador_velas_plugins.push(estrellaatardecer);






