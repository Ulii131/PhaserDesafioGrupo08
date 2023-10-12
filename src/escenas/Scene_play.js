class Scene_play extends Phaser.Scene{
  constructor() {
    super("Scene_play"); 
    this.playerLife = 3;
    this.score = 0; 
  }

  preload(){
    this.load.image('disparo', '../img/shoot.png');
  }

  create(){
    //background
    this.add.image(400,300,'BG');

    //creacion jugador 
    this.player = this.physics.add.sprite(400,300,'nave');
    this.cursors = this.input.keyboard.createCursorKeys(); 

    //vidas
    this.lifeText = this.add.text(20, 20, 'Life: ' + this.playerLife, { fontSize: '20px', fill: '#fff' });

    //puntaje
    this.scoreText = this.add.text(600, 20, 'Score: ' + this.score, { fontSize: '20px', fill: '#fff' });

    // Grupo para las naves enemigas
    this.enemiesGroup = this.physics.add.group();

    // Genera naves enemigas cada cierto tiempo
    this.enemyTimer = this.time.addEvent({
      delay: 1000, 
      callback: () => {
          const enemy = this.physics.add.image(this.game.config.width, Phaser.Math.Between(50, this.game.config.height - 50), 'enemigo');
          this.enemiesGroup.add(enemy);
          enemy.setOrigin(1, 0.5);
          enemy.speed = Phaser.Math.Between(100, 200); 
          enemy.setVelocityX(-enemy.speed); 
          enemy.enemyLife = 2;
      },
      callbackScope: this,
      loop: true    
    });

    //Variable para determinar el tiempo entre disparos
    this.nextDisparoTime = 0;

    //cracion animacion jugador
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

    //creacion particulas
    this.particles = this.add.particles(-10,0,'particula',{
      speed:100,
      angle:{min:150, max:210},
      scale:{start:1, end:0},
      blendMode: 'ADD'
    });

    //para que las particulas sigan al jugador
    this.particles.startFollow(this.player);

    //crea grupo de disparos
    this.disparosGroup = this.physics.add.group();
    }

  update() 
  {
    //colision jugador y enemigos
    this.physics.overlap(this.player, this.enemiesGroup, this.playerCollision, null, this);

    //colision disparos y enemigos
    this.physics.overlap(this.disparosGroup, this.enemiesGroup, this.enemyDestroy, null, this);

    // Disparo de la nave
    this.disparar();
  
    if (this.cursors.left.isDown) 
    {
      this.player.setVelocityX(-200);
      this.player.anims.play('left', true);
    } else if(this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play('right', true);
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
      const disparo = this.disparosGroup.create(this.player.x, this.player.y, 'disparo');
      disparo.setVelocityX(500);

      this.disparosGroup.add(disparo);

      // Establece el tiempo en el que el siguiente disparo podrá realizarse
      this.nextDisparoTime = this.time.now + 150; // 1000 milisegundos (1 segundo) de cooldown
    }
  }

  playerCollision(player, enemy) {
    this.playerLife--;

    this.lifeText.setText('Life: ' + this.playerLife);

    enemy.destroy();

    if (this.playerLife <= 0) {
      this.scene.start("gameOver"); 
    } 
  }  

  enemyDestroy(disparo, enemy) {
    enemy.enemyLife -= 1;

    disparo.destroy();

    if (enemy.enemyLife <= 0) {
      enemy.destroy();
      this.score += 20;
      this.scoreText.setText('Score: ' + this.score);
    }

    if(this.score >= 200){
      this.scene.start("Scene_play2", { playerLife: this.playerLife }); //pasa la vida actual del jugador como un parametro
    }
  }
}
export default Scene_play;