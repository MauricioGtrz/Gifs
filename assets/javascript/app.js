// Initial array of gifs
var gifs = ["Rick and Morty", "Spongebob", "Jojo", "Chocolate Rain", "Rick Roll"];

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=MXTPWPAv75fFoEqwkKssf2xtByIxrUVa&limit=10";


  // Creates AJAX call for the specific gif button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#gifs-view").html('');
    for (let i = 0; i < 10; i++) {
        // Creates a div to hold the gif
        var gifDiv = $("<div>");
        // Retrieves the Rating Data
        var rating = response.data[i].rating;
        // Creates an element to have the rating displayed
        var addRating = $("<div>").text("Rating: " + rating);
        // Displays the rating
        gifDiv.append(addRating);
        //Creates an element to hold the image
        var img = $('<img>',{src: response.data[i].images.fixed_height_still.url}).attr('data-still', response.data[i].images.fixed_height_still.url).attr('data-animate', response.data[i].images.fixed_height.url).attr('data-state','still').addClass("gif");
        // Appends the image
        gifDiv.append(img);
        // Puts the entire Gif above the previous gifs.
        $("#gifs-view").append(gifDiv);
    }
  });

}

// Function for displaying gif data
function renderButtons() {

  // Deletes the gifs prior to adding new gifs
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  // Loops through the array of gifs
  for (var i = 0; i < gifs.length; i++) {

    // Then dynamicaly generates buttons for each gif in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of gif to our button
    a.addClass("gif");
    // Added a data-attribute
    a.attr("data-name", gifs[i]);
    // Provided the initial button text
    a.text(gifs[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var gif = $("#gif-input").val().trim();

  // The gif from the textbox is then added to our array
  gifs.push(gif);

  // Calling renderButtons which handles the processing of our gif array
  renderButtons();
  $("#gif-input").html('');
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

$(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });



