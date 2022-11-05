var ctx = document.getElementById("Main").getContext("2d");
var height = 800;
var width = 600;
var player = new Player(v(20, 20), v(20, 20));
var Player = (function () {
    function Player() {
    }
    Player.prototype.Player = function (position, size) {
        this.position = position;
        this._size = size;
    };
    return Player;
}());
var v = function (x, y) { return { x: x, y: y }; };
