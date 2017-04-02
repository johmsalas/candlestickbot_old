function crudeToCandles(crude) {

    var dataline = crude.split(",");
    var darray = [];
    
    var vin, vout, vmax, vmin;
    var c = 0;
    for(var i in dataline) {
        
        var data = jQuery.trim(dataline[i]).split(" ");
        var date = data[0].replace(" ","").split("-");
        var datestr = "" + date[2] + date[0] + date[1];
        date = new Date(date[2], date[0], date[1]);
        
        var value = data[1].replace(" ","");
        
        c++;
        if(c==1) {
            vin = value;
            vmax = value;
            vmin = value;
        }
        
        if(value < vmin) vmin = value;
        if(value > vmax) vmax = value;
        
        if(c==5) {
            c = 0;
            vout = value;
            darray.push([datestr, parseFloat(vin), parseFloat(vout), parseFloat(vmin), parseFloat(vmax), date.getTime()]);
        }
    }
    
    return darray;

}
