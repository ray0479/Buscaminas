import {TilesManager} from "./tilesManager.js";

export const gameStates = {
    PLAYING: 0,
    WON: 1,
    LOST: 2
}

export class Buscaminas {
    #gameState = gameStates.PLAYING;
    /** @member {TilesManager} */
    tilesManager;

    constructor(mines) {
        this.tilesManager = new TilesManager(mines);
    }

    updateGameStatus(wasMine) {
        if (wasMine) {
            this.#gameState = gameStates.LOST;
            return;
        }
        if (this.tilesManager.areThereClosedTilesWithoutMines()) {
            return;
        }
        this.#gameState = gameStates.WON;
    }

    openTile(line, mine) {
        const wasMine = this.tilesManager.openTile(line, mine);
        this.updateGameStatus(wasMine);
        return wasMine;
    }

    markAndUnmarkTile(line, tile) {
        if (this.#gameState === gameStates.LOST) {
            return;
        }
        this.tilesManager.toggleMarked(line, tile);
    }

    gameState() {
        return this.#gameState;
    }
}