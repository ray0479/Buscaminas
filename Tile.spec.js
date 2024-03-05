import {Tile, tileStates} from "./tile.js";

describe("Tile", () => {
    it("should show marked tile", () => {
        const tile = new Tile()
        tile.toggleMarked()
        expect(tile.state()).toBe(tileStates.MARKED)
    });
    it("should show opened tile", () => {
        const tile = new Tile(false ,0)
        tile.openTile()
        expect(tile.state()).toBe(tileStates.EMPTY)
    });
    it("should show tile with mine", () => {
        const tile = new Tile(true)
        tile.openTile()
        expect(tile.state()).toBe(tileStates.MINE)
    });
    it("should unmark tile when try to mark it for second time", () =>{
        const tile = new Tile(true)
        tile.toggleMarked()
        tile.toggleMarked()
        expect(tile.state()).toBe(tileStates.CLOSED)
    });
    it("should show tile with a one", () => {
        const tile = new Tile(false, 1)
        tile.openTile()
        expect(tile.state()).toBe(tileStates.ONE)
    });
    it("should show tile with a two", () => {
        const tile = new Tile(false, 2)
        tile.openTile()
        expect(tile.state()).toBe(tileStates.TWO)
    });
    it("should show tile with a three", () => {
        const tile = new Tile(false, 3)
        tile.openTile()
        expect(tile.state()).toBe(tileStates.THREE)
    });
    it('should not show a mark tile when that is opened', function () {
        const tile = new Tile(false, 0)
        tile.openTile()
        tile.toggleMarked()
        expect(tile.state()).toBe(tileStates.EMPTY)
    });
    it('should not open a marked tile', function () {
        const tile = new Tile(false, 0)
        tile.toggleMarked()
        tile.openTile()
        expect(tile.state()).toBe(tileStates.MARKED)
    });
});