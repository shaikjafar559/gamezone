// =========================================================
//  ANGRY BIRDS ARCADE - MakeCode Arcade
//  Slingshot Destruction Game
// =========================================================

// Custom sprite kinds
namespace SpriteKind {
    export const Slingshot = SpriteKind.create()
    export const Bird = SpriteKind.create()
    export const Pig = SpriteKind.create()
    export const Block = SpriteKind.create()
    export const TNT = SpriteKind.create()
}

// --- Images & Pixel Art ---
const imgRedBird = img`
    . . 2 2 2 . . .
    . 2 2 2 2 2 . .
    2 2 f 1 2 2 f .
    2 2 f 1 5 5 f .
    2 2 2 5 5 2 . .
    2 d d d d 2 . .
    . 2 d d 2 . . .
    . . . . . . . .
`

const imgYellowBird = img`
    . . . 5 . . . .
    . . 5 5 5 . . .
    . 5 5 f 1 4 . .
    5 5 5 f 1 4 4 .
    5 5 5 5 5 5 . .
    . 5 1 1 5 . . .
    . . . . . . . .
    . . . . . . . .
`

const imgMinionPig = img`
    . . 7 7 7 7 . .
    . 7 7 7 7 7 7 .
    7 7 1 f 7 1 f 7
    7 7 1 f 7 1 f 7
    7 7 6 6 6 6 7 7
    7 7 6 f 6 f 7 7
    . 7 6 6 6 6 7 .
    . . 7 7 7 7 . .
`

const imgKingPig = img`
    . . 5 . . 5 . . 5 .
    . 5 5 5 5 5 5 5 5 .
    . 7 7 7 7 7 7 7 7 .
    7 7 7 7 7 7 7 7 7 7
    7 7 1 f 7 7 1 f 7 7
    7 7 6 6 6 6 6 6 7 7
    7 7 6 f 6 6 f 6 7 7
    . 7 6 6 6 6 6 6 7 .
    . . 7 7 7 7 7 7 . .
    . . . . . . . . . .
`

const imgSlingshot = img`
    e e . . . . e e
    e e . . . . e e
    . e e . . e e .
    . . e e e e . .
    . . . e e . . .
    . . . e e . . .
    . . . e e . . .
    . . . e e . . .
    . . . e e . . .
    . . . e e . . .
    . . . e e . . .
    . . . e e . . .
    . . . e e . . .
    . . . e e . . .
    . . e e e e . .
    e e e e e e e e
`

const imgWoodPillar = img`
    e d d e
    e d d e
    e d d e
    e d d e
    e d d e
    e d d e
    e d d e
    e d d e
    e d d e
    e d d e
    e d d e
    e d d e
    e d d e
    e d d e
    e d d e
    e d d e
`

const imgWoodBeam = img`
    e e e e e e e e e e e e e e e e
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    e e e e e e e e e e e e e e e e
`

const imgWoodCrate = img`
    e e e e e e e e
    e d d d d d d e
    e d e d d e d e
    e d d e e d d e
    e d d e e d d e
    e d e d d e d e
    e d d d d d d e
    e e e e e e e e
`

const imgStonePillar = img`
    f b b f
    f c c f
    f b b f
    f c c f
    f b b f
    f c c f
    f b b f
    f c c f
    f b b f
    f c c f
    f b b f
    f c c f
    f b b f
    f c c f
    f b b f
    f c c f
`

const imgTNT = img`
    2 2 2 2 2 2 2 2
    2 4 4 4 4 4 4 2
    2 4 f f f f 4 2
    2 4 1 f f 1 4 2
    2 4 f 1 1 f 4 2
    2 4 f f f f 4 2
    2 4 4 4 4 4 4 2
    2 2 2 2 2 2 2 2
`

const imgReserveBird = img`
    . 2 2 . .
    2 2 1 f .
    2 2 5 5 f
    2 d d 2 .
    . 2 2 . .
`

