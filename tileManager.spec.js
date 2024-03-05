import {TilesManager} from "./tilesManager.js";
import {tileStates} from "./tile.js";

describe("tileManager", () => {
    it.each([
        [ [[false, true], [true, true]], 0, 0, [[tileStates.THREE, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[true, false], [false, false]], 0, 1, [[tileStates.CLOSED, tileStates.ONE], [tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[true, false], [false, false]], 0, 1, [[tileStates.CLOSED, tileStates.ONE], [tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[true, false], [false, true]], 0, 1, [[tileStates.CLOSED, tileStates.TWO], [tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[false, true], [true, true]], 0, 0, [[tileStates.THREE, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[true, false], [false, false]], 0, 1, [[tileStates.CLOSED, tileStates.ONE], [tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[true, false], [true, false]], 0, 1, [[tileStates.CLOSED, tileStates.TWO], [tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[true, true], [true, false]], 1, 1, [[tileStates.CLOSED, tileStates.CLOSED], [tileStates.CLOSED, tileStates.THREE]] ],
        [ [[true, true, false], [true, false, false], [true, false, false]], 1, 1, [[tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED], [tileStates.CLOSED, tileStates.FOUR, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[true, true, false], [true, false, true], [true, false, false]], 1, 1, [[tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED], [tileStates.CLOSED, tileStates.FIVE, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[true, true, true], [true, false, true], [true, false, false]], 1, 1, [[tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED], [tileStates.CLOSED, tileStates.SIX, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[true, true, true], [true, false, true], [true, true, false]], 1, 1, [[tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED], [tileStates.CLOSED, tileStates.SEVEN, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[true, true, true], [true, false, true], [true, true, true]], 1, 1, [[tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED], [tileStates.CLOSED, tileStates.EIGHT, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[false, false, true], [true, true, true], [false, true, false]], 0, 0, [[tileStates.TWO, tileStates.CLOSED, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED]] ],
    ])("should show the %d number of mines when there is %d mines around the tile", (mines, row, column, state) => {
        const tileManager = new TilesManager(mines);
        tileManager.openTile(row, column)
        expect(tileManager.tileState()).toStrictEqual(state);
    });

    it.each([
        [[[true, false], [false, false]], 0, 0, [[tileStates.MINE, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED]]],
        [ [[false, true], [false, false]], 0, 1, [[tileStates.CLOSED, tileStates.MINE], [tileStates.CLOSED, tileStates.CLOSED]] ],
        [[[true, false], [false, true]], 0, 0, [[tileStates.MINE, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED]]]
    ])("should show a tile with mine when open a tile", (mines, row, column, state) => {
        const tileManager = new TilesManager(mines);
        tileManager.openTile(row, column)
        expect(tileManager.tileState()).toStrictEqual(state);
    });

    it.each([
            [ [[true, true, false], [true, false, false], [true, false, false]], 2, 2, [[tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED], [tileStates.CLOSED, tileStates.FOUR, tileStates.ONE], [tileStates.CLOSED, tileStates.TWO, tileStates.EMPTY]] ],
            [ [[false, false, true], [false, false, true], [false, true, true]], 0, 0, [[tileStates.EMPTY, tileStates.TWO, tileStates.CLOSED], [tileStates.ONE, tileStates.FOUR, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED]] ],
         [ [
        [false, false, false, false, false, false],
        [true, false, true, false, false, false],
        [false, true, false, false, true, false],
        [true, false, true, false, true, false],
        [false, true, false, false, false, false],
        [false, false, true, false, false, true]
    ], 0, 5, [
        [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.ONE, tileStates.EMPTY, tileStates.EMPTY],
        [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.TWO, tileStates.ONE, tileStates.ONE],
        [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED],
        [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED],
        [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED],
        [tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED, tileStates.CLOSED]
    ] ]
    ])("should open various tiles when the tile are empty", (mines, row, column, state) => {
        const tileManager = new TilesManager(mines);
        tileManager.openTile(row, column)
        expect(tileManager.tileState()).toStrictEqual(state);
    });

    it.each([
        [ [[true, false], [false, false]], 0, 0, [[tileStates.MARKED, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED]] ],
        [ [[true, false], [false, false]], 0, 1, [[tileStates.CLOSED, tileStates.MARKED], [tileStates.CLOSED, tileStates.CLOSED]] ]
    ])("should show a marked tile after marking a tile", (mines, row, column, state) => {
        const tileManager = new TilesManager(mines);
        tileManager.toggleMarked(row, column);
        expect(tileManager.tileState()).toStrictEqual(state);
    })

    it('should start the game with a closed tiles', () => {
        const tilemanager = new TilesManager([[true, false], [false, false]]);
        expect(tilemanager.tileState()).toStrictEqual([[tileStates.CLOSED, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED]]);
    });

    it('should show a tile open and a tile with mine', () => {
        const tilemanager = new TilesManager([[false, true], [false, false]]);
        tilemanager.openTile(0, 0);
        tilemanager.openTile(0, 1);
        expect(tilemanager.tileState()).toStrictEqual([[tileStates.ONE, tileStates.MINE], [tileStates.CLOSED, tileStates.CLOSED]]);
    });

    it('should show a opened tile and a marked tile', () => {
        const tilemanager = new TilesManager([[false, true], [false, false]]);
        tilemanager.openTile(0, 0);
        tilemanager.toggleMarked(0, 1)
        expect(tilemanager.tileState()).toStrictEqual([[tileStates.ONE, tileStates.MARKED], [tileStates.CLOSED, tileStates.CLOSED]]);
    });
    it('should unmarked when try mark a tile for the second time', () => {
        const tilemanager = new TilesManager([[false, true], [false, false]]);
        tilemanager.toggleMarked(0, 0);
        tilemanager.toggleMarked(0, 0);
        expect(tilemanager.tileState()).toStrictEqual([[tileStates.CLOSED, tileStates.CLOSED], [tileStates.CLOSED, tileStates.CLOSED]])
    });

    it('should show two tiles close and two tiles open when we open a empty tile', function () {
        const tilemanager = new TilesManager([[false, true], [true, false]]);
        tilemanager.openTile(0, 0);
        tilemanager.openTile(1, 1);
        expect(tilemanager.tileState()).toStrictEqual([[tileStates.TWO, tileStates.CLOSED], [tileStates.CLOSED, tileStates.TWO]]);
    });
});