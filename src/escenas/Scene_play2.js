class Scene_play2 extends Phaser.Scene{

constructor() {
    super("Scene_play2"); 
}
preload(){

}
create(){
 this.add.image(400,300,'lvl2');
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

 // Grupo para las naves enemigas
 this.enemiesGroup = this.physics.add.group();

 // Genera naves enemigas cada cierto tiempo
 this.enemyTimer = this.time.addEvent({
  delay: 2000, // Cambia esto para ajustar la frecuencia de generación
  callback: () => {
      const enemy = this.physics.add.image(this.game.config.width, Phaser.Math.Between(50, this.game.config.height - 50), 'enemigo');
      this.enemiesGroup.add(enemy);
      enemy.setOrigin(1, 0.5);
      enemy.speed = Phaser.Math.Between(100, 200); // Velocidad aleatoria para las naves
      enemy.setVelocityX(-enemy.speed); // Establece la velocidad horizontal
  },
  callbackScope: this,
  loop: true
  
});


//Variable para determinar el tiempo entre disparos
this.nextDisparoTime = 0;





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

  //DISPARO DE LA NAVE

  this.disparar();
 

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

disparar(){
  // Verifica si la tecla de espacio está presionada y si ha pasado suficiente tiempo desde el último disparo
  if (this.cursors.space.isDown && (this.time.now > this.nextDisparoTime)) {
    // Crea el disparo y establece su velocidad
    this.disparo = this.physics.add.image(this.player.x, this.player.y, 'disparo');
    this.disparo.setVelocityX(500);

    // Establece el tiempo en el que el siguiente disparo podrá realizarse
    this.nextDisparoTime = this.time.now + 150; // 1000 milisegundos (1 segundo) de cooldown
  }
}


}  
export default Scene_play2;