import Phaser from 'phaser';
import {Option, vec2} from "./Option"
import { clearScreen, setGameCompleteScreen, setTexts } from './Util';

const screenSize : vec2 = new vec2(800, 450);
const buttonDistance : number = 120;
const optionsHeight : number = 775 / 2.0;


export default class Demo extends Phaser.Scene {
  options : Option[] = [];
  winnerText : Phaser.GameObjects.Text;
  countdownTexts : Phaser.GameObjects.Text[] = [];
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

    let selectOptionCallback : Function = (userChoice : Option) => { this.selectOption(userChoice); }
    let rock : Option =     new Option('rock',      center.x - buttonDistance,  optionsHeight, this, selectOptionCallback);
    let paper : Option =    new Option('paper',     center.x,                   optionsHeight, this, selectOptionCallback);
    let scissors : Option = new Option('scissors',  center.x + buttonDistance,  optionsHeight, this, selectOptionCallback);
    this.options = [ rock, paper, scissors];

    //set up text
    this.winnerText = this.add.text(center.x - 20, 172, "", {
      fontFamily: "Fredericka the Great",
      fontSize : '45px',
      color : '#ffffff'
    });
    this.countdownTexts.push(this.add.text(center.x - 20, 80, "3", {
      fontFamily: "Fredericka the Great",
      fontSize : '72px',
      color : '#ffffff'
    }));
    this.countdownTexts.push(this.add.text(center.x - 20, 270, "3", {
      fontFamily: "Fredericka the Great",
      fontSize : '72px',
      color : '#ffffff'
    }));
    this.countdownTexts.forEach(t => {
      t.text = "";
      t.setOrigin(0.5,0.5);
    });
  }

  selectOption(userChoice : Option) {
    let countdown : number = 3;
    //callback function for whenever the countdown counts down
    //it updates the numbers on the screen and when it reaches zero, it shows the Game Complete Screen
    let countdownFunction : Function = () => {
      if (countdown > 0) {
        //set countdown text
        setTexts(this.countdownTexts, ""+countdown);
      } else {
        setTexts(this.countdownTexts, "");

        let r : number = Math.floor(Math.random() * this.options.length);
        let computerChoice : Option = this.options[r];
        //score is evaluated
        setGameCompleteScreen(computerChoice, userChoice, this.winnerText);
        this.time.removeAllEvents();
      }
      countdown--;
    }

    clearScreen(this.options, this.winnerText);
    this.time.removeAllEvents();
    this.time.addEvent({ delay: 500, callback: countdownFunction, callbackScope: this, loop: true });
    countdownFunction();
  }


}