// --- Constants ---
const SLING_X = 28
const SLING_Y = 88
const GROUND_Y = 104
const GRAVITY = 190
const TOTAL_LEVELS = 4

// --- Game States ---
const STATE_AIMING = 0
const STATE_FLYING = 1
const STATE_SETTLING = 2
const STATE_VICTORY = 3

let gameState = STATE_AIMING
let currentLevel = 1
let birdsRemaining = 3
let currentBirdType = 0 // 0: Red, 1: Chuck

let pullX = 14
let pullY = 10
let hasUsedSpecial = false
let shotStartTime = 0
let settleTimer = 0

// Sprites
let slingshotSprite: Sprite = null
let currentBird: Sprite = null

// Tracking lists for level elements
let activeBlocks: Sprite[] = []
let blockHp: number[] = []
let blockMaxHp: number[] = []

let activePigs: Sprite[] = []
let pigHp: number[] = []

let activeTNTs: Sprite[] = []

// --- Background Renderer ---
function renderSceneBackground() {
    let bg = scene.backgroundImage()
    bg.fill(9) // Sky blue

    // Sun
    bg.fillCircle(145, 18, 10, 5)

    // Clouds
    bg.fillCircle(40, 22, 10, 1)
    bg.fillCircle(52, 19, 13, 1)
    bg.fillCircle(65, 22, 9, 1)
    bg.fillRect(36, 22, 34, 7, 1)

    bg.fillCircle(105, 30, 8, 1)
    bg.fillCircle(115, 28, 11, 1)
    bg.fillCircle(125, 30, 8, 1)
    bg.fillRect(101, 30, 28, 6, 1)

    // Distant green hills
    bg.fillCircle(20, 135, 45, 6)
    bg.fillCircle(135, 140, 55, 6)

    // Ground: grass surface + dirt
    bg.fillRect(0, GROUND_Y, 160, 2, 7) // Grass green line
    bg.fillRect(0, GROUND_Y + 2, 160, 14, 14) // Dirt brown

    // HUD Header Banner
    bg.fillRect(0, 0, 160, 10, 8) // Dark blue top bar
    bg.print("SCORE", 4, 1, 1)
    bg.print("LVL " + ("" + currentLevel), 72, 1, 5)
    bg.print("BIRDS", 120, 1, 1)
}

function updateHUD() {
    let bg = scene.backgroundImage()
    // Clear and redraw score
    bg.fillRect(32, 1, 35, 8, 8)
    bg.print("" + info.score(), 33, 1, 1)

    // Redraw remaining bird count
    bg.fillRect(150, 1, 9, 8, 8)
    bg.print("" + (birdsRemaining + 1), 150, 1, 5)

    // Draw bird icons on bottom left ground
    bg.fillRect(2, 107, 30, 10, 14)
    for (let i = 0; i < birdsRemaining; i++) {
        bg.drawImage(imgReserveBird, 4 + i * 8, 108)
    }
}

// --- Spawn Helpers ---
function createBlock(imgData: Image, x: number, y: number, hp: number) {
    let b = sprites.create(imgData, SpriteKind.Block)
    b.x = x
    b.y = y
    activeBlocks.push(b)
    blockHp.push(hp)
    blockMaxHp.push(hp)
    return b
}

function createPig(imgData: Image, x: number, y: number, hp: number) {
    let p = sprites.create(imgData, SpriteKind.Pig)
    p.x = x
    p.y = y
    activePigs.push(p)
    pigHp.push(hp)
    return p
}

function createTNT(x: number, y: number) {
    let t = sprites.create(imgTNT, SpriteKind.TNT)
    t.x = x
    t.y = y
    activeTNTs.push(t)
    return t
}

// --- Clear Level Elements ---
function clearLevel() {
    if (currentBird) {
        currentBird.destroy()
        currentBird = null
    }
    for (let b of activeBlocks) {
        b.destroy()
    }
    activeBlocks = []
    blockHp = []
    blockMaxHp = []

    for (let p of activePigs) {
        p.destroy()
    }
    activePigs = []
    pigHp = []

    for (let t of activeTNTs) {
        t.destroy()
    }
    activeTNTs = []
}

