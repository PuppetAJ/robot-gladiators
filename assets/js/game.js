var playerName = window.prompt("What is your robot's name?");

var playerHealth = 100;

var playerAttack = 10;

var playerMoney = 10;


var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];

var enemyHealth = 50;

var enemyAttack = 12;

// create function (expression)
var fight = function(enemyName) {

    while(playerHealth > 0 && enemyHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        // if player choses to fight, then fight
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm skip 
            var confirmSkip = window.confirm("Are you sure you'd like to quit?"); 
    
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight. Goodbye!");
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }
            // remove enemy's health by subtracting the amount set in the playerAttack variable
            enemyHealth = enemyHealth - playerAttack;
            console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );
        
            // check enemy's health
            if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            break;
            } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }
        
            // remove player's health by subtracting the amount set in the enemyAttack variable
            playerHealth = playerHealth - enemyAttack;
            console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );
        
            // check player's health
            if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
            } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
            }
     
    }
}; 

    // function to start a new game 

    var startGame = function() {

        playerHealth = 100;
        playerAttack = 10;
        playerMoney = 10;

        for(var i = 0; i < enemyNames.length; i++) {

            if (playerHealth > 0) {
                window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
        
                var pickedEnemyName = enemyNames[i];
                enemyHealth = 50;
                fight(pickedEnemyName);
            }
        
            else {
                window.alert("You have lost your robot in battle! Game Over!");
                break;
            }
            
        }

        // player either lives or dies after round, run endgame function
        endGame();
    };

    var endGame = function() {
        window.alert("The game has now ended. Let's see how you did!");

        if (playerHealth > 0) {
            window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
        }
        else { 
            window.alert("You've lost your robot iun battle.");
        }

        var playAgainConfirm = window.confirm("Would you like to play again?");

        if (playAgainConfirm) {
            // restart the game
            startGame();
        }

        else {
            window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        }
    };

    startGame();
