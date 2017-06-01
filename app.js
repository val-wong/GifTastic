// Initial array of movies
      var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "turtle"];
      // Function for dumping the JSON content for each button into the div
      function displayInfo() {
        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC";
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          $("#animal-view").html(JSON.stringify(response));
          renderButtons();
        });
      }
      // Function for displaying movie data
      function renderButtons() {
        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }
      // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
        // Adding the movie from the textbox to our array
        topics.push(animal);
        console.log(topics)
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
      // Function for displaying the movie info
      // Using $(document).on instead of $(".movie").on to add event listenersto dynamically generated elements
      $(document).on("click", ".animal", displayInfo);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();