// --- Load Levels ---
function loadLevel(levelNum: number) {
    clearLevel()
    currentLevel = levelNum
    renderSceneBackground()

    // Slingshot sprite
    if (!slingshotSprite) {
        slingshotSprite = sprites.create(imgSlingshot, SpriteKind.Slingshot)
        slingshotSprite.x = SLING_X
        slingshotSprite.y = SLING_Y + 8
        slingshotSprite.z = 2
    }

    if (levelNum == 1) {
        // LEVEL 1: "First Flight"
        // Target: 2 Wood pillars, 1 beam roof, 2 pigs
        birdsRemaining = 2
        createBlock(imgWoodPillar, 114, 96, 2)
        createBlock(imgWoodPillar, 136, 96, 2)
        createBlock(imgWoodBeam, 125, 86, 2)
        createPig(imgMinionPig, 125, 100, 1)
        createPig(imgMinionPig, 125, 80, 1)

    } else if (levelNum == 2) {
        // LEVEL 2: "Double Trouble"
        // Two towers with pigs inside and between
        birdsRemaining = 2
        // Left tower (stone)
        createBlock(imgStonePillar, 104, 96, 3)
        createBlock(imgStonePillar, 120, 96, 3)
        createBlock(imgWoodBeam, 112, 86, 2)
        createPig(imgMinionPig, 112, 100, 1)

        // Right tower (wood)
        createBlock(imgWoodPillar, 138, 96, 2)
        createBlock(imgWoodPillar, 152, 96, 2)
        createBlock(imgWoodBeam, 145, 86, 2)
        createPig(imgMinionPig, 145, 80, 1)

        // Middle pig
        createPig(imgMinionPig, 129, 100, 1)

    } else if (levelNum == 3) {
        // LEVEL 3: "TNT Blastzone"
        // TNT crates supporting pillars and pigs
        birdsRemaining = 3
        createTNT(114, 100)
        createBlock(imgWoodCrate, 138, 100, 2)
        createBlock(imgStonePillar, 114, 88, 3)
        createBlock(imgStonePillar, 138, 88, 3)
        createBlock(imgWoodBeam, 126, 78, 2)
        createTNT(126, 72)
        createPig(imgMinionPig, 126, 63, 1)
        createPig(imgMinionPig, 148, 100, 1)

    } else if (levelNum == 4) {
        // LEVEL 4: "Piggy Citadel & King Pig"
        // Fortified castle with King Pig on high throne
        birdsRemaining = 3
        // Floor 1
        createBlock(imgStonePillar, 106, 96, 3)
        createTNT(126, 100)
        createBlock(imgStonePillar, 146, 96, 3)
        createBlock(imgWoodBeam, 116, 86, 2)
        createBlock(imgWoodBeam, 136, 86, 2)
        createPig(imgMinionPig, 116, 100, 1)
        createPig(imgMinionPig, 136, 100, 1)

        // Floor 2
        createBlock(imgWoodPillar, 118, 76, 2)
        createBlock(imgWoodPillar, 134, 76, 2)
        createBlock(imgWoodBeam, 126, 66, 2)

        // King Pig on throne!
        createPig(imgKingPig, 126, 58, 2)
    }

    pullX = 14
    pullY = 10
    loadBirdInSling()
    updateHUD()
}

function loadBirdInSling() {
    if (currentBird) {
        currentBird.destroy()
    }
    // Alternate between Red bird and Chuck (Yellow bird)
    currentBirdType = (birdsRemaining % 2 == 1) ? 1 : 0
    let birdImg = currentBirdType == 1 ? imgYellowBird : imgRedBird
    currentBird = sprites.create(birdImg, SpriteKind.Bird)
    currentBird.z = 5
    currentBird.x = SLING_X - pullX
    currentBird.y = SLING_Y + pullY
    currentBird.vx = 0
    currentBird.vy = 0
    currentBird.ax = 0
    currentBird.ay = 0

    hasUsedSpecial = false
    gameState = STATE_AIMING
    updateHUD()
}

