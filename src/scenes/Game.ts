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

const selectedChoiceSize : vec2 = new vec2(160, 160);
const selectedChoicePosition : vec2 = new vec2(screenSize.x / 2.0 - 20, 545 / 2.0);

class OptionButton {
  sprite : Phaser.GameObjects.Image;
  outlineSprite : Phaser.GameObjects.Image;
  selectedOptionSprite : Phaser.GameObjects.Image;

  public constructor(spriteName : string, outlineName : string, x : number, y : number, scene : Demo, ) {
    this.sprite = scene.add.image(x, y, spriteName);
    this.sprite.setDisplaySize(optionSize.x, optionSize.y);

    this.outlineSprite = scene.add.image(x, y, outlineName);
    this.outlineSprite.setDisplaySize(optionOutlineSize.x, optionOutlineSize.y);
    this.outlineSprite.visible = false;

    this.selectedOptionSprite = scene.add.image(selectedChoicePosition.x, selectedChoicePosition.y, spriteName);
    this.selectedOptionSprite.setDisplaySize(selectedChoiceSize.x, selectedChoiceSize.y);
    this.selectedOptionSprite.visible = false;

    // this.sprite.addListener('pointerover', () => {
    //   console.log("pointer over "+spriteName);
    //   this.outlineSprite.visible = true;
    // });
    // this.sprite.addListener('pointerout', () => {
    //   this.outlineSprite.visible = false;
    // });
    // this.sprite.addListener('click', () => {
    //   console.log("click on "+spriteName);
    //   this.selectedOptionSprite.visible = true;
    // });
  }
}

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

    let rock : OptionButton = new OptionButton('rock', 'outline', center.x - buttonDistance, optionsHeight, this);
    let paper : OptionButton = new OptionButton('paper', 'outline', center.x, optionsHeight, this);
    let scissors : OptionButton = new OptionButton('scissors', 'outline', center.x + buttonDistance, optionsHeight, this);
  }


}
