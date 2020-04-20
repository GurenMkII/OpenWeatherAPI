$('#zipbtn').click(() => {
    zipCode = $('#zip').val();
    var apiKey = '7ac12bf73303142e8088b1597281d7e0';
    $.get('https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&units=imperial&appid='+apiKey, function (response) {
        $('.deletable').remove();
        $('#cityname').text(response.name);
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        $.get('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid='+apiKey, function (response) {
            $('#currentcond').text(response.current.weather[0].main);
            $('#currentcond2').text(response.current.weather[0].description);
            $('#maintemp').text(Math.round(response.current.temp)+String.fromCharCode(176));
            $('#timeplace').text(moment().tz(response.timezone).format('h:mm a'));
            $('#dayplace').text(moment().tz(response.timezone).format('dddd'));
            $('#dateplace').text(moment().tz(response.timezone).format('MMMM DD, YYYY'));
            $('#tomorrow').text('Tomorrow:');
            $('#tomorrowdate').text(moment.unix(response.daily[1].dt).format('dddd, MMMM DD'));
            $('#tomorrowtemp').text(Math.round(response.daily[1].temp.day)+String.fromCharCode(176)+' Average');
            $('#tomorrowtemp2').text('Low '+ Math.round(response.daily[1].temp.min)+String.fromCharCode(176)+' - High '+Math.round(response.daily[1].temp.max)+String.fromCharCode(176));
            $('#tomorrowcond').text(response.daily[1].weather[0].main+' - '+response.daily[1].weather[0].description);
            $('#pic').remove();
            $('#weathericon').prepend('<img src="" alt="weather icon" id="pic"></img>')
            $('#pic').attr('src', 'http://openweathermap.org/img/wn/'+response.current.weather[0].icon+'@2x.png');
        });
        
    });

    
    $('#zip').val('');
})