// --- Rubber Band & Trajectory Visualizer ---
function drawSlingAimVisuals() {
    let bg = scene.backgroundImage()
    // Clear slingshot & trajectory region: x=0..72, y=60..103
    bg.fillRect(0, 60, 72, 44, 9)

    // Redraw slingshot prongs (since region was erased)
    bg.fillRect(SLING_X - 4, SLING_Y - 4, 2, 8, 14)
    bg.fillRect(SLING_X + 2, SLING_Y - 4, 2, 8, 14)
    bg.fillRect(SLING_X - 2, SLING_Y + 4, 4, 8, 14)

    if (gameState == STATE_AIMING && currentBird) {
        // Draw rubber bands connecting prongs to bird
        bg.drawLine(SLING_X - 4, SLING_Y - 2, currentBird.x, currentBird.y, 15)
        bg.drawLine(SLING_X + 3, SLING_Y - 2, currentBird.x, currentBird.y, 15)

        // Draw trajectory prediction dots
        let simVx = pullX * 7.5
        let simVy = -pullY * 7.5
        for (let step = 1; step <= 5; step++) {
            let t = step * 0.12
            let dotX = currentBird.x + simVx * t
            let dotY = currentBird.y + simVy * t + 0.5 * GRAVITY * t * t
            if (dotX < 155 && dotY < GROUND_Y && dotY > 20) {
                bg.setPixel(dotX, dotY, 1)
                bg.setPixel(dotX + 1, dotY, 1)
            }
        }
    }
}

// --- TNT Explosion Handler ---
function triggerTNT(tnt: Sprite) {
    scene.cameraShake(5, 400)
    music.playTone(130, 300)
    effects.fire.startScreenEffect(300)

    let tx = tnt.x
    let ty = tnt.y
    tnt.destroy(effects.fire, 200)

    // Remove from active TNT list
    let tntIdx = activeTNTs.indexOf(tnt)
    if (tntIdx >= 0) {
        activeTNTs.removeAt(tntIdx)
    }

    // Blast all nearby blocks
    for (let i = activeBlocks.length - 1; i >= 0; i--) {
        let b = activeBlocks[i]
        let dx = b.x - tx
        let dy = b.y - ty
        let dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 46) {
            blockHp[i] -= 2
            b.vx += (dx / (dist + 1)) * 120
            b.vy -= (46 - dist) * 2.5
            b.ay = GRAVITY
            if (blockHp[i] <= 0) {
                b.destroy(effects.disintegrate, 200)
                activeBlocks.removeAt(i)
                blockHp.removeAt(i)
                blockMaxHp.removeAt(i)
                info.changeScoreBy(100)
            }
        }
    }

    // Blast all nearby pigs
    for (let j = activePigs.length - 1; j >= 0; j--) {
        let p = activePigs[j]
        let dx = p.x - tx
        let dy = p.y - ty
        let dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 46) {
            pigHp[j] -= 2
            if (pigHp[j] <= 0) {
                p.destroy(effects.fire, 350)
                activePigs.removeAt(j)
                pigHp.removeAt(j)
                info.changeScoreBy(500)
            }
        }
    }
    updateHUD()
}

// --- Overlap Handlers ---

