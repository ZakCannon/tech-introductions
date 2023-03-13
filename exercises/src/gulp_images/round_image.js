import sharp from 'sharp';

const rect = new Buffer(
    '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);

sharp('./src/images/obama.jpg')
    .resize(200, 200)
    .composite([{input: rect, blend: "dest-in"}])
    .toFile('./src/images/result.png', function(err, info) {
        console.log(info);
    });