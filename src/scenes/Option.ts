import Phaser from 'phaser';
import Demo from "./Game"

export class vec2 {
x : number = 0;
y : number = 0;
public constructor(x: number, y : number) { 
    this.x = x; 
    this.y = y; }
}
const screenSize : vec2 = new vec2(800, 450);
const optionSize : vec2 = new vec2(80,80);
const optionOutlineSize : vec2 = new vec2(100,100);

const userChoiceSize : vec2 = new vec2(150, 150);
const userChoicePosition : vec2 = new vec2(screenSize.x / 2.0 - 20, 545 / 2.0);

const computerChoiceSize : vec2 = new vec2(150, 150);
const computerChoicePosition : vec2 = new vec2(screenSize.x / 2.0 - 20, 80);
const outlineName = 'outline';

export class Option {
    sprite : Phaser.GameObjects.Image;
    outlineSprite : Phaser.GameObjects.Image;
    userChoice : Phaser.GameObjects.Image;
    computerChoice : Phaser.GameObjects.Image;
  
    public constructor(spriteName : string, x : number, y : number, scene : Demo, onClick : Function) {
        //add clickable item
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
  