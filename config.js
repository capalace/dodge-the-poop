// ============================================
// Poop Dodging Game Configuration File
// ============================================
// You can adjust the game difficulty and speed in this file.
// After changing the values, save and refresh the game.

const GAME_CONFIG = {
    // ========================================
    // Character Settings
    // ========================================
    CHARACTER_MAX_SPEED: 7,
    // Character maximum movement speed (pixels/frame)
    // Recommended: 6~12
    // Higher values make the character move faster.

    CHARACTER_ACCELERATION: 0.3,
    // Character acceleration (pixels/frame²)
    // Recommended: 0.3~1.0
    // Higher values reach maximum speed faster.

    CHARACTER_DECELERATION: 1.2,
    // Deceleration when changing direction (pixels/frame²)
    // Recommended: 0.8~2.0
    // Higher values decelerate faster when changing direction.

    CHARACTER_FRICTION: 0.3,
    // Friction when key is released (pixels/frame²)
    // Recommended: 0.2~0.8
    // Higher values stop faster.

    // ========================================
    // Poop Basic Settings
    // ========================================
    POOP_INITIAL_SPEED: 4,
    // Poop falling speed at game start (pixels/frame)
    // Recommended: 1~5
    // Higher values make the game start harder.

    POOP_MAX_SPEED: 12,
    // Maximum poop falling speed (pixels/frame)
    // Recommended: 5~15
    // The speed increases to this value as the game progresses.

    POOP_SPAWN_INTERVAL: 700,
    // Initial poop spawn interval (milliseconds)
    // Recommended: 1000~2000
    // Lower values spawn poops more frequently.
    // 1000 = 1 second

    POOP_MIN_SPAWN_INTERVAL: 300,
    // Minimum poop spawn interval (milliseconds)
    // Recommended: 300~800
    // The interval decreases to this value as the game progresses.

    POOP_SPAWN_COUNT_MIN: 1,
    // Minimum number of poops spawned at once
    // Recommended: 1~2
    // If set to 1, only 1 poop drops at a time.

    POOP_SPAWN_COUNT_MAX: 2,
    // Maximum number of poops spawned at once
    // Recommended: 1~3
    // Higher values can drop more poops simultaneously.

    POOP_SPEED_VARIANCE: 0.3,
    // Poop speed variance (0.0~1.0)
    // Recommended: 0.2~0.5
    // 0.3 means random speed within ±30% of base speed
    // 0 means all poops fall at the same speed.

    // ========================================
    // Difficulty Increase Settings
    // ========================================
    DIFFICULTY_INCREASE_INTERVAL: 4000,
    // Difficulty increase interval (milliseconds)
    // Recommended: 3000~10000
    // Poops fall faster and more frequently at this interval.
    // 5000 = difficulty increases every 5 seconds

    SPEED_INCREMENT: 0.5,
    // Poop speed increase per difficulty increment (pixels/frame)
    // Recommended: 0.1~0.5
    // Higher values make the game harder faster.

    SPAWN_INTERVAL_DECREMENT: 120
    // Spawn interval decrease per difficulty increment (milliseconds)
    // Recommended: 50~200
    // Higher values make poops drop more frequently faster.
};

// ============================================
// Difficulty Presets (Reference)
// ============================================
// Copy the values below and paste them into the settings above.

// Easy Difficulty:
// CHARACTER_MAX_SPEED: 10
// CHARACTER_ACCELERATION: 0.8
// CHARACTER_DECELERATION: 1.5
// CHARACTER_FRICTION: 0.5
// POOP_INITIAL_SPEED: 2
// POOP_MAX_SPEED: 6
// POOP_SPAWN_INTERVAL: 1500
// POOP_MIN_SPAWN_INTERVAL: 600
// POOP_SPAWN_COUNT_MIN: 1
// POOP_SPAWN_COUNT_MAX: 1
// POOP_SPEED_VARIANCE: 0.2
// DIFFICULTY_INCREASE_INTERVAL: 6000

// Normal Difficulty (Default):
// CHARACTER_MAX_SPEED: 8
// CHARACTER_ACCELERATION: 0.5
// CHARACTER_DECELERATION: 1.2
// CHARACTER_FRICTION: 0.3
// POOP_INITIAL_SPEED: 4
// POOP_MAX_SPEED: 12
// POOP_SPAWN_INTERVAL: 700
// POOP_MIN_SPAWN_INTERVAL: 300
// POOP_SPAWN_COUNT_MIN: 1
// POOP_SPAWN_COUNT_MAX: 2
// POOP_SPEED_VARIANCE: 0.3
// DIFFICULTY_INCREASE_INTERVAL: 4000

// Hard Difficulty:
// CHARACTER_MAX_SPEED: 7
// CHARACTER_ACCELERATION: 0.4
// CHARACTER_DECELERATION: 1.0
// CHARACTER_FRICTION: 0.25
// POOP_INITIAL_SPEED: 5
// POOP_MAX_SPEED: 15
// POOP_SPAWN_INTERVAL: 600
// POOP_MIN_SPAWN_INTERVAL: 250
// POOP_SPAWN_COUNT_MIN: 1
// POOP_SPAWN_COUNT_MAX: 2
// POOP_SPEED_VARIANCE: 0.4
// DIFFICULTY_INCREASE_INTERVAL: 3000

// Very Hard Difficulty:
// CHARACTER_MAX_SPEED: 6
// CHARACTER_ACCELERATION: 0.3
// CHARACTER_DECELERATION: 0.8
// CHARACTER_FRICTION: 0.2
// POOP_INITIAL_SPEED: 6
// POOP_MAX_SPEED: 18
// POOP_SPAWN_INTERVAL: 500
// POOP_MIN_SPAWN_INTERVAL: 200
// POOP_SPAWN_COUNT_MIN: 1
// POOP_SPAWN_COUNT_MAX: 3
// POOP_SPEED_VARIANCE: 0.5
// DIFFICULTY_INCREASE_INTERVAL: 2000
