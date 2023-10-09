class Scene_play extends Phaser.Scene{
    constructor() {
      super("Scene_play"); 
  }
  preload(){
  
  }
  create(){
    this.add.image(400,300,'BG');
   this.player = this.physics.add.sprite(400,300,'nave');
   this.cursors = this.input.keyboard.createCursorKeys();
   this.particles = this.add.particles(-10,0,'particula',{
    speed:100,
    angle:{
        min:150,
        max:210
    },
    scale:{
        start:1,
        end:0
    },
    blendMode: 'ADD'
   
});





   this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
    frameRate: 0,
    repeat: -1
  });

   this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('nave', { start: 1, end: 1 }),
    frameRate: 0,
    repeat: -1
  });
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('nave', { start: 2, end: 2 }),
    frameRate: 0,
    repeat: -1
  });


  this.particles.startFollow(this.player);

  }

  update() 
  {
   

    if (this.cursors.left.isDown) 
    {
      this.player.setVelocityX(-200);
      //this.player.anims.play('left', true);
    } else if(this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      //this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-200);
      this.player.anims.play('down',true);
    }
    else if(this.cursors.down.isDown){
        this.player.setVelocityY(200);
        this.player.anims.play('up',true);

    }
    else{
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.anims.play('idle',true);
    }
  }
}  
  export default Scene_play;