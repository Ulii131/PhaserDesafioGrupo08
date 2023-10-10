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

    }

    create() {

        
    }
}
export default Bootloader;