// BOXING SIMULATOR
var prompt = require('prompt-sync')();
var regexName = /^[a-zA-Z]+$/;
var regexNickname = /^[a-zA-Z\- ]+$/;
var runGame = true;
var userChoice = "";
var isFight;
var isTrain;
var nameSelection = true;
var firstName = '';
var lastName = '';
var nickname = '';
var Boxer = /** @class */ (function () {
    function Boxer(firstName, lastName, nickname, rankTitle, rankNumber, maxHp, currentHp, strength, tenacity) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.rankTitle = rankTitle;
        this.rankNumber = rankNumber;
        this.maxHp = maxHp;
        this.currentHp = currentHp;
        this.strength = strength;
        this.tenacity = tenacity;
        this.fullName = firstName + " " + "'" + nickname + "' " + lastName;
    }
    return Boxer;
}());
var Rank = /** @class */ (function () {
    function Rank(rankNumber) {
        this.rankNumber = rankNumber;
        switch (rankNumber) {
            case 0:
                this.rankTitle = "Rookie";
                break;
            case 1:
                this.rankTitle = "Greenhorn";
                break;
            case 2:
                this.rankTitle = "Contender";
                break;
            case 3:
                this.rankTitle = "Veteran";
                break;
            case 4:
                this.rankTitle = "Finalist";
                break;
            case 5:
                this.rankTitle = "Champion";
        }
    }
    return Rank;
}());
function randomInt(min, max) {
    var roundUp = Math.ceil(min);
    var roundDown = Math.floor(max);
    return Math.floor(Math.random() * (roundDown - roundUp + 1) + roundUp);
}
// User's Boxer Object
// interface Player {
//     fullName: string;
//     firstName: string;
//     lastName: string;
//     nickname: string;
//     rankTitle: string;
//     rankNumber: number;
// }
// Opponent Boxer Objects
var boxerOpponents = [
    { firstName: 'Bonnie', lastName: 'Boomer', nickname: 'Lefty', rankTitle: 'Rookie', rankNumber: 0, maxHp: 8, currentHp: 8, strength: 1, tenacity: 1 },
    { firstName: 'Rob', lastName: 'Schwartz', nickname: 'Right', rankTitle: 'Greenhorn', rankNumber: 1, maxHp: 15, currentHp: 15, strength: 2, tenacity: 2 },
    { firstName: 'Matt', lastName: 'Huntington', nickname: 'Instructor', rankTitle: 'Contender', rankNumber: 2, maxHp: 20, currentHp: 20, strength: 2, tenacity: 4 },
    { firstName: 'Hippo', lastName: 'Mackentoshi', nickname: 'The Battling', rankTitle: 'Veteran', rankNumber: 3, maxHp: 35, currentHp: 35, strength: 5, tenacity: 3 },
    { firstName: 'Mickey', lastName: 'Tie-sin', nickname: 'Child TNT', rankTitle: 'Finalist', rankNumber: 4, maxHp: 40, currentHp: 40, strength: 7, tenacity: 4 },
    { firstName: 'Small', lastName: 'Mic', nickname: 'Punch-Out', rankTitle: 'Champion', rankNumber: 5, maxHp: 50, currentHp: 50, strength: 6, tenacity: 5 },
];
console.log('Welcome to the boxing simulator.  Your objective is to train to beat the Champion !');
console.log('Let us know who you are!');
while (nameSelection === true) {
    while (firstName === '') {
        firstName = prompt("First Name: ");
        if (regexName.test(firstName)) {
            console.log("First Name: ".concat(firstName));
        }
        else {
            console.log("Invalid entry, only alphabetical letters allowed");
            firstName = '';
        }
    }
    while (lastName === '') {
        lastName = prompt("Last Name: ");
        if (regexName.test(lastName)) {
            console.log("Last Name: ".concat(lastName));
        }
        else {
            console.log("Invalid entry, only alphabetical letters allowed");
            lastName = '';
        }
    }
    while (nickname === '') {
        nickname = prompt("Nickname: ");
        if (regexNickname.test(nickname)) {
            console.log("Nickname: '".concat(nickname, "'"));
        }
        else {
            console.log("Invalid entry, only alphabetical letters spaces, and hyphens allowed");
            nickname = '';
        }
    }
    nameSelection = false;
}
var gymDays = 1;
var playerRank = new Rank(0);
// let playerBoxer = new Boxer(firstName, lastName, nickname, playerRank.rankTitle, playerRank.rankNumber, 5, 5, 1, 0) // Normal start game stats
var playerBoxer = new Boxer(firstName, lastName, nickname, playerRank.rankTitle, playerRank.rankNumber, 99, 99, 99, 99); // testing stats
console.log("Welcome ".concat(playerBoxer.fullName));
while (runGame === true) {
    if (playerBoxer.currentHp < playerBoxer.maxHp) {
        playerBoxer.currentHp = playerBoxer.maxHp;
    }
    console.log("Day ".concat(gymDays, ":"));
    console.log("What will you do? [train] [fight] [profile] [quit]:");
    userChoice = prompt().toLowerCase();
    if (userChoice === 'train') {
        var trainingChoice = void 0;
        isTrain = true;
        while (isTrain === true) {
            console.log("Your Stats:\nVitality: ".concat(playerBoxer.maxHp, "\nStrength: ").concat(playerBoxer.strength, "\nTenacity: ").concat(playerBoxer.tenacity, "\n"));
            console.log('How do you want to train?');
            console.log('[v]itality - run to build up your endurance');
            console.log('[s]trength - hit the weights to punch harder');
            console.log('[t]enacity - spar to practice taking a beating');
            console.log('[r]eturn - back to previous menu');
            trainingChoice = prompt().toLowerCase();
            if (trainingChoice === 'v') {
                console.log("Let's get running!");
                if (playerBoxer.maxHp <= ((playerBoxer.rankNumber * 5) + 10)) {
                    var vitTrain = randomInt(1, 5);
                    playerBoxer.maxHp += vitTrain;
                    console.log("Great run, your [vitality] is now ".concat(playerBoxer.maxHp, " (gained ").concat(vitTrain, ")"));
                    gymDays += 1;
                    isTrain = false;
                }
                else {
                    console.log("You had a good run, but you feel like you've reached your current potential. (rank up to increase!)");
                    gymDays += 1;
                    isTrain = false;
                }
            }
            else if (trainingChoice === 's') {
                console.log("Let's hit those weights!");
                if (playerBoxer.strength <= ((playerBoxer.rankNumber) + 3)) {
                    var strTrain = randomInt(0, 2);
                    if (strTrain === 0) {
                        console.log("Rough day on the weights, have to train more");
                        gymDays += 1;
                        isTrain = false;
                    }
                    else {
                        playerBoxer.strength += strTrain;
                        if (strTrain === 1) {
                            console.log("Put in some good work today, your [strength] is now ".concat(playerBoxer.strength, " (gained ").concat(strTrain, ")."));
                            gymDays += 1;
                            isTrain = false;
                        }
                        else {
                            console.log("Really in the groove, your hard work is paying off.");
                            console.log("Your [strength] is now ".concat(playerBoxer.strength, " (gained ").concat(strTrain, ")."));
                            gymDays += 1;
                            isTrain = false;
                        }
                    }
                }
                else {
                    console.log("Weight room was fine, but you feel like you've reached your current potential. (rank up to increase!)");
                    gymDays += 1;
                    isTrain = false;
                }
            }
            else if (trainingChoice === 't') {
                console.log("Time to spar!");
                if (playerBoxer.tenacity <= ((playerBoxer.rankNumber) + 3)) {
                    var tenTrain = randomInt(0, 2);
                    if (tenTrain === 0) {
                        console.log("Sparring practice was a dud, gotta work on that technique.");
                        gymDays += 1;
                        isTrain = false;
                    }
                    else {
                        playerBoxer.tenacity += tenTrain;
                        if (tenTrain === 1) {
                            console.log("Nice moves, your [tenacity] is now ".concat(playerBoxer.tenacity, " (gained ").concat(tenTrain, ")."));
                            gymDays += 1;
                            isTrain = false;
                        }
                        else {
                            console.log("You made a breakthrough in your technique.");
                            console.log("Your [tenacity] is now ".concat(playerBoxer.tenacity, " (gained ").concat(tenTrain, ")."));
                            gymDays += 1;
                            isTrain = false;
                        }
                    }
                }
                else {
                    console.log("Sparring match was refreshing, but you feel like you've reached your current potential. (rank up to increase!)");
                    gymDays += 1;
                    isTrain = false;
                }
            }
            else if (trainingChoice === 'r') {
                isTrain = false;
            }
            else {
                console.log('Invalid command, please type in correct prompts');
            }
        }
    }
    else if (userChoice === 'fight') { // Match Prompt
        isFight = true;
        var opponentBoxer = void 0;
        console.log("Enter fight at: ".concat(playerBoxer.rankTitle, " rank!"));
        for (var _i = 0, boxerOpponents_1 = boxerOpponents; _i < boxerOpponents_1.length; _i++) {
            var opponent = boxerOpponents_1[_i];
            if (opponent.rankNumber === playerBoxer.rankNumber) {
                opponentBoxer = opponent;
            }
            else {
            }
        }
        console.log("Your opponent is: ".concat(opponentBoxer.firstName, " '").concat(opponentBoxer.nickname, "' ").concat(opponentBoxer.lastName));
        opponentBoxer.currentHp = opponentBoxer.maxHp;
        console.log(opponentBoxer.currentHp);
        while (isFight && (opponentBoxer.currentHp > 0 || playerBoxer.currentHp > 0)) {
            var jab = void 0;
            var hook = void 0;
            var uppercut = void 0;
            var hitChance = void 0;
            var fightOpt = void 0;
            var defense = void 0;
            defense = '';
            fightOpt = '';
            while (fightOpt !== 'j' && fightOpt !== 'h' && fightOpt !== 'u') { // Fight Options routes
                console.log('Choose to [j]ab, [h]ook, or [u]ppercut: ');
                fightOpt = prompt().toLowerCase();
                if (fightOpt === 'j') {
                    jab = Math.floor(playerBoxer.strength / 2);
                    opponentBoxer.currentHp -= jab;
                    console.log("You quickly jab ".concat(opponentBoxer.firstName, " and hit them for ").concat(jab, "."));
                }
                else if (fightOpt === 'h') { // Hook
                    hook = (randomInt(1, playerBoxer.strength + 1) - randomInt(0, opponentBoxer.tenacity));
                    hitChance = randomInt(1, 10);
                    if (hitChance === 1) {
                        console.log('You take a swing at the opponent and miss');
                    }
                    else if (hitChance >= 2 && hitChance <= 9) {
                        opponentBoxer.currentHp -= hook;
                        console.log("You land a good hook on ".concat(opponentBoxer.firstName, " for ").concat(hook, "."));
                    }
                    else if (hitChance === 10) {
                        hook = hook * 2;
                        opponentBoxer.currentHp -= hook;
                        console.log("You anticipate where ".concat(opponentBoxer.firstName, " dodges! You nail ").concat(opponentBoxer.firstName, " for ").concat(hook, "."));
                    }
                    else {
                        console.log('You take a swing at the opponent and miss');
                    }
                }
                else if (fightOpt === 'u') { // Uppercut
                    uppercut = (randomInt(1, playerBoxer.strength + 3) - randomInt(0, opponentBoxer.tenacity));
                    hitChance = randomInt(1, 10);
                    if (hitChance >= 1 && hitChance <= 3) {
                        console.log("You go for an uppercut, but ".concat(opponentBoxer.firstName, " dodges and you miss."));
                    }
                    else if (hitChance >= 4 && hitChance <= 7) {
                        opponentBoxer.currentHp -= uppercut;
                        console.log("You land your uppercut on ".concat(opponentBoxer.firstName, " for ").concat(uppercut, "."));
                    }
                    else if (hitChance >= 8 && hitChance <= 10) {
                        uppercut = uppercut * 2;
                        opponentBoxer.currentHp -= uppercut;
                        console.log("Solid connection! ".concat(opponentBoxer.firstName, " reels from the blow. You nail ").concat(opponentBoxer.firstName, " for ").concat(uppercut, "."));
                    }
                    else {
                    }
                }
                else {
                }
            }
            if (opponentBoxer.currentHp <= 0) { // Victory Route
                console.log("".concat(opponentBoxer.firstName, " reels from your last blow and falls over, knocked out!"));
                console.log("Congratulations, you won the ".concat(opponentBoxer.rankTitle, " match against ").concat(opponentBoxer.firstName, " '").concat(opponentBoxer.nickname, "' ").concat(opponentBoxer.lastName, "!"));
                playerRank = new Rank(playerBoxer.rankNumber += 1);
                playerBoxer.rankNumber = playerRank.rankNumber;
                playerBoxer.rankTitle = playerRank.rankTitle;
                if (playerBoxer.rankNumber === 6) {
                    console.log("You've beaten the ".concat(opponentBoxer.rankTitle, " and you are the new ").concat(playerBoxer.rankTitle, "!  You win!"));
                    console.log("Thanks for playing, hope you enjoyed becoming the world champion!");
                    isFight = false;
                    runGame = false;
                    break;
                }
                else {
                    console.log("You've beaten the ".concat(opponentBoxer.rankTitle, " and your new rank is ").concat(playerBoxer.rankTitle, "!"));
                    for (var _a = 0, boxerOpponents_2 = boxerOpponents; _a < boxerOpponents_2.length; _a++) {
                        var opponent = boxerOpponents_2[_a];
                        if (opponent.rankNumber === playerBoxer.rankNumber) {
                            opponentBoxer = opponent;
                        }
                        else {
                        }
                    }
                    opponentBoxer.currentHp = 0;
                    console.log("Your next opponent will be: ".concat(opponentBoxer.firstName, " '").concat(opponentBoxer.nickname, "' ").concat(opponentBoxer.lastName, "."));
                    isFight = false;
                }
            }
            // else { // Enemy Retaliate, Defense & player survival routes
            //     let defense: string;
            //     console.log(`${opponentBoxer.firstName} is still standing and comes in for the attack!`)
            //     console.log(`Choose to: [d]odge or [b]lock`)
            //     defense = prompt()
            // }
        }
    }
    else if (userChoice === 'profile') {
        console.log("You are: ".concat(playerBoxer.firstName, " ").concat(playerBoxer.lastName));
        console.log("Your Nickname: '".concat(playerBoxer.nickname, "'"));
        console.log("Your Rank: ".concat(playerBoxer.rankTitle));
        console.log("Vitality: ".concat(playerBoxer.maxHp));
        console.log("Strength: ".concat(playerBoxer.strength));
        console.log("Tenacity: ".concat(playerBoxer.tenacity));
    }
    else if (userChoice === 'quit') {
        console.log('Thanks for playing, see you soon champ!');
        runGame = false;
    }
    else {
        console.log('Invalid command, please type in correct prompts');
    }
}