// Bird hits Block
sprites.onOverlap(SpriteKind.Bird, SpriteKind.Block, function (bird: Sprite, block: Sprite) {
    let speed = Math.sqrt(bird.vx * bird.vx + bird.vy * bird.vy)
    if (speed > 15) {
        let idx = activeBlocks.indexOf(block)
        if (idx >= 0) {
            blockHp[idx] -= (speed > 70) ? 2 : 1
            // Transfer velocity to block
            block.vx = bird.vx * 0.45
            block.vy = bird.vy * 0.3 - 20
            block.ay = GRAVITY

            // Deflect bird
            bird.vx = bird.vx * 0.3
            bird.vy = bird.vy * 0.25 - 15
            music.knock.play()

            if (blockHp[idx] <= 0) {
                block.destroy(effects.disintegrate, 200)
                activeBlocks.removeAt(idx)
                blockHp.removeAt(idx)
                blockMaxHp.removeAt(idx)
                info.changeScoreBy(100)
                updateHUD()
            }
        }
    }
})

// Bird hits Pig
sprites.onOverlap(SpriteKind.Bird, SpriteKind.Pig, function (bird: Sprite, pig: Sprite) {
    let idx = activePigs.indexOf(pig)
    if (idx >= 0) {
        pigHp[idx] -= 2
        if (pigHp[idx] <= 0) {
            pig.destroy(effects.confetti, 400)
            activePigs.removeAt(idx)
            pigHp.removeAt(idx)
            music.baDing.play()
            info.changeScoreBy(500)
            updateHUD()
        }
    }
})

// Bird hits TNT
sprites.onOverlap(SpriteKind.Bird, SpriteKind.TNT, function (bird: Sprite, tnt: Sprite) {
    triggerTNT(tnt)
})

// Moving Block hits Pig
sprites.onOverlap(SpriteKind.Block, SpriteKind.Pig, function (block: Sprite, pig: Sprite) {
    if (Math.abs(block.vx) > 12 || block.vy > 12) {
        let idx = activePigs.indexOf(pig)
        if (idx >= 0) {
            pigHp[idx] -= 1
            if (pigHp[idx] <= 0) {
                pig.destroy(effects.confetti, 400)
                activePigs.removeAt(idx)
                pigHp.removeAt(idx)
                music.baDing.play()
                info.changeScoreBy(500)
                updateHUD()
            }
        }
    }
})

// Moving Block hits TNT
sprites.onOverlap(SpriteKind.Block, SpriteKind.TNT, function (block: Sprite, tnt: Sprite) {
    if (Math.abs(block.vx) > 12 || block.vy > 12) {
        triggerTNT(tnt)
    }
})

// --- Controller Button (A) Event ---
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameState == STATE_AIMING && currentBird) {
        // Launch Bird!
        gameState = STATE_FLYING
        currentBird.vx = pullX * 7.5
        currentBird.vy = -pullY * 7.5
        currentBird.ay = GRAVITY
        shotStartTime = game.runtime()

        // Slingshot snap sound
        music.playTone(330, 50)
        music.playTone(660, 70)

        // Clear rubber bands from background
        drawSlingAimVisuals()

    } else if (gameState == STATE_FLYING && currentBird && !hasUsedSpecial) {
        // Mid-air Special Ability!
        hasUsedSpecial = true
        if (currentBirdType == 1) {
            // Chuck Rocket Boost
            currentBird.vx = currentBird.vx + 95
            currentBird.vy = -12
            music.powerUp.play()
            effects.fire.startScreenEffect(150)
        } else {
            // Red Bird Dive Bomb
            currentBird.vx = currentBird.vx * 1.35 + 20
            currentBird.vy = currentBird.vy + 75
            music.powerUp.play()
            effects.fire.startScreenEffect(150)
            scene.cameraShake(2, 120)
        }
    }
})

