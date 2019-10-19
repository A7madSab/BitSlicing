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
        // for(let panel=1;panel<=8;panel++)
        // {

        // }
        for (let i = 0; i < 256; i++) {
            for (let j = 0; j < 256; j++) {
                let baseColor = hex2bin(image.getPixelColour(i, j))
                let maskPlane1 = 0b00010000
                let resColor = baseColor & maskPlane1
                // console.log(`i: ${i}, j:${j}, baseColor:${baseColor}, mask:${mask} resColor:${resColor}`)
                // console.log(`i: ${i}, j:${j}, color: ${image.getPixelColour(i, j)}`)
                newImage.setPixelColour(resColor, i, j)
            }
        }
        return newImage
    })
    .then(newImg => {
        newImg.write("plane4.png")
    })
    .catch(err => {
        console.log(err)
    });

