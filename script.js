let turn = 0;
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Top-left to bottom-right diagonal
    [2, 4, 6]  // Top-right to bottom-left diagonal
];

document.addEventListener("DOMContentLoaded", () => {
    const gridSquares = document.querySelectorAll(".grid-square");
    const overlay = document.getElementById("overlay");
    const resetButton = document.getElementById("reset-button");
    const overlayText = document.getElementById("overlay-text");

    gridSquares.forEach((square, index) => {
        square.addEventListener("click", () => {
            if (square.classList.contains("red") || square.classList.contains("blue")) {
                console.log(`Grid square ${index + 1} has already been clicked!`);
                return;
            }

            turn += 1;
            if (turn % 2 == 0) {
                square.classList.add("blue");
                square.textContent = "O";
            } else {
                square.classList.add("red");
                square.textContent = "X";
            }

            // Check for a winner after the move
            const winner = checkWinner(gridSquares);
            if (winner) {
                overlayText.textContent = `${winner} has won the game!`;
                overlay.style.display = "flex";
            } else if (turn === 9) {
                overlayText.textContent = "Its a draw!";
                overlay.style.display = "flex";
            }

            resetButton.addEventListener("click", () => {
                resetGame(gridSquares)
            })
        });
        square.addEventListener("mouseenter", () => {
            if (!(square.classList.contains("red") || square.classList.contains("blue"))) {
                if (turn % 2 == 0) {
                    square.textContent = "X";
                } else {
                    square.textContent = "O";
                }
            }
        })
        square.addEventListener("mouseout", () => {
            if (!(square.classList.contains("red") || square.classList.contains("blue"))) {
                square.textContent = "";
            }
        })
    });
});

// Function to check for a winner
function checkWinner(gridSquares) {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            gridSquares[a].classList.contains("red") &&
            gridSquares[b].classList.contains("red") &&
            gridSquares[c].classList.contains("red")
        ) {
            return "Red"; // Player 1 wins
        }
        if (
            gridSquares[a].classList.contains("blue") &&
            gridSquares[b].classList.contains("blue") &&
            gridSquares[c].classList.contains("blue")
        ) {
            return "Blue"; // Player 2 wins
        }
    }
    return null; // No winner yet
}

// Function to reset the game
function resetGame(gridSquares) {
    turn = 0;
    gridSquares.forEach(square => {
        square.classList.remove("red", "blue");
        square.textContent = ""; // Clear the text content
    });
    document.getElementById("overlay").style.display = "none";
}
