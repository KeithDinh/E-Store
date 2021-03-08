const admin = require("../firebase");

exports.authCheck = async (req, res, next) => {
  try {
    // check token from front end
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    next();
  } catch (error) {
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};
