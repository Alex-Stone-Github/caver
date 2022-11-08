import { v, Vector, AABB } from "./utils.js"
import { tile_size, ctx } from "./settings.js"

export class Level {
    private tiles: Tile[];
    public constructor(world_str: string) {
        this.tiles = [];
        let y = 0;
        let x = 0;
        for (const tile_char of world_str.split("")) {
            switch (tile_char) {
                case '#':
                    this.tiles.push({position: v(x, y), size: v(tile_size, tile_size)});
                    break;
                case '\n':
                    y += tile_size;
                    x = 0;
                    break;
                default:
                    break;
            }
            x += tile_size;
        }
    }
    public show() {
        for (const tile of this.tiles) {
            ctx.fillStyle = "blue";
            ctx.fillRect(tile.position.x, tile.position.y, tile.size.x, tile.size.y);
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


