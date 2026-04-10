const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    { name: 'sauce_arrabiata.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Arrabbiata_sauce.jpg/320px-Arrabbiata_sauce.jpg' },
    { name: 'sauce_garlic.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Garlic_sauce.jpg/320px-Garlic_sauce.jpg' },
    { name: 'sauce_bbq.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/BBQ_sauce.jpg/320px-BBQ_sauce.jpg' },
    { name: 'sauce_pesto.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Pesto.jpg/320px-Pesto.jpg' },
    
    { name: 'cheese_cheddar.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cheddar_cheese.jpeg/320px-Cheddar_cheese.jpeg' },
    { name: 'cheese_vegan.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Vegan_cheese.jpg/320px-Vegan_cheese.jpg' },
    { name: 'cheese_gouda.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Gouda_koese.jpg/320px-Gouda_koese.jpg' },
    { name: 'cheese_parmesan.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Parmigiano_reggiano_piece.jpg/320px-Parmigiano_reggiano_piece.jpg' },

    { name: 'veg_onions.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Onion_on_White.JPG/320px-Onion_on_White.JPG' },
    { name: 'veg_bellpeppers.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Bell_peppers.jpg/320px-Bell_peppers.jpg' },
    { name: 'veg_jalapenos.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Jalapeno_pepper.jpg/320px-Jalapeno_pepper.jpg' },
    { name: 'veg_olives.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Black_olives.jpg/320px-Black_olives.jpg' },
    { name: 'veg_tomatoes.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/320px-Tomato_je.jpg' },
    { name: 'veg_corn.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Sweetcorn.jpg/320px-Sweetcorn.jpg' },
    { name: 'veg_paneer.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Paneer_%281%29.jpg/320px-Paneer_%281%29.jpg' },
    { name: 'veg_garlic.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Garlic_clove.jpg/320px-Garlic_clove.jpg' },
    { name: 'veg_paprika.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Red_Chilli.jpg/320px-Red_Chilli.jpg' },

    { name: 'meat_grilled_chicken.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Grilled_chicken.jpg/320px-Grilled_chicken.jpg' },
    { name: 'meat_sausage.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Sausages.jpg/320px-Sausages.jpg' },
    { name: 'meat_bbq_chicken.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Barbecue_Chicken.jpg/320px-Barbecue_Chicken.jpg' },
    { name: 'meat_spicy_chicken.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Spicy_chicken.jpg/320px-Spicy_chicken.jpg' }
];

const destDir = path.join(__dirname, 'frontend', 'public', 'images');

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

(async () => {
    for (const img of images) {
        try {
            await download(img.url, path.join(destDir, img.name));
            console.log(`Successfully downloaded ${img.name}`);
        } catch (e) {
            console.error(`Error downloading ${img.name}:`, e.message);
        }
    }
})();
