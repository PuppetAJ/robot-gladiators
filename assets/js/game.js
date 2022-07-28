var randomNumber = function(min, max) {
    // the +1 is due to the fact that it'll never reach 1 whole number under max - min
    // so 60 - 40 would be 20 but since math.random can only go to 0.99 it'd end up being
    // a range of 19 instead of 20

    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var getPlayerName = function() {
    var name = "";

    while (name === "" | name === null) {
        name = prompt("what is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }, 
    upgradeAttack: function() {
        if (this.money >= 7) {
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },

    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },

    {
        name: "Robo Tumble",
        attack: randomNumber(10, 14)
    }
];

var fightOrSkip = function() {

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    // if player choses to fight, then fight

    promptFight = promptFight.toLowerCase();

    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    if (promptFight === "skip") {
        // confirm skip 
        var confirmSkip = window.confirm("Are you sure you'd like to quit?"); 

        if (confirmSkip) {
            window.alert(playerInfo.name + " has chosen to skip the fight. Goodbye!");
            playerInfo.money =  Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money);
            return true;
        }

        
    }

    return false;
    
}

var fight = function(enemy) {

    var isPlayerTurn = true;

    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while(playerInfo.health > 0 && enemy.health > 0) {

        if (isPlayerTurn) {

            if (fightOrSkip()) {
                break;
           }

            // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );
        
            // check enemy's health
            if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            playerInfo.money = playerInfo.money + 20; 

            break;
            } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

        } else {

             // remove player's health by subtracting the amount set in the enemy.attack variable
             var damage = randomNumber(enemy.attack - 3, enemy.attack);

             playerInfo.health = Math.max(0, playerInfo.health - damage);
             console.log(
             enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
             );
         
             // check player's health
             if (playerInfo.health <= 0) {
             window.alert(playerInfo.name + " has died!");
             break;
             } else {
             window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
             }

            }  
        
        isPlayerTurn = !isPlayerTurn; 
        // switches turn order
           
    }
}; 

    // function to start a new game 

var startGame = function() {

    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {

        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
    
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);
            
            // if we're not at the last enemy in the array + we're alive
            if (playerInfo.health > 0 && i < enemyInfo.length - 1 ) {

                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if (storeConfirm) {
                        shop(); 
                }

            }
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

    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else { 
        window.alert("You've lost your robot in battle.");
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

var shop = function() {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE to make a choice."
    )

    shopOptionPrompt = parseInt(shopOptionPrompt);

    switch (shopOptionPrompt) { // since there is no code here it falls through to the code below without a "break;"
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // calls shop again to force player to pick a valid option.
            shop();
            break;
    }
};

startGame();
