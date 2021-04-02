const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImages = async (req, res) => {
  await cloudinary.v2.uploader.upload(
    req.body.image,
    {
      resource_type: "auto", // jpeg, png, mp4
      public_id: `E-Store/${Date.now()}`,
    },
    function (error, result) {
      if (error) return res.json({ success: false, error: error.message });
      res.status(200).json({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  );
};

exports.removeImage = async (req, res) => {
  await cloudinary.v2.uploader.destroy(
    req.body.public_id,
    function (error, result) {
      if (error) return res.json({ success: false, error: error.message });
      res.status(200);
    }
  );
};
