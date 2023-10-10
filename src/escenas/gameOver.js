
class gameOver extends Phaser.Scene{


    constructor(){
        super("gameOver");
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
    this.add.image(400,300, "gameOver");
    this.startButton = this.physics.add.sprite(400,420, "restart").setInteractive();
    

    this.startButton.on('pointerdown',() => {
        this.scene.start("menu");
    });

    }
}
    export default gameOver;