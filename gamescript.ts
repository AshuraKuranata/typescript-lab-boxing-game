// BOXING SIMULATOR

const prompt = require('prompt-sync')();
const regexName = /^[a-zA-Z]+$/;
const regexNickname = /^[a-zA-Z\- ]+$/;
let runGame: boolean = true;
let userChoice: string = "";
let isFight: boolean;
let isTrain: boolean;
let nameSelection: boolean = true;
let firstName: string = '';
let lastName: string = '';
let nickname: string = '';

class Boxer {
    fullName: string;
    constructor(
        public firstName: string,
        public lastName: string,
        public nickname: string,
        public rankTitle: string,
        public rankNumber: number,
        public maxHp: number,
        public currentHp: number,
        public strength: number,
        public tenacity: number,
    ) {
        this.fullName = firstName + " " + "'" + nickname + "' " + lastName; 
    }
}

class Rank {
    rankTitle: string;
    constructor(
        public rankNumber: number,
    )
    {
        switch (rankNumber) {
            case 0:
                this.rankTitle = "Rookie"
                break;
            case 1:
                this.rankTitle = "Greenhorn"
                break;
            case 2:
                this.rankTitle = "Contender"
                break;
            case 3:
                this.rankTitle = "Veteran"
                break;
            case 4:
                this.rankTitle = "Finalist"
                break;
            case 5:
                this.rankTitle = "Champion"
        }

    }
}