// --- Main Update Game Loop ---
game.onUpdate(function () {
    // 1. AIMING STATE CONTROLS
    if (gameState == STATE_AIMING && currentBird) {
        if (controller.left.isPressed()) {
            pullX = Math.min(26, pullX + 0.6)
        }
        if (controller.right.isPressed()) {
            pullX = Math.max(6, pullX - 0.6)
        }
        if (controller.up.isPressed()) {
            pullY = Math.min(22, pullY + 0.6)
        }
        if (controller.down.isPressed()) {
            pullY = Math.max(-8, pullY - 0.6)
        }

        currentBird.x = SLING_X - pullX
        currentBird.y = SLING_Y + pullY
        drawSlingAimVisuals()
    }

    // 2. FLYING BIRD PHYSICS
    if (gameState == STATE_FLYING && currentBird) {
        // Ground bounce & friction
        if (currentBird.y >= GROUND_Y - 4) {
            currentBird.y = GROUND_Y - 4
            currentBird.vy = -currentBird.vy * 0.35
            currentBird.vx = currentBird.vx * 0.65
            if (Math.abs(currentBird.vx) < 7 && Math.abs(currentBird.vy) < 10) {
                currentBird.vx = 0
                currentBird.vy = 0
                currentBird.ay = 0
            }
        }

        // Screen boundary limits
        if (currentBird.x > 156) {
            currentBird.x = 156
            currentBird.vx = -currentBird.vx * 0.4
        }
        if (currentBird.x < 0) {
            currentBird.x = 0
            currentBird.vx = 0
        }

        // Check if bird has stopped or timed out
        let flightTime = game.runtime() - shotStartTime
        let hasStopped = (currentBird.vx == 0 && currentBird.vy == 0)
        if (flightTime > 4000 || (hasStopped && flightTime > 600)) {
            gameState = STATE_SETTLING
            settleTimer = game.runtime() + 1200 // 1.2s to settle falling blocks/pigs
        }
    }

    // 3. BLOCK PHYSICS & CRUSHING PIGS
    for (let i = 0; i < activeBlocks.length; i++) {
        let b = activeBlocks[i]
        if (b.ay > 0) {
            let halfH = b.height / 2
            if (b.y >= GROUND_Y - halfH) {
                b.y = GROUND_Y - halfH
                b.vy = 0
                b.vx = b.vx * 0.7
                if (Math.abs(b.vx) < 4) {
                    b.vx = 0
                    b.ay = 0
                }
            }

            // Check if falling block crushes any pigs
            for (let j = activePigs.length - 1; j >= 0; j--) {
                let p = activePigs[j]
                if (Math.abs(b.x - p.x) < 8 && Math.abs(b.y - p.y) < 10 && (b.vy > 12 || Math.abs(b.vx) > 15)) {
                    pigHp[j] -= 1
                    if (pigHp[j] <= 0) {
                        p.destroy(effects.confetti, 350)
                        activePigs.removeAt(j)
                        pigHp.removeAt(j)
                        music.baDing.play()
                        info.changeScoreBy(500)
                        updateHUD()
                    }
                }
            }
        }
    }

    // 4. SETTLING & WIN/LOSS EVALUATION
    if (gameState == STATE_SETTLING) {
        if (game.runtime() > settleTimer) {
            if (activePigs.length == 0) {
                // LEVEL CLEARED!
                let bonus = (birdsRemaining + 1) * 1000
                info.changeScoreBy(bonus)
                updateHUD()
                music.powerUp.play()

                if (currentLevel < TOTAL_LEVELS) {
                    game.splash("LEVEL " + currentLevel + " CLEARED!", "Bonus: +" + bonus + " pts! Press A")
                    loadLevel(currentLevel + 1)
                } else {
                    // ALL LEVELS BEATEN - VICTORY!
                    gameState = STATE_VICTORY
                    effects.confetti.startScreenEffect(3000)
                    game.splash("VICTORY! EGGS SAVED!", "Final Score: " + info.score())
                    game.over(true)
                }
            } else {
                // Pigs remain
                if (birdsRemaining > 0) {
                    birdsRemaining--
                    loadBirdInSling()
                } else {
                    // Out of birds! Level failed
                    music.wawawawaa.play()
                    game.splash("LEVEL FAILED!", "Pigs survived! Press A to retry")
                    loadLevel(currentLevel)
                }
            }
        }
    }
})

// --- Game Initialization ---
info.setScore(0)
game.splash("ANGRY BIRDS ARCADE", "Aim: D-Pad | Shoot: A")
loadLevel(1)
