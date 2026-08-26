# 🎮 2048 Original

A browser-based implementation of the classic **2048 puzzle game**, built with **HTML, CSS, and JavaScript**. The game provides the familiar 4×4 tile-merging experience with keyboard and touch controls, score tracking, persistent best-score storage, and a responsive mobile-friendly interface.

## ✨ Key Features

- 🧩 Classic 2048 tile-merging gameplay
- 🎮 Keyboard controls using the arrow keys
- 📱 Touch/swipe controls for mobile devices
- 📊 Live score tracking
- 🏆 Persistent best-score tracking using LocalStorage
- 🆕 New Game functionality
- 🔄 Try Again functionality after game over
- 💀 Automatic game-over detection
- 📱 Responsive game interface
- 🎬 Animated splash screen and start menu
- 🎨 Tile styling that changes with tile values
- ⚡ Smooth tile transitions
- 🔄 Automatic board adjustment on window resize

## 🎯 How the Game Works

The game is played on a **4×4 grid**.

Two starting tiles are placed on the board when a new game begins. Each move slides the tiles in the selected direction and merges adjacent tiles with the same value.

When two matching tiles merge, their values are added together and the resulting value contributes to the player's score.

After every valid move, a new tile is randomly added to an empty position.

The objective is to combine tiles until reaching the **2048 tile**.

## 🎮 Controls

### Desktop

Use the keyboard arrow keys:

- **↑ Arrow Up** — Move tiles up
- **↓ Arrow Down** — Move tiles down
- **← Arrow Left** — Move tiles left
- **→ Arrow Right** — Move tiles right

### Mobile

Swipe across the game board:

- **Swipe up** — Move tiles up
- **Swipe down** — Move tiles down
- **Swipe left** — Move tiles left
- **Swipe right** — Move tiles right

The game detects swipe direction based on the movement of the touch gesture.

## 🏆 Scoring

The score increases whenever two matching tiles are merged.

For example:

- `2 + 2 = 4` → **+4 points**
- `4 + 4 = 8` → **+8 points**
- `8 + 8 = 16` → **+16 points**

The game keeps track of both:

- **Current Score**
- **Best Score**

The best score is stored in the browser using **LocalStorage**, so it can persist across page reloads in the same browser.

## 💀 Game Over

The game automatically checks whether any valid move remains.

The game ends when:

- The board contains no empty cells, and
- No horizontally or vertically adjacent tiles can be merged.

A **Game Over** overlay is then displayed with a **Try Again** option.

## 🆕 New Game & Try Again

### New Game

The **New Game** button resets the current board and score while keeping the stored best score.

### Try Again

After game over, **Try Again** starts a fresh game using the same game initialization logic.

## 🎨 User Interface

The game includes:

- Animated splash screen
- Start Game menu
- Current score display
- Best score display
- 4×4 game board
- New Game button
- Game Over overlay
- Try Again button
- Dynamic tile styling
- Smooth tile transitions

Tile colors and font sizes change depending on the tile value to keep higher-value tiles visually distinct.

## 🛠️ Technology Stack

- **HTML5**
- **CSS3**
- **JavaScript**
- **Tailwind CSS**
- **LocalStorage**
- **Google Fonts (Inter)**

Tailwind CSS is loaded through its CDN, while custom styling is provided through `styles.css`.

## 📁 Project Structure

    2048-Original/
    │
    ├── index.html       # Game interface and page structure
    ├── script.js        # Game state, controls, merging, scoring, and game logic
    ├── styles.css       # Custom styling and animations
    ├── README.md        # Project documentation
    └── .gitignore

## 🚀 How to Run

### Option 1 — Open Directly

Clone the repository:

    git clone https://github.com/SurajGoyal13/2048-Original.git
    cd 2048-Original

Then open `index.html` in any modern web browser.

### Option 2 — Run with a Local Server

You can also serve the project using Python's built-in HTTP server:

    python -m http.server

Then open the local address provided by the server in your browser.

## 📱 Browser Compatibility

The game is designed for modern browsers that support:

- HTML5
- JavaScript
- CSS
- LocalStorage
- Touch events

Both desktop keyboard controls and mobile touch controls are supported.

## 🎯 Project Objective

The goal of this project is to demonstrate the development of a complete interactive browser game using **vanilla JavaScript, HTML, and CSS**, with Tailwind CSS used for utility-based interface styling.

The project focuses on:

- Grid-based game-state management
- Tile movement and merging algorithms
- Keyboard and touch input handling
- Score calculation
- Persistent browser storage
- Game-over detection
- Dynamic DOM rendering
- Responsive interface development
- Interactive UI state management

## 🔮 Future Improvements

- 🎬 Add tile movement and merge animations
- 🏆 Add achievement and milestone tracking
- 📊 Add detailed gameplay statistics
- ↩️ Add an undo-move feature
- 🎨 Add additional themes
- 🔊 Add optional sound effects
- 🌙 Add dark mode
- 🏅 Add leaderboard functionality
- 📱 Further optimize the mobile interface

## ⚠️ Limitations

- The game currently stores the best score locally in the browser rather than using an online account or database.
- The project does not include an online leaderboard.
- The game does not currently provide an undo feature.
- Tailwind CSS is loaded through its CDN, so an internet connection is required for the Tailwind CDN resource when loading the page.
- Gameplay logic and UI are implemented as a lightweight client-side application without a backend.

## 👨‍💻 Author

**Suraj Goyal**

Computer Science Student · Python · AI/ML · Web Development · DSA

---

⭐ **If you enjoy the game, consider starring the repository.**