function randomInt(min, max) {
    const roundUp = Math.ceil(min);
    const roundDown = Math.floor(max);
    return Math.floor(Math.random() * (roundDown - roundUp + 1) + roundUp)
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

const boxerOpponents = [
    { firstName: 'Bonnie', lastName: 'Boomer', nickname: 'Lefty', rankTitle: 'Rookie', rankNumber: 0, maxHp: 8, currentHp: 8, strength: 1, tenacity: 1 },
    { firstName: 'Rob', lastName: 'Schwartz', nickname: 'Right', rankTitle: 'Greenhorn', rankNumber: 1, maxHp: 15, currentHp: 15, strength: 2, tenacity: 2 },
    { firstName: 'Matt', lastName: 'Huntington', nickname: 'Instructor', rankTitle: 'Contender', rankNumber: 2, maxHp: 20, currentHp: 20, strength: 3, tenacity: 4 },
    { firstName: 'Mickey', lastName: 'Tie-sin', nickname: 'Child TNT', rankTitle: 'Veteran', rankNumber: 3, maxHp: 30, currentHp: 30, strength: 7, tenacity: 3 },
    { firstName: 'Small', lastName: 'Mic', nickname: 'Punch-Out', rankTitle: 'Champion', rankNumber: 4, maxHp: 40, currentHp: 40, strength: 6, tenacity: 5 },
]

console.log('Welcome to the boxing simulator.  Your objective is to train to beat the Champion !')
console.log('Let us know who you are!')

while (nameSelection === true) {
    while (firstName === '') {
        firstName = prompt("First Name: ")
        if (regexName.test(firstName)) {
            console.log(`First Name: ${firstName}`)
        } else {
            console.log("Invalid entry, only alphabetical letters allowed")
            firstName = ''
        }
    }
    
    while (lastName === '') {
        lastName = prompt("Last Name: ")
        if (regexName.test(lastName)) {
            console.log(`Last Name: ${lastName}`)
        } else {
            console.log("Invalid entry, only alphabetical letters allowed")
            lastName = ''
        }
    }
    
    while (nickname === '') {
        nickname = prompt("Nickname: ")
        if (regexNickname.test(nickname)) {
            console.log(`Nickname: '${nickname}'`)
        } else{
            console.log("Invalid entry, only alphabetical letters spaces, and hyphens allowed")
            nickname = ''
        }
    }
    nameSelection = false
}

let gymDays = 1
let playerRank = new Rank(0)
let playerBoxer = new Boxer(firstName, lastName, nickname, playerRank.rankTitle, playerRank.rankNumber, 5, 5, 1, 0)

console.log(`Welcome ${playerBoxer.fullName}`)

while (runGame === true) {
    if (playerBoxer.currentHp < playerBoxer.maxHp) {
        playerBoxer.currentHp = playerBoxer.maxHp
    }
    console.log(`Day ${gymDays}:`)
    console.log("What will you do? [train] [fight] [profile] [quit]:")
    userChoice = prompt()
    
    if (userChoice === 'train') {
        let trainingChoice
        isTrain = true
        while (isTrain === true) {
            console.log(`Your Stats:\nVitality: ${playerBoxer.maxHp}\nStrength: ${playerBoxer.strength}\nTenacity: ${playerBoxer.tenacity}\n`)
            console.log('How do you want to train?')
            console.log('[vitality] - run to build up your endurance')
            console.log('[strength] - hit the weights to punch harder')
            console.log('[tenacity] - spar to practice taking a beating')
            console.log('[return] - back to previous menu')
            trainingChoice = prompt()
            if (trainingChoice === 'vitality') {
                console.log("Let's get running!")
                if (playerBoxer.maxHp <= ((playerBoxer.rankNumber*5) + 10)) {
                    let vitTrain = randomInt(1, 5)
                    playerBoxer.maxHp += vitTrain
                    console.log(`Great run, your [vitality] is now ${playerBoxer.maxHp} (gained ${vitTrain})`)
                    gymDays += 1
                    isTrain = false
                } else {
                    console.log(`You had a good run, but you feel like you've reached your current potential. (rank up to increase!)`)
                    gymDays += 1
                    isTrain = false
                }
            }
            else if (trainingChoice === 'strength') {
                console.log("Let's hit those weights!")
                if (playerBoxer.strength <= ((playerBoxer.rankNumber) + 3)) {
                    let strTrain = randomInt(0, 2)
                    if (strTrain === 0) {
                        console.log("Rough day on the weights, have to train more")
                        gymDays += 1
                        isTrain = false
                    } else {
                        playerBoxer.strength += strTrain
                        if (strTrain === 1) {
                            console.log(`Put in some good work today, your [strength] is now ${playerBoxer.strength} (gained ${strTrain}).`)
                            gymDays += 1
                            isTrain = false
                        } else {
                            console.log(`Really in the groove, your hard work is paying off.`)
                            console.log(`Your [strength] is now ${playerBoxer.strength} (gained ${strTrain}).`)
                            gymDays += 1
                            isTrain = false
                        }
                    } 
                } else {
                    console.log(`Weight room was fine, but you feel like you've reached your current potential. (rank up to increase!)`)
                    gymDays += 1
                    isTrain = false
                }
            }
            else if (trainingChoice === 'tenacity') {
                console.log("Time to spar!")
                if (playerBoxer.tenacity <= ((playerBoxer.rankNumber) + 3)) {
                    let tenTrain = randomInt(0, 2)
                    if (tenTrain === 0) {
                        console.log("Sparring practice was a dud, gotta work on that technique.")
                        gymDays += 1
                        isTrain = false
                    } else{
                        playerBoxer.tenacity += tenTrain
                        if (tenTrain === 1) {
                            console.log(`Nice moves, your [tenacity] is now ${playerBoxer.tenacity} (gained ${tenTrain}).`)
                            gymDays += 1
                            isTrain = false
                        } else {
                            console.log(`You made a breakthrough in your technique.`)
                            console.log(`Your [tenacity] is now ${playerBoxer.tenacity} (gained ${tenTrain}).`)
                            gymDays += 1
                            isTrain = false
                        }
                    }
                } else{
                    console.log(`Sparring match was refreshing, but you feel like you've reached your current potential. (rank up to increase!)`)
                    gymDays += 1
                    isTrain = false
                }
            }
            else if (trainingChoice === 'return') {
                isTrain = false
            }
            else {
                console.log('Invalid command, please type in correct prompts')
            }
        }
    }
    else if (userChoice === 'fight') {
        
        isFight = true
        let opponentBoxer
        console.log(`Enter fight at: ${playerBoxer.rankTitle} rank!`)
        for (const opponent of boxerOpponents) {
            if (opponent.rankNumber === playerBoxer.rankNumber) {
                opponentBoxer = opponent;
            } else {
            }
        }
        console.log(`Your opponent is: ${opponentBoxer.firstName} '${opponentBoxer.nickname}' ${opponentBoxer.lastName}`)
        while (isFight && (opponentBoxer.currentHp > 0 || playerBoxer.currentHp > 0)) {
            userChoice = ''
            console.log('Fight [win] or [lose]: ')
            userChoice = prompt()
            if (userChoice === 'win') {
                console.log('WIN!')
                opponentBoxer.currentHp = 0
                playerRank = new Rank(playerRank.rankNumber += 1)
                playerBoxer.rankTitle = playerRank.rankTitle
                playerBoxer.rankNumber = playerRank.rankNumber
                console.log(`Your rank is now ${playerBoxer.rankTitle}`)
                isFight = false
                gymDays += 1
            } else if (userChoice === 'lose') {
                console.log('LOSE!')
                playerBoxer.currentHp = 0
                isFight = false
                gymDays += 1
            } else {
            }
        }
    }
    else if (userChoice === 'profile') {
        console.log(`You are: ${playerBoxer.firstName} ${playerBoxer.lastName}`)
        console.log(`Your Nickname: '${playerBoxer.nickname}'`)
        console.log(`Your Rank: ${playerBoxer.rankTitle}`)
        console.log(`Vitality: ${playerBoxer.maxHp}`)
        console.log(`Strength: ${playerBoxer.strength}`)
        console.log(`Tenacity: ${playerBoxer.strength}`)
    }
    else if (userChoice === 'quit') {
        console.log('Thanks for playing, see you soon champ!')
        runGame = false
    } else {
        console.log('Invalid command, please type in correct prompts')
    }
}