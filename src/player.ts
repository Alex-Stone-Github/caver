import { v, Vector } from "./utils.js"
import { ctx, gravity, friction } from "./settings.js"
import { Level } from "./world.js"

export class Player {
    private position: Vector;
    private _size: Vector;
    private velocity: Vector;
    private grounded: boolean;
    public constructor(position: Vector, size: Vector) {
        this.position = position;
        this._size = size;
        this.velocity = v(0, 0);
        this.grounded = false;
    }
    public update(level: Level) {
        this.velocity.y += gravity;
        this.velocity.x *= friction;
        this.velocity.y *= friction;

        this.grounded = false;
        this.position.y += this.velocity.y;
        if (this.collided(level)) {
            this.position.y -= this.velocity.y;
            this.velocity.y = 0;
            this.grounded = true;
        }
        this.position.x += this.velocity.x;
        if (this.collided(level)) {
            this.position.x -= this.velocity.x;
            this.velocity.x = 0;
            this.grounded = true;
        }
    }
    public show() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.position.x, this.position.y, this._size.x, this._size.y);
    }
    public jump(amount: number) {
        if (this.grounded) {
            this.velocity.y -= amount;
        }
    }
    public straif(amount: number) {
        this.velocity.x += amount;
    }
    private collided(level: Level) {
        return level.check_AABB(this.position, this._size);
    }
}
