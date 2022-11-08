import { v } from "./utils.js"
import { Player, Camera } from "./player.js"
import { ctx, width, height } from "./settings.js"
import { Level, LevelManager } from "./world.js"


var player = new Player(v(width/2, height/4), v(20, 20));
var camera = new Camera(v(0, 0));

const level_manager = new LevelManager();
const level = level_manager.current_level();
const next_level = level_manager.next_level();
console.log(level);

setInterval(() => {
    // update
    player.update(level);
    player.update_camera(camera);

    // draw
    ctx.fillStyle = "orange";
    ctx.fillRect(0, 0, width, height);
    level.show(camera);
    next_level.show(camera);
    player.show(camera);
}, 1000/30);
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'w':
            player.jump(20);
            break;
        case 'a':
            player.straif(-10);
            break;
        case 'd':
            player.straif(10);
            break;
        default:
            break;
    }
});
