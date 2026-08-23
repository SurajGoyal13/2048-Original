document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const splashScreen = document.getElementById('splash-screen');
    const mainMenu = document.getElementById('main-menu');
    const gameUI = document.getElementById('game-ui-container');
    const startBtn = document.getElementById('start-game-button');
    const tileContainer = document.getElementById('tile-container');
    const gameBoard = document.getElementById('game-board');
    const scoreEl = document.getElementById('score');
    const bestScoreEl = document.getElementById('best-score');
    const gameOverOverlay = document.getElementById('game-over-overlay');
    const newGameBtn = document.getElementById('new-game-button');
    const tryAgainBtn = document.getElementById('try-again-button');

    // Game State
    const GRID_SIZE = 4;
    let grid = [];
    let score = 0;
    let bestScore = localStorage.getItem('bestScore2048') || 0;

    // --- 1. App Flow ---
    
    // Auto-hide splash screen after 2 seconds
    setTimeout(() => {
        splashScreen.style.display = 'none';
        mainMenu.style.display = 'flex';
    }, 2000);

    // Start Game Button
    startBtn.addEventListener('click', () => {
        mainMenu.style.display = 'none';
        gameUI.style.display = 'flex';
        initGame();
    });

    // --- 2. Game Logic ---

    function initGame() {
        createGridBackground();
        grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
        score = 0;
        scoreEl.innerText = 0;
        bestScoreEl.innerText = bestScore;
        gameOverOverlay.style.display = 'none';
        
        addRandomTile();
        addRandomTile();
        drawTiles();
    }

    function createGridBackground() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell w-full h-full rounded-lg';
            gameBoard.appendChild(cell);
        }
    }

    function drawTiles() {
        tileContainer.innerHTML = '';
        const containerWidth = tileContainer.clientWidth;
        // Calculate gap based on 0.75rem (tailwind p-3) approx 12px
        const gap = 12; 
        // Available space for tiles = total width - (gaps * 5)
        const totalGapSpace = gap * (GRID_SIZE + 1);
        const tileSize = (containerWidth - totalGapSpace) / GRID_SIZE;

        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                if (grid[r][c] !== 0) {
                    const tile = document.createElement('div');
                    tile.innerText = grid[r][c];
                    
                    // Colors
                    const val = grid[r][c];
                    let colors = 'bg-yellow-200 text-gray-800';
                    if(val > 4) colors = 'bg-orange-400 text-white';
                    if(val > 64) colors = 'bg-yellow-500 text-white';
                    if(val > 512) colors = 'bg-yellow-600 text-white';
                    if(val > 2048) colors = 'bg-black text-white';
                    
                    // Font Size
                    let fontSize = 'text-4xl';
                    if(val > 100) fontSize = 'text-3xl';
                    if(val > 1000) fontSize = 'text-2xl';

                    tile.className = `tile ${colors} ${fontSize}`;
                    tile.style.width = `${tileSize}px`;
                    tile.style.height = `${tileSize}px`;
                    
                    // Position: gap + (index * (size + gap))
                    tile.style.top = `${gap + (r * (tileSize + gap))}px`;
                    tile.style.left = `${gap + (c * (tileSize + gap))}px`;
                    
                    tileContainer.appendChild(tile);
                }
            }
        }
    }

    function addRandomTile() {
        let empty = [];
        for(let r=0; r<GRID_SIZE; r++) {
            for(let c=0; c<GRID_SIZE; c++) {
                if(grid[r][c] === 0) empty.push({r,c});
            }
        }
        if(empty.length > 0) {
            let rnd = empty[Math.floor(Math.random() * empty.length)];
            grid[rnd.r][rnd.c] = Math.random() > 0.9 ? 4 : 2;
        }
    }

    // --- 3. Inputs (Keyboard & Touch) ---
    
    document.addEventListener('keydown', (e) => {
        if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
            e.preventDefault();
            handleInput(e.key.replace('Arrow','').toLowerCase());
        }
    });

    let touchX, touchY;
    document.addEventListener('touchstart', e => {
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
    }, {passive: false});

    document.addEventListener('touchend', e => {
        let dx = e.changedTouches[0].clientX - touchX;
        let dy = e.changedTouches[0].clientY - touchY;
        if(Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
            handleInput(dx > 0 ? 'right' : 'left');
        } else if(Math.abs(dy) > 30) {
            handleInput(dy > 0 ? 'down' : 'up');
        }
    }, {passive: false});

    function handleInput(dir) {
        let moved = false;
        // Logic specific to direction
        const rotate = (matrix) => matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
        const slide = (row) => {
            let arr = row.filter(v => v);
            for(let i=0; i<arr.length-1; i++) {
                if(arr[i] === arr[i+1]) {
                    arr[i] *= 2;
                    score += arr[i];
                    arr.splice(i+1, 1);
                }
            }
            while(arr.length < GRID_SIZE) arr.push(0);
            return arr;
        };

        let tempGrid = JSON.parse(JSON.stringify(grid));
        
        // Rotate grid to align with LEFT slide logic
        if(dir === 'right') tempGrid = tempGrid.map(r => r.reverse());
        if(dir === 'up') tempGrid = rotate(rotate(rotate(tempGrid)));
        if(dir === 'down') tempGrid = rotate(tempGrid);

        // Apply slide
        for(let i=0; i<GRID_SIZE; i++) {
            let newRow = slide(tempGrid[i]);
            tempGrid[i] = newRow;
        }

        // Rotate back
        if(dir === 'right') tempGrid = tempGrid.map(r => r.reverse());
        if(dir === 'up') tempGrid = rotate(tempGrid);
        if(dir === 'down') tempGrid = rotate(rotate(rotate(tempGrid)));

        // Check change
        if(JSON.stringify(grid) !== JSON.stringify(tempGrid)) {
            grid = tempGrid;
            addRandomTile();
            drawTiles();
            scoreEl.innerText = score;
            if(score > bestScore) {
                bestScore = score;
                localStorage.setItem('bestScore2048', bestScore);
                bestScoreEl.innerText = bestScore;
            }
            checkGameOver();
        }
    }

    function checkGameOver() {
        for(let r=0; r<GRID_SIZE; r++) {
            for(let c=0; c<GRID_SIZE; c++) {
                if(grid[r][c] === 0) return;
                if(r<3 && grid[r][c] === grid[r+1][c]) return;
                if(c<3 && grid[r][c] === grid[r][c+1]) return;
            }
        }
        gameOverOverlay.style.display = 'flex';
    }

    newGameBtn.addEventListener('click', initGame);
    tryAgainBtn.addEventListener('click', initGame);
    
    // Resize fix
    window.addEventListener('resize', drawTiles);
});