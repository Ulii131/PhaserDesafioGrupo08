class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        
        this.load.image('BG', '../public/img/sky.png');
        this.load.image('lvl2', '../public/img/lvl2.png');
        this.load.spritesheet('nave', '../public/img/nave.png', {
            frameWidth:70,
            frameHeight:62});
        this.load.image('enemigo','../public/img/enemy.png');
        this.load.on("complete", () =>{
        this.scene.start("menu");
        });
         this.load.image('particula','../public/img/red.png');
         this.load.image('disparo', '../public/img/shoot.png');
         this.load.image('enemigo','../public/img/enemy.png');
         this.load.image('boss', '../public/img/boss.png');
         this.load.spritesheet('bala', '../public/img/disparoBoss.png',{frameWidth:49,frameHeight:22});
         this.load.image('menuBg', '../public/img/MenuBG.png');
         this.load.spritesheet('menuPlay', '../public/img/playbt.png', {frameWidth:120,
         frameHeight:120});
         this.load.image('restart', '../public/img/restartbt.png');
         this.load.image('gameOver', '../public/img/GameOver.png');
         this.load.image('titulo', '../public/img/titulo.png');
         this.load.image('megaWin', '../public/img/megaWin.png');
         
    }

    create() {

        
    }
}
export default Bootloader;