import Bootloader from "../src/Bootloader.js    ";
import Scene_play from "../src/escenas/Scene_play.js";
import Scene_play2 from "../src/escenas/Scene_play2.js";
import menu from "./escenas/menu.js";



const config = {
    title: "FPWTpExpress",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 800,
        height: 600,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#ffffff",
    pixelArt: false,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 0
            }
        }
    },
    scene: [
        Bootloader,
        Scene_play,
        Scene_play2,
        menu
    ]
};

new Phaser.Game(config);