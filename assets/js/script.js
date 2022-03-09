// empty array for search history
let srchHstry = [];

// fetch requests
function runFetch(input) {
    fetch(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${input}`)
            .then(function(response) {
                if(response.ok) {
                    response.json().then(function(data) {
                        displayDescription(data);
                        // save items to localstorage
                        saveHistory(input);
                    });
                };
            })
            .catch(function(error) {
                runErr();
                console.log('not and artist' + error)
            }
        );

        let client_id = 'MjU5NDM1OTZ8MTY0NjM1NzQyOC4yMDc5NzQ';
        let client_secret = '826dd467ea242fba5e339e7c657253c307f579e53f23611ce7311531fbd81b77';

        fetch(`https://api.seatgeek.com/2/events/?client_id=${client_id}&client_secret=${client_secret}&performers.slug=${input.replace(/ /g, '-')}&per_page=5`)
            .then(function(response) {
                if(response.ok) {
                    response.json().then(function(data) {
                        console.log(data);
                        displayConcerts(data);
                    });
                };
            })
            .catch(function(error) {
                runErr();
                console.log('not an artist' + error);
            }
        );
}

// run when there's an error in the input
var runErr = function() {
    
    // check if error is already active
    if ($("form p").hasClass("error-handle")) {
        return;
    } else {
        $("#searchBtn").after(
            "<p>ERROR: Artist not found!</p>"
        );
        $("form p").addClass("error-handle");
        $(".error-handle").css({
            textAlign: "center",
            color: "white",
            marginTop: "10px",
            background: "rgba(0, 0, 0, 0.3)"
        });
        setTimeout(function() {
            $(".error-handle").remove();
        }, 2000);
    }
}

// event listener for the search button
$('#searchBtn').on('click', function(event){
    event.preventDefault();

    // get input
    let input = $('#artist').val().trim().toLowerCase();

    // check to make sure the values are there
    if(!input) {
        runErr();
    }

    runFetch(input);
});

function displayDescription(data) {
    // sets the html for the description to have an image and the bio from theaudiodb
    $('#description').html(
        `<img src='${data.artists[0].strArtistThumb}' alt='${data.artists[0].strArtist}' width="200" height="200">
        <h2 class="subtitle is-2">${data.artists[0].strArtist}</h2>
        <p>${data.artists[0].strBiographyEN}</p>`
    );
};

function displayConcerts(data) {
    // resets the concert list
    $('#concerts').text('');

    // adds a concert button for each concert in the list
    for(i = 0; i < data.events.length; i++) {
        let htmlText = `<li class="card"><a href="${data.events[i].url}>">
        ${data.events[i].datetime_utc.slice(0, 10)}, 
        ${data.events[i].venue.display_location}</a></li>`
        $('#concerts').append(htmlText);
    };
};

function displayHistory() {
    // make a list of the search history from localstorage
    // append '<p data-artist="dragonforce" class="column searchedItem">Dragonforce</p>'
    // append "searchedItem' to '#prevSearches' 
};

function saveHistory(input) {
    // remove duplicates from the search history
    srchHstry = srchHstry.filter(function(i) {
        return i != input;
    });

    // add new search item to the top of the list
    srchHstry.unshift(input);

    // save the whole array to localstorage
    localStorage.setItem('srchHstry', JSON.stringify(srchHstry));

    // load items from localstorage to keep everything up to date
    loadHistory();
};

function loadHistory() {
    // clear out the search history array
    srchHstry = [];

    // grabs the items from localstorage and puts them in a temporary array
    let tempHstry = JSON.parse(localStorage.getItem('srchHstry'));

    // checks to see if there are actually any values in the temporary array, if there are push each item to the search history array
    if (tempHstry) {
        $("#history").show();
        for(i = 0; i < tempHstry.length; i++) {
            srchHstry.push(tempHstry[i]);
        };
    }
};

// load items from localstorage upon page load
loadHistory();