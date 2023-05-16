$(document).ready(function () {

    var boxOfficeEl = "boxoffice";
    var movieMeter = "moviemeter";
    var tvMeter = "tvmeter";
    var topAction = "top-action";
    var topAdventure = "top-adventure";
    var topComedy = "top-comedy";
    var topHorror = "top-horror";

    $("#boxOffice").on("click", function () {
        tierListDisplay(boxOfficeEl);
    });
    $("#movieMeter").on("click", function () {
        tierListDisplay(movieMeter);
    });

    $("#topShows").on("click", function () {
        tierListDisplay(tvMeter);
    });

    $("#top-action").on("click", function () {
        tierListDisplay(topAction);
    });

    $("#top-adventure").on("click", function () {
        tierListDisplay(topAdventure);
    });

    $("#top-comedy").on("click", function () {
        tierListDisplay(topComedy);
    });

    $("#top-horror").on("click", function () {
        tierListDisplay(topHorror);
    });



    async function tierListDisplay(userChoice) {
        const url = 'https://imdb-charts.p.rapidapi.com/charts?id=' + userChoice + '';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6ddeaa4102mshaf5365c4cdef8edp1a1001jsn1f73ecd0c913',
                'X-RapidAPI-Host': 'imdb-charts.p.rapidapi.com'
            }
        };

        const getMovies = async () => {
            const savedResult = localStorage.getItem("getMovies" + userChoice);
            if (savedResult) {
                return savedResult;
            }
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Check API key");
            }

            const result = await response.json();
            localStorage.setItem("getMovies" + userChoice, result);
            console.log(result);
            return result;


        }
        getMovies().catch(error => {
            console.error(error.message);
            return false;
        })
            .then(displayList);

        function displayList(data) {
            if (!data) {
                return;
            }
            $("#tier-list").html("<h4 class=\"mt-3\">List: </h4>").append("<div class=\"row\">");
            console.log("this is:" + data);
            console.log(data.results);
            for (var i = 0; i < 10; i++) {
                songTitle = data.results[i].title;
                var ranks = $("<h3>").addClass("card-title").text(data.results[i].rank);
                var titles = $("<p>").addClass("card-text").text(songTitle);
                //var artists = $("<p>").addClass("card-text").text(data.results[i].artist);
                var grossAmmount = $("<p>").addClass("card-text").text("gross= " + data.results[i].gross);
                var colFive = $("<div>").addClass("col-md-2.5");
                var cardFive = $("<div>").addClass("card bg-orange text-black");
                var cardBodyFive = $("<div>").addClass("card-body p-2");

                var imageUrl = data.results[i].img;

                var image = new Image();
                image.style.width = '100px';
                image.style.height = 'auto';
                image.src = imageUrl;


                console.log(songTitle);
                //merge together and put on page
                if (imageUrl === undefined)
                    colFive.append(cardFive.append(cardBodyFive.append(ranks, titles, grossAmmount)));
                else if (imageUrl)
                    colFive.append(cardFive.append(cardBodyFive.append(ranks, titles, image, grossAmmount)));
                //append card to column, body to card, and other elements to body
                $("#tier-list .row").append(colFive);

            }




        }

    }
    $("#jokes").on("click", function () {
        getJokes();
    });

    async function getJokes() {
        const url = 'https://dad-jokes-api1.p.rapidapi.com/dad_jokes';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6ddeaa4102mshaf5365c4cdef8edp1a1001jsn1f73ecd0c913',
                'X-RapidAPI-Host': 'dad-jokes-api1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
            var joke = $("<p>").addClass("card-text").text(result);
            $("#jokes").html("").append(joke);
        } catch (error) {
            console.error(error);
        }

    }
});


