var Jimp = require('jimp')

function hex2bin(hex) {
    return parseInt(hex, 16)
}

Jimp.read("Source/flower.jpg")
    .then(image => image.resize(256, 256))
    .then(image => image.color([
        { apply: "greyscale", params: [100] }
    ]))
    .then(image => {
        const newImage = new Jimp(256, 256)
        let maskPlane
        for (let panel = 1; panel <= 8; panel++) {
            if (panel === 1) maskPlane = 0b10000000
            else if (panel === 2) maskPlane = 0b01000000
            else if (panel === 3) maskPlane = 0b00100000
            else if (panel === 4) maskPlane = 0b00010000
            else if (panel === 5) maskPlane = 0b00001000
            else if (panel === 6) maskPlane = 0b00000100
            else if (panel === 7) maskPlane = 0b00000010
            else maskPlane = 0b00000001
            for (let i = 0; i < 256; i++) {
                for (let j = 0; j < 256; j++) {
                    let baseColor = hex2bin(image.getPixelColour(i, j))
                    let resColor = baseColor & maskPlane
                    // console.log(`i: ${i}, j:${j}, baseColor:${baseColor}, mask:${mask} resColor:${resColor}`)
                    // console.log(`i: ${i}, j:${j}, color: ${image.getPixelColour(i, j)}`)
                    newImage.setPixelColour(resColor, i, j)
                }
            }
            newImage.write("plane" + panel + ".png")
        }
    })
    .catch(err => {
        console.log(err)
    });

