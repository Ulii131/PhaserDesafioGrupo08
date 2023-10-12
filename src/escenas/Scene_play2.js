class Scene_play2 extends Phaser.Scene{

  constructor() {
    super("Scene_play2"); 
  }
  preload(){
  
  }
  create(data){

    this.bossLife = 20;

  //obtiene la vida del jugador de la escena naterior  
  this.playerLife = data.playerLife;
  this.score = data.score;

  //background
  this.add.image(400,300,'lvl2');

  //creacion player
  this.player = this.physics.add.sprite(400,300,'nave');
  this.cursors = this.input.keyboard.createCursorKeys();

  //vidas jugador
  this.lifeText = this.add.text(20, 20, 'Life: ' + this.playerLife, { fontSize: '20px', fill: '#fff' });

  //puntaje
  this.scoreText = this.add.text(600, 20, 'Score: ' + this.score, { fontSize: '20px', fill: '#fff' });

  //vidas jefe
  this.lifeBossText = this.add.text(20, 50, 'Life Boss: ' + this.bossLife, { fontSize: '20px', fill: '#fff' });

  
  
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
        enemy.enemyLife = 2;
    },
    callbackScope: this,
    loop: true 
    
  }); 
  
    //Boss
    this.boss = this.physics.add.image(this.game.config.width - 10, this.game.config.height / 2, 'boss');
    this.boss.setOrigin(0.5, 0.5);
    this.bossLife = 20;
    this.physics.world.enable(this.boss);
  
    this.bossMoving = this.tweens.add({
      targets: this.boss.body.velocity,
      props: {
        x: { from: 20, to: -120, duration: 4000 }, // Movimiento horizontal
        y: { from: 200, to: -200, duration: 2000 }  // Movimiento vertical
    },
    ease: 'Sine.easeInOut',
    yoyo: true,       // Hace que el enemigo vuelva atrás después de llegar a su destino
    repeat: -1        // Repite el movimiento continuamente
  });

    //Variable para determinar el tiempo entre disparos
    this.nextDisparoTime = 0;
  
    //Variable para determinar el tiempo entre disparos
    this.nextBossDisparoTime = 0;
  
  
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
  //crea grupo de balas boss
  this.disparoBossGroup = this.physics.add.group();
  }
  
  update() 
  {


    //colision jugador y enemigos
    this.physics.overlap(this.player, this.enemiesGroup, this.playerCollision, null, this);

    //colision disparos y enemigos
    this.physics.overlap(this.disparosGroup, this.enemiesGroup, this.enemyDestroy, null, this);

    this.physics.overlap(this.disparoBossGroup, this.player, this.balaBossCollision, null, this);

    

  

    // Colisión entre disparos del jugador y el jefe
    this.physics.overlap(this.disparosGroup, this.boss, this.bossDestroy, null, this);


    //DISPARO DE LA NAVE
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
    } else if(this.cursors.down.isDown){
      this.player.setVelocityY(200);
      this.player.anims.play('up',true);
    } else{
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      this.player.anims.play('idle',true);
    }
    
    //disparo/bala de boss
    this.bossDisparar();
  
  }
  
  disparar(){
    // Verifica si la tecla de espacio está presionada y si ha pasado suficiente tiempo desde el último disparo
    if (this.cursors.space.isDown && (this.time.now > this.nextDisparoTime)) {
      
      // Crea el disparo y establece su velocidad
      const disparo = this.disparosGroup.create(this.player.x, this.player.y, 'disparo');
      

      this.disparosGroup.add(disparo);

      

      // Establece el tiempo en el que el siguiente disparo podrá realizarse
      this.nextDisparoTime = this.time.now + 200; // 1000 milisegundos (1 segundo) de cooldown
    }
    this.disparosGroup.setVelocityX(500);
  }
  
  bossDisparar(){
    // Verifica si la tecla de espacio está presionada y si ha pasado suficiente tiempo desde el último disparo
    if (this.time.now > this.nextBossDisparoTime) {
      // Crea una bala y establece su velocidad
      const balaBoss = this.disparoBossGroup.create(this.boss.x, this.boss.y, 'bala');
      balaBoss.setVelocityX(-300);
      // Establece el tiempo en el que el siguiente disparo podrá realizarse
      this.nextBossDisparoTime = this.time.now + 1000; 
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

  balaBossCollision(balaBoss, player) {
    this.playerLife --;
    this.lifeText.setText('Life: ' + this.playerLife);

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

    if(this.score >= 500){
      this.scene.start("gameOver"); 
    }
  }

  bossDestroy(disparo, boss) {
    
    this.bossLife -= 1;

    disparo.destroy();
    

    this.lifeBossText.setText('Life Boss: ' + this.bossLife)

    

    // if (this.bossLife <= 0) {
    //   boss.destroy();
    //   this.scene.start("gameOver");
    // }
  }
}
  export default Scene_play2;