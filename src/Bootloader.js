class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        
        this.load.image('BG', '../public/img/sky.png');
        this.load.spritesheet('nave', '../public/img/nave.png', {
            frameWidth:70,
            frameHeight:62});
        this.load.image('enemigo','../public/img/enemy.png');
        this.load.on("complete", () =>{
            this.scene.start("Scene_play");
        });
         this.load.image('particula','../public/img/red.png');
    }

    create() {
        
    }
}
export default Bootloader;