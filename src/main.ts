import { v } from "./utils.js"
import { Player } from "./player.js"
import { ctx, width, height } from "./settings.js"
import { Level } from "./world.js"


var player = new Player(v(width/2, height/2), v(20, 20));
var level1_str = `
#############
# # # # # # #
#############
#############
#############
             
             
             
             
             
             
             
             
             
             
#############
`;
const level1 = new Level(level1_str);

setInterval(() => {
    // update
    player.update(level1);

    // draw
    ctx.fillStyle = "orange";
    ctx.fillRect(0, 0, width, height);
    player.show();
    level1.show();
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
