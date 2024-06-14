import Phaser from 'phaser';

class vec2 {
  x : number = 0;
  y : number = 0;
  public constructor(x: number, y : number) { 
    this.x = x; 
    this.y = y; }
}

const screenSize : vec2 = new vec2(800, 450);
const buttonDistance : number = 120;
const optionsHeight : number = 775 / 2.0;
const optionSize : vec2 = new vec2(80,80);
const optionOutlineSize : vec2 = new vec2(100,100);

const userChoiceSize : vec2 = new vec2(150, 150);
const userChoicePosition : vec2 = new vec2(screenSize.x / 2.0 - 20, 545 / 2.0);

const computerChoiceSize : vec2 = new vec2(150, 150);
const computerChoicePosition : vec2 = new vec2(screenSize.x / 2.0 - 20, 80);

class Option {
  sprite : Phaser.GameObjects.Image;
  outlineSprite : Phaser.GameObjects.Image;
  userChoice : Phaser.GameObjects.Image;
  computerChoice : Phaser.GameObjects.Image;

  public constructor(spriteName : string, outlineName : string, x : number, y : number, scene : Demo, onClick : Function) {
    this.sprite = scene.add.image(x, y, spriteName);
    this.sprite.setDisplaySize(optionSize.x, optionSize.y);
    this.sprite.setName(spriteName);

    this.outlineSprite = scene.add.image(x, y, outlineName);
    this.outlineSprite.setDisplaySize(optionOutlineSize.x, optionOutlineSize.y);
    this.outlineSprite.visible = false;

    this.userChoice = scene.add.image(userChoicePosition.x, userChoicePosition.y, spriteName);
    this.userChoice.setDisplaySize(userChoiceSize.x, userChoiceSize.y);
    this.showUserOption(false);

    this.computerChoice = scene.add.image(computerChoicePosition.x, computerChoicePosition.y, spriteName);
    this.computerChoice.setDisplaySize(computerChoiceSize.x, computerChoiceSize.y);
    this.computerChoice.visible = false;

    this.sprite.setInteractive();
    this.sprite.on('pointerover', () => {
      this.outlineSprite.visible = true;
    });
    this.sprite.addListener('pointerout', () => {
      this.outlineSprite.visible = false;
    });
    this.sprite.addListener('pointerdown', () => {
      onClick(this, spriteName);
    });
  }
  showUserOption(enable : boolean) : void {
    this.userChoice.visible = enable;
  }
  showComputerOption(enable : boolean) : void {
    this.computerChoice.visible = enable;
  }
  getOptionName() : string {
    return this.sprite.name;
  }
}

// let WebFontConfig = {
//   google: { families: ["Fresca","Flamenco","Indie Flower"] }
//   };
//   (function() {
//   var wf = document.createElement('script');
//   wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
//   '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
//   wf.type = 'text/javascript';
//   wf.async = true;
//   var s = document.getElementsByTagName('script')[0];
//   if (s.parentNode) { s.parentNode.insertBefore(wf, s); }
// })();

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('bg', 'assets/BG.png');
    this.load.image('outline', 'assets/outline.png');
    this.load.image('paper', 'assets/paper.png');
    this.load.image('rock', 'assets/Rock.png');
    this.load.image('scissors', 'assets/scissors.png');
  }

  create() {
    let center : vec2 = new vec2(screenSize.x/2.0, screenSize.y/2.0);
    const bg = this.add.image(center.x, center.y, 'bg');
    bg.setDisplaySize(screenSize.x, screenSize.y);

    let rock : Option = new Option('rock', 'outline', center.x - buttonDistance, optionsHeight, this, selectOption);
    let paper : Option = new Option('paper', 'outline', center.x, optionsHeight, this, selectOption);
    let scissors : Option = new Option('scissors', 'outline', center.x + buttonDistance, optionsHeight, this, selectOption);
    let options = [rock, paper, scissors];

    let winnerText = this.add.text(center.x - 20, 172, "", {
      fontFamily: "Fredericka the Great",
      fontSize : '45px',
      color : '#ffffff'
    });

    function selectOption(button : Option, choiceName : string) {
      //show option the user selected in box
      options.forEach(b => {
        b.showUserOption(false);
        b.showComputerOption(false);
      });
      button.showUserOption(true);
      //start countdown
      //computer chooses randomly
      let r : number = Math.floor(Math.random() * options.length);
      options[r].showComputerOption(true);
      let computerChoice : string = options[r].getOptionName();
      //score is evaluated
      let userChoice : string = button.getOptionName();
      winnerText.text = evaluateGame(userChoice, computerChoice);;
      winnerText.setOrigin(0.5);

      function evaluateGame(userChoice : string, computerChoice : string) : string {
        if (userChoice === computerChoice) return "It's a Tie.";
        if ( 
          (userChoice === 'rock' && computerChoice === "scissors") ||
          (userChoice === 'scissors' && computerChoice === "paper") ||
          (userChoice === 'paper' && computerChoice === "rock")
        ) { return "You Win!"; }
        return "Computer Wins";
      }
    }

  }

}
