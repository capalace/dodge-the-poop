class PoopGame {
    constructor() {
        this.gameScreen = document.getElementById('gameScreen');
        this.character = document.getElementById('character');
        this.scoreElement = document.getElementById('score');
        this.finalScoreElement = document.getElementById('finalScore');
        this.gameOverlay = document.getElementById('gameOverlay');
        this.gameOverOverlay = document.getElementById('gameOverOverlay');
        this.startButton = document.getElementById('startButton');
        this.restartButton = document.getElementById('restartButton');

        this.characterPosition = 0;
        this.score = 0;
        this.gameRunning = false;
        this.poops = [];
        this.gameSpeed = GAME_CONFIG.POOP_INITIAL_SPEED;
        this.spawnInterval = GAME_CONFIG.POOP_SPAWN_INTERVAL;
        this.difficultyTimer = null;
        this.spawnTimer = null;
        this.animationFrame = null;

        this.keys = {
            left: false,
            right: false
        };

        this.lastDirection = 'right';
        this.currentSpeed = 0;
        this.movingDirection = 'none'; // 'left', 'right', 'none'

        this.init();
    }

    init() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.restartButton.addEventListener('click', () => this.restartGame());

        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        document.addEventListener('keydown', (e) => this.handleSpaceBar(e));

        // Bind touch events to document to allow touch outside game screen
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        document.addEventListener('touchcancel', (e) => this.handleTouchEnd(e), { passive: false });

        this.updateCharacterPosition();
    }

    handleTouchStart(e) {
        // Allow touches on buttons
        if (e.target.classList.contains('game-button')) {
            return;
        }

        if (!this.gameRunning) return;

        e.preventDefault();
        const touch = e.touches[0];
        const screenCenterX = window.innerWidth / 2;

        if (touch.clientX < screenCenterX) {
            this.keys.left = true;
            this.keys.right = false;
        } else {
            this.keys.right = true;
            this.keys.left = false;
        }
    }

    handleTouchMove(e) {
        // Allow touches on buttons
        if (e.target.classList.contains('game-button')) {
            return;
        }

        if (!this.gameRunning) return;

        e.preventDefault();
        const touch = e.touches[0];
        const screenCenterX = window.innerWidth / 2;

        if (touch.clientX < screenCenterX) {
            this.keys.left = true;
            this.keys.right = false;
        } else {
            this.keys.right = true;
            this.keys.left = false;
        }
    }

    handleTouchEnd(e) {
        // Allow touches on buttons
        if (e.target.classList.contains('game-button')) {
            return;
        }

        e.preventDefault();
        this.keys.left = false;
        this.keys.right = false;
    }

    handleKeyDown(e) {
        if (!this.gameRunning) return;

        if (e.key === 'ArrowLeft') {
            this.keys.left = true;
            e.preventDefault();
        } else if (e.key === 'ArrowRight') {
            this.keys.right = true;
            e.preventDefault();
        }
    }

    handleKeyUp(e) {
        if (e.key === 'ArrowLeft') {
            this.keys.left = false;
        } else if (e.key === 'ArrowRight') {
            this.keys.right = false;
        }
    }

    handleSpaceBar(e) {
        if (e.key === ' ' || e.code === 'Space') {
            // Start button visible (game not started)
            if (!this.gameOverlay.classList.contains('hidden')) {
                e.preventDefault();
                this.startGame();
            }
            // Restart button visible (game over)
            else if (!this.gameOverOverlay.classList.contains('hidden')) {
                e.preventDefault();
                this.restartGame();
            }
        }
    }

    updateCharacterPosition() {
        const screenWidth = this.gameScreen.offsetWidth;
        const characterWidth = this.character.offsetWidth;
        const maxSpeed = GAME_CONFIG.CHARACTER_MAX_SPEED;
        const acceleration = GAME_CONFIG.CHARACTER_ACCELERATION;
        const deceleration = GAME_CONFIG.CHARACTER_DECELERATION;
        const friction = GAME_CONFIG.CHARACTER_FRICTION;

        let targetDirection = 'none';

        // Check input direction
        if (this.keys.left && !this.keys.right) {
            targetDirection = 'left';
        } else if (this.keys.right && !this.keys.left) {
            targetDirection = 'right';
        }

        // Acceleration/deceleration logic
        if (targetDirection === 'none') {
            // When key is released - decelerate with friction
            this.currentSpeed = Math.max(0, this.currentSpeed - friction);
            if (this.currentSpeed === 0) {
                this.movingDirection = 'none';
            }
        } else if (targetDirection === this.movingDirection) {
            // Continue moving in same direction - accelerate
            this.currentSpeed = Math.min(maxSpeed, this.currentSpeed + acceleration);
        } else if (this.movingDirection === 'none') {
            // Start from stopped state - accelerate
            this.movingDirection = targetDirection;
            this.currentSpeed = acceleration;

            // Change direction
            if (this.lastDirection !== targetDirection) {
                this.lastDirection = targetDirection;
                if (targetDirection === 'left') {
                    this.character.classList.add('flip');
                } else {
                    this.character.classList.remove('flip');
                }
            }
        } else {
            // Opposite direction input - decelerate quickly
            this.currentSpeed = Math.max(0, this.currentSpeed - deceleration);

            // Change direction when speed is nearly 0
            if (this.currentSpeed < 0.5) {
                this.currentSpeed = 0;
                this.movingDirection = targetDirection;

                // Change direction
                if (this.lastDirection !== targetDirection) {
                    this.lastDirection = targetDirection;
                    if (targetDirection === 'left') {
                        this.character.classList.add('flip');
                    } else {
                        this.character.classList.remove('flip');
                    }
                }
            }
        }

        // Actual movement
        if (this.currentSpeed > 0) {
            if (this.movingDirection === 'left') {
                this.characterPosition = Math.max(0, this.characterPosition - this.currentSpeed);
            } else if (this.movingDirection === 'right') {
                this.characterPosition = Math.min(
                    screenWidth - characterWidth,
                    this.characterPosition + this.currentSpeed
                );
            }
        }

        this.character.style.left = this.characterPosition + 'px';

        if (this.gameRunning) {
            requestAnimationFrame(() => this.updateCharacterPosition());
        }
    }

    startGame() {
        this.gameOverlay.classList.add('hidden');
        this.gameRunning = true;
        this.score = 0;
        this.gameSpeed = GAME_CONFIG.POOP_INITIAL_SPEED;
        this.spawnInterval = GAME_CONFIG.POOP_SPAWN_INTERVAL;
        this.scoreElement.textContent = this.score;

        const screenWidth = this.gameScreen.offsetWidth;
        const characterWidth = this.character.offsetWidth;
        this.characterPosition = (screenWidth - characterWidth) / 2;
        this.character.style.left = this.characterPosition + 'px';

        // Reset speed and direction
        this.currentSpeed = 0;
        this.movingDirection = 'none';

        this.poops = [];
        this.updateCharacterPosition();
        this.spawnPoop();
        this.gameLoop();
        this.increaseDifficulty();
    }

    restartGame() {
        this.gameOverOverlay.classList.add('hidden');

        const existingPoops = document.querySelectorAll('.poop');
        existingPoops.forEach(poop => poop.remove());

        this.poops = [];

        if (this.spawnTimer) {
            clearTimeout(this.spawnTimer);
        }
        if (this.difficultyTimer) {
            clearInterval(this.difficultyTimer);
        }

        this.startGame();
    }

    spawnPoop() {
        if (!this.gameRunning) return;

        const screenWidth = this.gameScreen.offsetWidth;
        const poopWidth = 50;

        // Randomly determine number of poops to spawn
        const minCount = GAME_CONFIG.POOP_SPAWN_COUNT_MIN;
        const maxCount = GAME_CONFIG.POOP_SPAWN_COUNT_MAX;
        const spawnCount = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;

        // Spawn the specified number of poops
        for (let i = 0; i < spawnCount; i++) {
            const poop = document.createElement('div');
            poop.classList.add('poop');

            const randomX = Math.random() * (screenWidth - poopWidth);

            // Add random variance to individual speed
            const variance = GAME_CONFIG.POOP_SPEED_VARIANCE;
            const speedMultiplier = 1 + (Math.random() * 2 - 1) * variance; // 1 ± variance
            const poopSpeed = this.gameSpeed * speedMultiplier;

            poop.style.left = randomX + 'px';
            poop.style.top = '-50px';

            this.gameScreen.appendChild(poop);
            this.poops.push({
                element: poop,
                x: randomX,
                y: -50,
                speed: poopSpeed
            });
        }

        this.spawnTimer = setTimeout(() => this.spawnPoop(), this.spawnInterval);
    }

    gameLoop() {
        if (!this.gameRunning) return;

        this.poops = this.poops.filter((poop) => {
            poop.y += poop.speed;
            poop.element.style.top = poop.y + 'px';

            if (this.checkCollision(poop)) {
                this.gameOver();
                return false;
            }

            const screenHeight = this.gameScreen.offsetHeight;
            const floorLine = screenHeight - 40; // Floor line position
            const poopHeight = poop.element.offsetHeight;
            const poopBottom = poop.y + poopHeight;

            if (poopBottom >= floorLine) {
                this.score++;
                this.scoreElement.textContent = this.score;

                poop.element.classList.add('splat');
                setTimeout(() => {
                    if (poop.element.parentNode) {
                        poop.element.remove();
                    }
                }, 300);
                return false;
            }

            return poop.y < screenHeight;
        });

        this.animationFrame = requestAnimationFrame(() => this.gameLoop());
    }

    checkCollision(poop) {
        const characterRect = this.character.getBoundingClientRect();
        const poopRect = poop.element.getBoundingClientRect();

        const buffer = 20;

        return !(
            characterRect.right - buffer < poopRect.left ||
            characterRect.left + buffer > poopRect.right ||
            characterRect.bottom - buffer < poopRect.top ||
            characterRect.top + buffer > poopRect.bottom
        );
    }

    increaseDifficulty() {
        this.difficultyTimer = setInterval(() => {
            if (this.gameSpeed < GAME_CONFIG.POOP_MAX_SPEED) {
                this.gameSpeed += GAME_CONFIG.SPEED_INCREMENT;
            }

            if (this.spawnInterval > GAME_CONFIG.POOP_MIN_SPAWN_INTERVAL) {
                this.spawnInterval -= GAME_CONFIG.SPAWN_INTERVAL_DECREMENT;
            }
        }, GAME_CONFIG.DIFFICULTY_INCREASE_INTERVAL);
    }

    gameOver() {
        this.gameRunning = false;
        this.finalScoreElement.textContent = this.score;
        this.gameOverOverlay.classList.remove('hidden');

        if (this.spawnTimer) {
            clearTimeout(this.spawnTimer);
        }
        if (this.difficultyTimer) {
            clearInterval(this.difficultyTimer);
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

const game = new PoopGame();
