const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  await cloudinary.uploader.upload(
    req.body.image,
    {
      resource_type: "auto", // jpeg, png, mp4
      public_id: `${Date.now()}`,
    },
    (error, result) => {
      if (error) return res.json({ success: false, error: error.message });
      res.json({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  );
};

exports.removeImage = async (req, res) => {
  let image_id = req.body.public_id;
  await cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error: error.message });
    res.status(200).send("Removed");
  });
};
