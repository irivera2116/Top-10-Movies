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
                'X-RapidAPI-Key': 'fdfbf172d2mshdc329b2d91f0a6ep1fca37jsn527ac717967f',
                'X-RapidAPI-Host': 'imdb-charts.p.rapidapi.com'
            }
        };

        const getMovies = async () => {
            const storeKey = "getMovies" + userChoice;
            console.log(storeKey);
            const savedResult = localStorage.getItem(storeKey);
            console.log(savedResult);
            if (savedResult) {
                return JSON.parse(savedResult);
            }
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Check API key");
            }

            const result = await response.json();
            localStorage.setItem(storeKey, JSON.stringify(result));
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
                console.log("something is worng");
                return;
            }

            console.log("this is:" + data);
            console.log(data.results);

            var movieRow = $("<div class=\"row\">");

            for (var i = 0; i < 10; i++) {
                var mediaRank = data.results[i].rank;
                var songTitle = data.results[i].title;
                var imageUrl = data.results[i].img;
                var mediaGross = data.results[i].gross;

                var metaData = [];

                if (mediaRank) {
                    var ranks = $("<h3>").addClass("card-title").text(mediaRank);
                    metaData.push(ranks);
                }

                if (songTitle) {
                    var titles = $("<p>").addClass("card-text").text(songTitle);
                    metaData.push(titles);
                }

                if (imageUrl) {
                    var image = new Image();
                    image.style.width = '100px';
                    image.style.height = 'auto';
                    image.src = imageUrl;

                    metaData.push(image);
                }

                if (mediaGross) {
                    var grossAmmount = $("<p>").addClass("card-text").text("gross= " + mediaGross);
                    metaData.push(grossAmmount);
                }

                var cardBody = $("<div>").addClass("card bg-orange text-black");
                var cardBodyFive = $("<div>").addClass("card-body p-2");

                movieRow.append(cardBody.append(cardBodyFive.append(...metaData)));




                console.log(songTitle);

            }
            movieRow.addClass("col-md-2.5");
            $("#tier-list").html("<h4 class=\"mt-3\">List: </h4>").append(movieRow);



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
            const result = await response.json();
            console.log(result);

            var joke = $("<p>").addClass("card-text").text(result.joke);
            $("#jokes").html("").append(joke);
        } catch (error) {
            console.error(error);
        }

    }
});


