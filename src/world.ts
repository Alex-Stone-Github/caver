import { v, Vector, AABB } from "./utils.js"
import { tile_size, ctx } from "./settings.js"
import { Camera } from "./player.js"

const level_strs = [
    `
    ##############################################################+
    #                                                          ###+
    #                                                          ###+
    #                                                          ###+
    #                                  #                       ###+
    #                         #####    #                       ###+
    #                        #         #                       ###+
    #                                  #                       ###+
    #                  # ######                                ###+
    #                #                                         ###+
    ##############################################################+
    ##############################################################+
    `,
    `
    ###+
    ###+
    ###+
    `
];
// singleton
export class LevelManager {
    private levels: Level[];
    private level_ctr: number;
    public constructor() {
        this.level_ctr = 0;
        this.levels = [];
        let y = 0;
        for (const level_str of level_strs) {
            const level_height = (level_str.split("+").length - 1) * tile_size
            this.levels.push(new Level(level_str, y, level_height));
            y += level_height;
        }
    }
    public load_new_level() {
        this.level_ctr ++;
    }
    public current_level(): Level {
        return this.levels[this.level_ctr];
    }
    public next_level() {
        return this.levels[this.level_ctr+1];
    }
}

export class Level {
    private tiles: Tile[];
    public starty: number;
    public endy: number;
    public constructor(level_format: string, starty: number, endy: number) {
        this.starty = starty;
        this.endy = endy;
        this.tiles = [];
        let y = starty;
        let x = 0;
        for (const tile_char of level_format.split("")) {
            switch (tile_char) {
                case '#':
                    this.tiles.push({position: v(x, y), size: v(tile_size, tile_size)});
                    x += tile_size;
                    break;
                case ' ':
                    x += tile_size;
                    break;
                case '+':
                    y += tile_size;
                    x = 0;
                    break;
                default:
                    break;
            }
        }
    }
    public show(camera: Camera) {
        const offset = camera.get_translation();
        for (const tile of this.tiles) {
            ctx.fillStyle = "blue";
            ctx.fillRect(tile.position.x + offset.x, tile.position.y + offset.y, tile.size.x, tile.size.y);
        }
    }
    public check_AABB(position: Vector, size: Vector): boolean {
        for (const tile of this.tiles) {
            if (AABB(position, size, tile.position, tile.size)) {
                return true;
            }
        }
        return false;
    }
}
export interface Tile {
    position: Vector;
    size: Vector;
}


