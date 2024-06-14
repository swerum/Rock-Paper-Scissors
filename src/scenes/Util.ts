import {Option} from "./Option";

export function setGameCompleteScreen(computerChoice : Option, userChoice : Option, winnerText : Phaser.GameObjects.Text) {
    computerChoice.showComputerOption(true);
    userChoice.showUserOption(true);
    winnerText.text = getWinnerAnnouncementString(userChoice.getOptionName(), computerChoice.getOptionName());;
    winnerText.setOrigin(0.5);
}

export function clearScreen(options : Option[], winnerText : Phaser.GameObjects.Text) : void {
    winnerText.text = "";
    options.forEach(b => {
        b.showUserOption(false);
        b.showComputerOption(false);
    });
}

function getWinnerAnnouncementString(userChoice : string, computerChoice : string) : string {
    if (userChoice === computerChoice) return "It's a Tie.";
    if ( 
        (userChoice === 'rock' && computerChoice === "scissors") ||
        (userChoice === 'scissors' && computerChoice === "paper") ||
        (userChoice === 'paper' && computerChoice === "rock")
    ) { return "You Win!"; }
    return "Computer Wins";
}