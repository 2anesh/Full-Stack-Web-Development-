document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const newGameBtn = document.getElementById('newGameBtn');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Create the tic-tac-toe board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    // Handle cell click event
    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (checkWin()) {
                showWinnerModal(`Player ${currentPlayer} wins!`);
                gameActive = false;
            } else if (checkDraw()) {
                showWinnerModal('It\'s a draw!');
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Check for a win
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    // Check for a draw
    function checkDraw() {
        return gameBoard.every(cell => cell !== '');
    }

    // Reset the game
    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    // Show the winner modal
    function showWinnerModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
    }

    // Close the winner modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Start a new game from the modal
    function newGame() {
        closeModal();
        resetGame();
    }

    // Event listeners
    resetBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', newGame);
});
