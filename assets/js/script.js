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

/* THIS DOES NOT WORK --
$.ajax({
    url: 'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks',
    type: 'GET',
    headers: {
        'Authorization' : 'Bearer BQDO7RG85fTddaQgqaDc69pT-yEStgKcHBYg4wkf5tBZPt8-XOJMr2Gwi9AwVddckDEBLsZ7Qb3nmQxk4RhUDHDDW1XLL87H7jZ294v2kDt2-acP3aKA1Zrbeugg2dB_d2d37x5pZeqJcl3kXTL7ibdEsntDus-ieg',
        'Content-Type' : 'application/json'
    },
    success: function(data) {
        console.log(data);
    }
}); */