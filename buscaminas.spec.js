import {Buscaminas, gameStates} from "./buscaminas";

const tileWithMine = true;
const tileWithoutMine = false;
describe('Buscaminas', () => {
    it.each([
        [[ [tileWithMine, tileWithoutMine],
            [tileWithoutMine, tileWithoutMine] ],
            gameStates.PLAYING]

    ])("should keep playing when not won and not lost", (mines, state) => {
        const buscaminas = new Buscaminas(mines)
        buscaminas.openTile(0, 1)
        expect(buscaminas.gameState()).toBe(state)
    });
    it.each([
        [ [[tileWithMine, tileWithoutMine], [tileWithoutMine, tileWithoutMine]], 0, 0, gameStates.LOST ],
        [ [[tileWithoutMine, tileWithMine], [tileWithoutMine, tileWithoutMine]], 0, 1, gameStates.LOST ],
        [ [[tileWithoutMine, tileWithoutMine], [tileWithMine, tileWithoutMine]], 1, 0, gameStates.LOST ],
        [ [[tileWithoutMine, tileWithoutMine], [tileWithoutMine, tileWithMine]], 1, 1, gameStates.LOST ],
        [ [[tileWithoutMine, tileWithMine], [tileWithMine, tileWithMine]], 0, 0, gameStates.WON]
    ])("should consider the game is lost when open a tile with mine or is won when open the only tile empty", (mines, row, column, state) =>{
        const buscaminas = new Buscaminas(mines)
        buscaminas.openTile(row, column)
        expect(buscaminas.gameState()).toBe(state)
    });

    it('should consider that the game is won when all tiles are open', () => {
        const buscaminas = new Buscaminas(
            [
                [tileWithMine, tileWithoutMine],
                [tileWithoutMine, tileWithoutMine]
            ]
        );
        buscaminas.openTile(0, 1);
        buscaminas.openTile(1, 0);
        buscaminas.openTile(1, 1);
        expect(buscaminas.gameState()).toBe(gameStates.WON);
    });

    it('should consider the game is playing when is just started', () => {
        const buscaminas = new Buscaminas(
            [
                [tileWithMine, tileWithoutMine],
                [tileWithoutMine, tileWithoutMine]
            ]
        );
        expect(buscaminas.gameState()).toBe(gameStates.PLAYING);
    });
    it('should consider that the game is not won when tiles empty are marked', () => {
        const buscaminas = new Buscaminas(
       [
                [tileWithMine, tileWithoutMine],
                [tileWithoutMine, tileWithoutMine]
            ]
        );
        buscaminas.markAndUnmarkTile(0, 1);
        buscaminas.openTile(1,0)
        expect(buscaminas.gameState()).toBe(gameStates.PLAYING);
    });

    it('should not allow to mark a tile when you have already lost', () => {
        const buscaminas = new Buscaminas(
       [
                [tileWithMine, tileWithoutMine],
                [tileWithoutMine, tileWithoutMine]
            ]
        );
        buscaminas.openTile(0, 0);
        buscaminas.markAndUnmarkTile(0, 0);
        expect(buscaminas.gameState()).toBe(gameStates.LOST);
    });

    it('should lose when one tile is open and one tile with mine is open too', () => {
        const buscaminas = new Buscaminas(
       [
                [tileWithoutMine, tileWithMine],
                [tileWithoutMine, tileWithoutMine]
            ]
        );
        buscaminas.openTile(0, 0);
        buscaminas.openTile(0, 1);
        expect(buscaminas.gameState()).toBe(gameStates.LOST)
    });

    it('should throw an error when all tiles are empty', () => {
        expect(() => {
            new Buscaminas(
           [
                    [tileWithoutMine, tileWithoutMine],
                    [tileWithoutMine, tileWithoutMine]
                ]
            );
        }).toThrowError("The board has to have at least one mine, and at least one empty tile");
    });

});
