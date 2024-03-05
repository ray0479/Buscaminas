import {Buscaminas, gameStates} from "./buscaminas.js";
import {tileStates} from "./tile.js";

class TileCoordinates {
    get y() {
        return this._y;
    }

    get x() {
        return this._x;
    }

    constructor(positionMine, width) {
        this._x = Math.floor(positionMine / width);
        this._y = positionMine % width;
    }

}

const NUMBER_OF_MINES = 10;
const BOARD_NUMBER_OF_ROWS = 8;
const backgrounds = {
    [tileStates.CLOSED]: "url('https://minesweeper.online/img/skins/hd/closed.svg')",
    [tileStates.EMPTY]: "url('https://minesweeper.online/img/skins/hd/type0.svg')",
    [tileStates.ONE]: "url('https://minesweeper.online/img/skins/hd/type1.svg')",
    [tileStates.TWO]: "url('https://minesweeper.online/img/skins/hd/type2.svg')",
    [tileStates.THREE]: "url('https://minesweeper.online/img/skins/hd/type3.svg')",
    [tileStates.FOUR]: "url('https://minesweeper.online/img/skins/hd/type4.svg')",
    [tileStates.FIVE]: "url('https://minesweeper.online/img/skins/hd/type5.svg')",
    [tileStates.SIX]: "url('https://minesweeper.online/img/skins/hd/type6.svg')",
    [tileStates.SEVEN]: "url('https://minesweeper.online/img/skins/hd/type7.svg')",
    [tileStates.EIGHT]: "url('https://minesweeper.online/img/skins/hd/type8.svg')",
    [tileStates.MINE]: "url('https://minesweeper.online/img/skins/hd/mine_red.svg')",
    [tileStates.MARKED]: "url('https://img2.freepng.es/20180325/kqe/kisspng-minesweeper-computer-icons-bing-maps-video-game-mines-5ab7a191c79531.0286407715219838898175.jpg')"
}
window.onload = function () {
    let buscaminas;
    let tilesHTML = document.getElementsByClassName("tiles");

    function startGame() {

        let mines = []
        for (let i = 0; i < BOARD_NUMBER_OF_ROWS; i++) {
            let minesLine = []
            for (let j = 0; j < BOARD_NUMBER_OF_ROWS; j++) {
                minesLine.push(false)
            }
            mines.push(minesLine)
        }

        for (let i = 0; i < NUMBER_OF_MINES; i++) {
            let positionMine = mine();
            const coordinates = new TileCoordinates(positionMine, BOARD_NUMBER_OF_ROWS);
            mines[coordinates.x][coordinates.y] = true
        }
        buscaminas = new Buscaminas(mines);
        for (const tile of tilesHTML) {
            tile.style.backgroundImage = backgrounds[tileStates.CLOSED]
        }
    }

    function mine() {
        return Math.floor(Math.random() * 64);
    }

    startGame()
    for (const [tileIndex, tile] of Object.entries(tilesHTML)) {
        const coordinates = new TileCoordinates(tileIndex, BOARD_NUMBER_OF_ROWS);
        tile.addEventListener("auxclick", function () {
            tile.oncontextmenu = function () {
                return false;
            }
            buscaminas.markAndUnmarkTile(coordinates.x, coordinates.y);
            repaintBoard();
        });
        tile.addEventListener("click", function () {
            buscaminas.openTile(coordinates.x, coordinates.y);
            repaintBoard();
            window.setTimeout(function () {
                winOrLost()
            }, 500);
        });
    }

    function winOrLost() {
        if (buscaminas.gameState() === gameStates.PLAYING) {
            return;
        }
        let message = "You Win!!";

        if (buscaminas.gameState() === gameStates.LOST) {
            message = "You Lose!!";
        }
        alert(message);
        startGame();
    }

    function repaintBoard() {
        let tile;
        let elements = Array.from(tilesHTML);
        for (const tileIndex in elements) {
            const coordinates = new TileCoordinates(tileIndex, BOARD_NUMBER_OF_ROWS);
            tile = buscaminas.tilesManager.tiles[coordinates.x][coordinates.y].state();
            tilesHTML[tileIndex].style.backgroundImage = backgrounds[tile]
        }
    }

}