import { v, Vector } from "./utils.js"
import { width, height, ctx, gravity, friction } from "./settings.js"
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
        }
    }
    public update_camera(camera: Camera) {
        camera.translate(v(this.position.x - width/2, this.position.y - height/2));
    }
    public show(camera: Camera) {
        const offset = camera.get_translation();
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.position.x + offset.x, this.position.y + offset.y, this._size.x, this._size.y);
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

export class Camera {
    private position: Vector;
    public constructor(position: Vector) {
        this.position = position;
    }
    public translate(position: Vector) {
        this.position = position;
    }
    public get_translation(): Vector {
        return v(-this.position.x, -this.position.y);
    }
}



