import {Tile, tileStates} from "./tile.js";

export class MinesChecker {

    checkMines(mines){
        let beforeMine = undefined;
        for (const line of mines) {
            for(const mine of line){
                if (beforeMine !== undefined && mine !== beforeMine) {
                    return true;
                }
                beforeMine = mine;
            }
        }
        return false;
    }
    validMines(mines){
        if (!this.checkMines(mines)) {
            throw new Error("The board has to have at least one mine, and at least one empty tile");
        }
    }
}


export class TilesManager {
    tiles;
    #minesChecker = new MinesChecker();
    constructor(mines) {
        this.#generateTiles(mines);
    }
    areThereClosedTilesWithoutMines() {
        return this.tiles.some(line => line.some(tile => tile.state() === tileStates.CLOSED && !tile.hasMine()))
    }
    tileState() {
        return this.tiles.map((line) => {
            return line.map((tile) => tile.state())
        })
    }
    numberOfMine(mines, positionLine, positionTile){
        let numberMine = 0;
        for(const [lineIndex, line] of mines.entries()) {
            numberMine = numberMine + line.filter((tile, tileIndex) => tile && TilesManager.#isTileNeighbor(lineIndex, positionLine, tileIndex, positionTile)).length;
        }
        return numberMine;
    }
    toggleMarked(line, tile) {
        return this.tiles[line][tile].toggleMarked();
    }

    #generateTiles(mines) {
        this.#minesChecker.validMines(mines)
        this.tiles = mines.map((line, indexLine) => {
            return line.map((tile, indexTile) => {
                return new Tile(tile, this.numberOfMine(mines, indexLine, indexTile));
            });
        });
    }

    openTile(line, tile) {
        const wasMine = this.tiles[line][tile].openTile();
        if (wasMine) {
            return true;
        }
        if(this.tiles[line][tile].state() === tileStates.EMPTY){
            this.#openNeighborTiles(line, tile);
        }
        return false;
    }

    #openNeighborTiles(tileRow, tileColumn) {
        for(const [lineIndex, line] of this.tiles.entries()){
            for (const [tileIndex, tile] of line.entries()) {
                if (!TilesManager.#isTileNeighbor(lineIndex, tileRow, tileIndex, tileColumn) || TilesManager.#tileIsAlreadyOpenOrHasMine(tile)) {
                    continue;
                }
                tile.openTile();
                if (tile.state() === tileStates.EMPTY) {
                    this.#openNeighborTiles(lineIndex, tileIndex);
                }
            }
        }
    }

    static #tileIsAlreadyOpenOrHasMine(tile) {
        return tile.state() !== tileStates.CLOSED || tile.hasMine();
    }

    static #isTileNeighbor(lineIndex, tileRow, tileIndex, tileColumn) {
        return lineIndex - tileRow <= 1 && lineIndex - tileRow >= -1 && tileIndex - tileColumn <= 1 && tileIndex - tileColumn >= -1;
    }
}
