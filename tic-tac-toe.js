/*
Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
    - Create a Tic-Tac-Toe game grid using your HTML element of choice.
    - When a cell in the grid is clicked, an X or O should appear in that spot depending on whose 
    turn it is.
    - A heading should say whether it is X's or O's turn and change with each move made.
    - A button should be available to clear the grid and restart the game.
    - When a player has won, or the board is full and the game results in a draw, a Bootstrap 
    alert or similar Bootstrap component should appear across the screen announcing the winner.
*/

/*jQuery function that is used to ensure that all HTML elements have been loaded before the jQuery 
code runs.*/
$(document).ready(function () { 

    //Declare variables to start the game.
    let currentPlayer = 'X' //Current player's turn, X goes first.
    let gameActive = true   //Indicates game is in play or not.

    //Event listener to handle a cell click on the game grid or board.
    $(".board").on("click", ".cell", function () {

        //If the game is in play and the cell is empty...
        if (gameActive && $(this).text() === "") {

            //This will fill the empty cell with the current player's symbol.
            $(this).text(currentPlayer); 
            
            //Check if the current move results in a win.
            checkWin(); 

            //If current move did not result in a win, then switch player.
            switchPlayer();
        }
    });

    //Function to check if a player's move results in a win.
    function checkWin() {

        //Get all grid cells on game board.
        let cells = $(".cell");
        
        //Win conditions array.
        let winConditions = [

            //All possible win conditions for rows, columns, and diagonals.
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        
        //Loop going through each win conditions.
        for (let i = 0; i < winConditions.length; i++) {

            //a, b, c, refers to the current index combination for each win condition.
            let [a, b, c] = winConditions[i]; 

            //If a, b, c of the current index combination are the same and not empty...
            if (
                cells.eq(a).text() &&
                cells.eq(a).text() === cells.eq(b).text() &&
                cells.eq(a).text() === cells.eq(c).text()
            ) {

                //The game is no longer active.
                gameActive = false;
                
                //There will be a display of the current player showing a win.
                $("#resultText").text(`${currentPlayer} Wins!`);

                //Then an alert will trigger.
                $("#resultAlert")

                //jQuery method to add a class as a Bootstrap alert.
                .addClass("alert-primary")
                
                //The "d-none" class is removed to show the element or message.
                .removeClass("d-none");
            return;
            }
        }

        //If there are no more empty cells and a win condition is not triggered...
        if ($(".cell:empty").length === 0) {

            //The game is no longer active.
            gameActive = false;

            //And the result will diplay a draw.
            $("#resultText").text("Draw!");

            //Then an alert will trigger.
            $("#resultAlert")
            
            //jQuery method to add a class as a Bootstrap alert.
            .addClass("alert-dark")
            
            //The "d-none" class is removed to show the element or message.
            .removeClass("d-none");
        }
    }

    //Function to switch the current player between X and O.
    function switchPlayer() {

        //(""?"":"") Ternary operator shorthand for 'if-else' statement.
        //Checks if current player === X, if it is true, then currentPlayer will be assigned O.
        //If current player === X is false, then currentPlayer will be assigned X.
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        //Change the turn display between X and O.
        $("#turn").text(`${currentPlayer}'s Turn`);
    }

    //Event listener for the "Restart Game" button click
    $("#restartBtn").click(function () {

        //Restart the game upon clicking the retart button.
        restartGame(); 
    });

    //Function to restart the game when retart button is clicked.
    function restartGame() {

        //This will clear all the cells on the grid or board.
        $(".cell").text("");

        //Game will start over and be active.
        gameActive = true; 

        //Then an alert will trigger.
        $("#resultAlert")
        
        //The "d-none" class is added to hide the element or message.
        .addClass("d-none");
        
        //X will start again from the beginning.
        currentPlayer = "X"; 

        //Change the turn display back to X.
        $("#turn").text("X's Turn");
    }
})

//jQuery function to close out the alert on click with a fast fade out.
$(document).ready(function() {
    $(".alert .close").on("click", function(e) {
    $(this).parent().fadeOut("fast");
    });
});