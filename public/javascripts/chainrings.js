class Random {
    constructor(seed) {
        this.seed = seed
    }

    random_dec() {
        this.seed ^= this.seed << 13
        this.seed ^= this.seed >> 17
        this.seed ^= this.seed << 5
        return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000
    }

    random_between(a, b) {
        return a + (b - a) * this.random_dec()
    }

    random_int(a, b) {
        return Math.floor(this.random_between(a, b + 1))
    }

    random_choice(x) {
        return x[Math.floor(this.random_between(0, x.length * 0.99))]
    }
}

let tokenData = window.tokenHash
//let tokenData = { "hash": "0xb871cd70edae9a70815520d7e7ea2d65ded3912b02d3f6e283e5f5fad167b313" }
let seed = parseInt(tokenData.slice(0, 16), 16);
let rng = new Random(seed);
let palettes = [
    "e54b4b-ffa987-f7ebe8-444140-1e1e24",
    "a6ebc9-61ff7e-5eeb5b-62ab37-393424",
    "95f9e3-69ebd0-49d49d-558564-564946",
    "97f9f9-a4def9-c1e0f7-cfbae1-c59fc9",
    "ddd1c7-c2cfb2-8db580-7e8987-4b4a67",
    "250902-38040e-640d14-800e13-ad2831",
    "333333-839788-eee0cb-baa898-bfd7ea", //
    "585123-eec170-f2a65a-f58549-772f1a",
    "fbf5f3-e28413-000022-de3c4b-c42847",
    "0fa3b1-d9e5d6-eddea4-f7a072-ff9b42",
    "10002b-240046-5a189a-9d4edd-e0aaff",
    "0466c8-023e7d-001845-33415c-7d8597",
    "861657-a64253-d56aa0-bbdbb4-fcf0cc",
    "493843-61988e-a0b2a6-cbbfbb-eabda8",
    "031d44-04395e-70a288-dab785-d5896f",
    "ff0a54-ff5c8a-ff85a1-fbb1bd-f7cad0",
    "463f3a-8a817c-bcb8b1-f4f3ee-e0afa0",
    "dd6e42-e8dab2-4f6d7a-c0d6df-eaeaea",
    "ffd6ff-e7c6ff-c8b6ff-b8c0ff-bbd0ff",
    "aa8f66-ed9b40-ffeedb-61c9a8-ba3b46",
    "a57548-fcd7ad-f6c28b-5296a5-82ddf0",
    "713e5a-63a375-edc79b-d57a66-ca6680",
    "114b5f-456990-e4fde1-f45b69-6b2737",
    "edf2fb-e2eafc-ccdbfd-c1d3fe-abc4ff",
    "9cafb7-ead2ac-fe938c-e6b89c-4281a4", //gloomyBitch
    "7bdff2-b2f7ef-eff7f6-f7d6e0-f2b5d4", //cottonCandyMadafaka
    "ffcdb2-ffb4a2-e5989b-b5838d-6d6875", //sunnyCaliforniasexOnDaBeach
    "f2d7ee-d3bcc0-a5668b-69306d-0e103d", //creepyOldMailman
    "ffbe0b-fb5607-ff006e-8338ec-3a86ff", //unicornPuke
    "9b5de5-f15bb5-fee440-00bbf9-00f5d4", //Rainbow Crap/Poop
    "fee440-f15bb5-9b5de5-00bbf9-00f5d4", //unicorn Pee
    "181a99-5d93cc-454593-e05328-e28976", //Manic Anxiety
    "F61067-5E239D-00F0B5-6DECAF-F4F4ED", //HallucinativeDiarrhea
    "f8f9fa-dee2e6-adb5bd-495057-212529", // Monochrome Constipation
    "212529-000000-adb5bd-495057-f8f9fa", // HappilyDepressedSoul
].map(palette => palette.split('-').map(c => '#' + c))
let palette = rng.random_choice(palettes);

let viewport = Math.min(window.innerHeight, window.innerWidth)
let w = viewport, h = viewport;
let row = rng.random_int(5, 30),
    rows = row,
    offset = w / row,
    cols = rng.random_int(row - row / 3, 30),
    radius = w / row,
    Rstroke = w / 500;

let cellColors = []
let cellShapes = []
let total = rows * cols,
    maxHeight = radius * rows;

let t$ = 0;
let s$
let tempFrame = 0;
let isThicc = false
let rotation$ = rng.random_between(0, 1)

function stroke$() {
    if (isThicc) {
        tempFrame++
        if (tempFrame >= 1000) {
            isThicc = false
            return Math.max(Rstroke, tempFrame / 10);
        } else {
            return Math.max(Rstroke, tempFrame / 10);
        }
    }
    tempFrame = Math.abs(tempFrame - 1)
    return Math.max(Rstroke, tempFrame / 10);
}

function setup() {
    s$ = rng.random_between(0.001, 0.004);
    frameRate(36)
    noiseSeed(seed);
    createCanvas(w, h);
    for (let i = 0; i < row * cols; i++) {
        cellColors[i] = rng.random_choice(palette.slice(0, palette.length - 1))
        cellShapes[i] = rng.random_between(0, 1)
    }
}

function draw() {
    // Loop rings
    if (rotation$ < 0.4) {
        translate(0, 0 - offset / 2)
    } else if (rotation$ < 0.6) {
        // r t l
        rotate(-PI / 2)
        scale(-1)
        translate(0, -w - offset / 2)
    } else if (rotation$ < 0.8) {
        // b t t
        rotate(-PI)
        translate(-w, -w - radius / 2)
    } else {
        // l t r
        rotate(-PI / 2)
        translate(-w, -offset / 2)
    }
    background(palette[palette.length - 1]);
    noFill();
    strokeWeight(stroke$())
    // Columns
    for (let c = 0; c < cols; c++) {
        const x = (width / (cols - 1)) * c;
        const cc = cols - c;

        let direction = (t$ + (cc / (cols * 2)) + 1) % 1;
        direction = Math.sin(map(cos(direction * TWO_PI), -1, 1, 0, 1) / 1 * (Math.PI / 2))
        for (let i = 0; i < rows; i++) {
            const pos = i / rows;
            const y = (pos * direction * maxHeight) + offset;

            // Draw rings
            stroke(cellColors[i * c]);
            if (cellShapes[i * c] > 0.95) {
                push()
                fill(cellColors[i * c])
                ellipse(x, y, radius);
                pop()
            } else if (cellShapes[i * c] > 0.70) {
                if (cellShapes[i * c] > 0.72) {
                    push()
                    let color1 = color(rng.random_choice(palette))
                    let color2 = color(rng.random_choice(palette))
                    fill(lerpColor(color1, color2, Math.abs(sin(frameCount * 100) * 100)))
                    noStroke()
                    pop()
                }
                rect(x - radius / 2, y - radius / 2, radius, radius, 100 * Math.abs(sin(frameCount / 100)));
            } else {
                ellipse(x, y, radius);
            }
        }

    }
    // Timer
    t$ += s$;
    if (t$ >= 1) {
        t$ = 0;
    }

}


function mouseClicked() {
    isThicc = !isThicc
}