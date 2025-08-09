document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('reset-btn');

    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (boardState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        boardState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
        
        checkResult();
    };

    const checkResult = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = boardState[winCondition[0]];
            const b = boardState[winCondition[1]];
            const c = boardState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.innerHTML = `Player ${currentPlayer} has won!`;
            gameActive = false;
            return;
        }

        if (!boardState.includes('')) {
            statusText.innerHTML = 'Game is a draw!';
            gameActive = false;
            return;
        }

        handlePlayerChange();
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerHTML = `Player ${currentPlayer}'s turn`;
    };

    const handleResetGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        statusText.innerHTML = `Player ${currentPlayer}'s turn`;

        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('x', 'o');
        });
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleResetGame);
});
