const ctx = (document.getElementById("Main") as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
const height = 800;
const width = 600;
var player = new Player(v(20, 20), v(20, 20));
