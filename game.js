// Page loads and clears Player1 and Player2
// If Player1 is set to nothing, display player 1 welcome message and player text input
// Collect user name and store in Player1 object
// Push player1 name to Firebase
// If Player1 has a value, check if Player2 has a value, if not display player 2 welcome message and player text input
// Collect user name and store in Player2 object
// Push player2 name to Firebase
// Clear welcome message and hide player name text input but display “leave game” button
// Display game scoreboard
// Player 1 receives notification that it’s their turn
// Player1played evaluates to true after player1 makes selection
// Player 2 receives notification that it’s their turn
// Player2played evaluates to true after player 2 makes selection
// If statements evaluate who wins

// Reveals both selections to player game boards and prints the winner’s name in the middle of the game boards, then changes both player1Played and player2Played to false, prompting player1 to receive a notification that it’s their turn.

// *research how to display different content to player1 and player2 screens
// *research how to create data trees in firebase


$(document).ready(function () {

    // Initialize Database
    var config = {
        apiKey: "AIzaSyAtJzpYUaAOTzrAwO6b8i4IqG6iS7LdOn0",
        authDomain: "multi-player-3c67a.firebaseapp.com",
        databaseURL: "https://multi-player-3c67a.firebaseio.com",
        projectId: "multi-player-3c67a",
        storageBucket: "multi-player-3c67a.appspot.com",
        messagingSenderId: "531677587273"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // some variables
    var player1 = "";
    var player1Selected = false;
    var player1wins = 0;
    var player1ties = 0;
    var player1losses = 0;

    var player2 = "";
    var player2Selected = false;
    var player2wins = 0;
    var player2ties = 0;
    var player2losses = 0;

    // collect player names
    $("#addPlayer").on("click", function () {
        console.log("clicked");
        if (player1Selected) {
            console.log("clicked again");
            player2 = $("#playerName").val().trim();
            console.log("player2 = " + player2);
            player2Selected = true;
            console.log("player2Selected = " + player2Selected)
            database.ref().child("players").child("2").set({

                player2: player2,
                wins: player2wins,
                ties: player2ties,
                losses: player2losses

            });
        } else {
            player1 = $("#playerName").val().trim();
            console.log("player1 = " + player1);
            player1Selected = true;
            console.log("player1Selected = " + player1Selected)

            // push player 1 object to database
            database.ref().child("players").set({
                1: {
                    player1: player1,
                    wins: player1wins,
                    ties: player1ties,
                    losses: player1losses
                }

            });
        }

    });

    database.ref().on("value", function (snapshot) {
        var players = snapshot.val();
        console.log("firebase snapshot: " + players);
    })

});
