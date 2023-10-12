
class menu extends Phaser.Scene{


    constructor(){
        super("menu");
    }


    preload(){

        this.load.image('menuBg', '../public/img/MenuBG.png');
        this.load.spritesheet('menuPlay', '../public/img/playbt.png', {frameWidth:120,
        frameHeight:120});
        this.load.image('restart', '../public/img/restartbt.png');
        this.load.image('gameOver', '../public/img/GameOver.png');
        this.load.image('titulo', '../public/img/titulo.png');
    }

    create(){
    this.add.image(400,300, "menuBg");
    this.startButton = this.physics.add.sprite(400,420, "menuPlay").setInteractive();
    this.add.image(400,200, "titulo");

    this.startButton.on('pointerdown',() => {
        this.scene.start("Scene_play");
    });

    }
}
export default menu;