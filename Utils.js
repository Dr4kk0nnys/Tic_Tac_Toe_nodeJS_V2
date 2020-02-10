const prompt = require("prompt-sync")({sigint: true});
/*
    - Handy little method
    - Installed used "npm install prompt-sync"

    ({sigint: true}), this parameter allows the user to leave the program whenever it wants
    - Without this parameter, the program doesn't allow you to leave the terminal pressing "CTRL ^ C"
*/


const game = {
    field: new Array(9),
    players: ["X", "O"],
    play: 0
};


exports.InitializeField = () => { game.field.fill(" "); } // Populates the entire array 

exports.GetUserInput = () => {
    if (game.field.length == 9) { // If the array is initialized

        let choiceValue = prompt("[ 1 ~ 9 ]: ")
        // Asking for the user input

        choiceValue = Number(choiceValue) - 1
        /*
            - If the user types 1, the input would place the player value on the second index of the array [ 1 ]
            - However if you subtract 1, of this value, it'll allow the user to play with index 1
            - So, if the user types 5, it would be placing the value inside the fourth index of the array
            - Without the user noticing it
        */

        if (choiceValue >= 0 && choiceValue <= 8) {
            /*
                - No need to check whether choiceValue is a number or not
                - Because on the 18th line, choiceValue was casted to a number
                - So, no matter what the user typed ( An actual number or not )
                - Javascript will consider the value a number

                - Instead we check if the value is greater or equal 0, and less than or equal to 8
                - Only a real number would contain such quality,
                - Although Javascript shouldn't have made it this far, if the user typed "banana", for example
            */

            if (game.field[choiceValue] == " ") {
            // If the position is available

                let playPosition = (game.play % 2 == 0) ? 0 : 1

                game.field[choiceValue] = game.players[playPosition]
                
                /*
                    - If game.play is an even number, play position will be 0, if not, it'll be 1
                    - Then game.field, will insert the player at index [choiceValue]
                */


                game.play++
                /*
                    - This is a crucial part of the program
                    - With only this line, the program keeps switching between players automatically
                    
                    - However, if the player make any mistake, it won't be punished losing it's turn
                    - Since game.play only gets it's size increased, if everything goes right
                    - And the if statement gets this far
                */
            } else {
                console.log("Invalid Play!!")
            }
        }
    }
}

exports.ShowField = () => {
    /*
        - This is a pure aesthetic function

        - This function allows the entire field, to be consisted with a single line array
        - Most Tic Tac Toe games, would have a two dimensional array Array[3][3]
        - However, with this function, it's not neccessary

        - It not only gets the entire program to be easier, it also makes the printing a whole lot prettier
    */


    let line = "" // Initializing the "receiver" string

    let counter = 1 // This is just for simplicity, it makes it possible to use only one loop

    for (let i = 0; i < game.field.length; i++) {
        
        line += game.field[i] + " | "
        /*
            - This line constructs every single line of the field
            - Since the main purpouse of this whole function is to be as much aesthetic as possible
            - The " | " are added to make each row more visible
        */

        if (counter++ % 3 == 0) { // This line also allows the program to run, using only one loop,
        //                                                    if the counter is divisible by 3, it will execute the if statement
            
            console.log(line) // This line also works as a line breaker ("\n")

            line = "" // Reseting the line, since we append the data into it
        }
    }
}

exports.CheckGameState = () => {
    
    let position = 0
    let gameCounter = 0
    let player = game.players[(game.play % 2 == 0) ? 1 : 0]


    // HORIZONTAL LINES     [0, 1, 2     3, 4, 5     6, 7, 8]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            // - If the position has the player value inside of it, gameCounter will increase
            if (game.field[position++] == player) { gameCounter++ }
        }

        // If gameCounter is greater or equals 3, the player won the game
        if (CheckVictory(gameCounter, player)) {
            return true
        }

        gameCounter = 0 // Afther the first loop conclueded, gameCounter gets reseted
    }


    // VERTICAL LINES    [0, 3, 6     1, 4, 7     3, 5, 8]
    for (let i = 0; i < 3; i++) {

        position = i
        /*
            - The coeficient of the vertical lines is 3 (0, 3, 6), (1, 4, 7), (2, 5, 8)
            - If position gets it's value from i, it's maximum size in this loop will only be 2 ( 0, 1, 2 )
            - But, if we make position = i, and on the second loop, increase it's value by 3, the maximum size
            - Position can get, is 8

            - Exactly the value we want
        */

        for (let j = 0; j < 3; j++) {
            if (game.field[position] == player) { gameCounter++ } // Checking for the first occurence of eache line (0, 1, 2)
            position += 3 // Increasing the value by it's coeficient
        }

        if (CheckVictory(gameCounter, player)) {
            return true
        }

        gameCounter = 0
    }

    // CROSSED LINES    [0, 4, 8    2, 4, 6]
    if (game.field[0] == player && game.field[4] == player && game.field[8] == player) { // Crossed   0, 4, 8
        console.log(`Player ${player} won!!`)
        return true
    }
    
    if (game.field[2] == player && game.field[4] == player && game.field[6] == player) { // Crossed   2, 4, 6
        console.log(`Player ${player} won!!`)
        return true
    }

    // Checking if the field is full ( If no one won )
    for (let i = 0; i < game.field.length; i++) {
        if (game.field[i] == " ") { break }
        
        if (i == (game.field.length -1)) {
            console.log("No one won!!")
            return true
        }
    }
}

const CheckVictory = (gameCounter, player) => {

    if (gameCounter % 3 == 0 && gameCounter != 0) { // Don't forget 3 % 0 == 0
        console.log(`Player ${player} won!!`)
        return true
    }
}


// TODO: Check if the position is available before placing the value inside it