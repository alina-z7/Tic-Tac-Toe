document.addEventListener("DOMContentLoaded", () => {
    const backgroundMusic = document.getElementById("background-music");
    const startButton = document.getElementById("start-button");
    const startGameDiv = document.getElementById("start-game");
    const resetButton = document.getElementById("reset-button");

    startGameDiv.style.display = "none";
    resetButton.style.display = "none";
    
    startButton.addEventListener("click", () => {
        startGameDiv.style.display = "block"; // Display the game grid
        startButton.style.display = "none"; // Hide the start button
        resetButton.style.display = "block";

        backgroundMusic.play();

        const winningGames = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ];
        
        let currentPlayer = 'X'; // Start with player X
        
        let tiles = document.getElementsByClassName("tile");
        tiles = Array.from(tiles); // Convert HTMLCollection to Array

        tiles.forEach((tile) => {
            tile.innerText = "";
            tile.classList.remove('red-X', 'yellow-O'); // Clear classes
            tile.disabled = false; // Enable all tiles
        });

        tiles.forEach((tile) => {
            tile.addEventListener("click", () => {
                if (tile.innerText === "") {
                    tile.innerText = currentPlayer;
                    tile.classList.add(currentPlayer === 'X' ? 'red-X' : 'yellow-O');
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players

                    tile.disabled = true;
                    checkWinner(); // Check for a winner after each move
                }
            });
        });

        resetButton.addEventListener("click", () => {
            tiles.forEach((tile) => {
                tile.innerText = "";
                tile.classList.remove('red-X', 'yellow-O');
                tile.disabled = false;
            });
        });

        function checkWinner() {
            let boardFull = true; // Assume the board is full
    
            for (const game of winningGames) {
                const [a, b, c] = game;
                const tileA = tiles[a - 1].innerText;
                const tileB = tiles[b - 1].innerText;
                const tileC = tiles[c - 1].innerText;
    
                if (tileA !== "" && tileA === tileB && tileA === tileC) {
                    // A player has won, exit the function
                    console.log(`${tileA} wins!`);
                    setTimeout(() => {
                        alert(`${tileA} wins!`);
                    }, 100);
                    return;
                }
            }
    
            // If no winner is found, check for a tie
            for (const tile of tiles) {
                if (tile.innerText === "") {
                    // If there's an empty tile, the board is not full yet
                    boardFull = false;
                    break;
                }
            }
    
            if (boardFull) {
                // If the board is full and no winner, it's a tie
                setTimeout(() => {
                    alert("It's a tie!");
                }, 100);
            }
        }
    });
});
