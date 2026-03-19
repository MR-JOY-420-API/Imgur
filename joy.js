const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

// সব Client-ID এখানে রাখ
const CLIENT_IDS = [
  "e4f58fc81daec99",
  "0c9f64d6e3ec804",
  "3fb071726880bbb"
];

async function uploadToImgur(imagePath) {
  try {
    if (!fs.existsSync(imagePath)) {
      throw new Error("File not found: " + imagePath);
    }

    const imageData = fs.createReadStream(imagePath);
    const form = new FormData();
    form.append("image", imageData);

    // Random Client-ID use করবে
    const clientId = CLIENT_IDS[Math.floor(Math.random() * CLIENT_IDS.length)];

    const response = await axios.post("https://api.imgur.com/3/image", form, {
      headers: {
        Authorization: `Client-ID ${clientId}`,
        ...form.getHeaders(),
      },
    });

    return response.data.data.link;
  } catch (error) {
    throw new Error("Upload failed: " + error.message);
  }
}

// Export
module.exports = { uploadToImgur };
