$('#searchBtn').on('click', function(event){
    event.preventDefault();

    let input = {
        artist: $('#artist').val().trim().toLowerCase(),
        city: $('#city').val().trim().toLowerCase()
    }

    if(!input.artist || !input.city) {
        console.log('error')
    } 
    else {
        //artistReq(input);
    }
    console.log(input);
});
