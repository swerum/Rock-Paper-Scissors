import Phaser from 'phaser';
import {Option, vec2} from "./Option"
import { clearScreen, setGameCompleteScreen } from './Util';

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

    let selectOption : Function = (userChoice : Option) => {
      clearScreen(this.options, this.winnerText);
      this.time.removeAllEvents();
      //start countdown
      let countdown : number = 3;
      let countdownFunction : Function = () => {
        if (countdown > 0) {
          //set countdown text
          this.countdownTexts.forEach(t => {
            t.text = ""+countdown;
          });
        } else {
          this.countdownTexts.forEach(t => {
            t.text = "";
          });
          //computer chooses randomly
          let r : number = Math.floor(Math.random() * this.options.length);
          let computerChoice : Option = this.options[r];
          //score is evaluated
          setGameCompleteScreen(computerChoice, userChoice, this.winnerText);
          this.time.removeAllEvents();
        }
        countdown--;
      }


      this.time.addEvent({ delay: 500, callback: countdownFunction, callbackScope: this, loop: true });
      countdownFunction();
    }

    let rock : Option =     new Option('rock',      center.x - buttonDistance,  optionsHeight, this, selectOption);
    let paper : Option =    new Option('paper',     center.x,                   optionsHeight, this, selectOption);
    let scissors : Option = new Option('scissors',  center.x + buttonDistance,  optionsHeight, this, selectOption);
    this.options = [ rock, paper, scissors];
    console.log(this.options);

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


}
