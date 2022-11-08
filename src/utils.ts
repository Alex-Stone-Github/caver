export interface Vector {
    x: number;
    y: number;
}
export const v = (x: number, y: number): Vector => {return {x, y};};
export function AABB(ap: Vector, as: Vector, bp: Vector, bs: Vector): boolean {
    if (ap.x + as.x > bp.x && bp.x + bs.x > ap.x) {
        if (ap.y + as.y > bp.y && bp.y + bs.y > ap.y) {
            return true;
        }
    }
    return false;
}
