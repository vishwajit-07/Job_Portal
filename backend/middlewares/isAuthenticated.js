import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated!",
        success: false,
      });
    }

    // ✅ Use jwt.verify instead of decode to ensure the token is valid
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // ✅ Attach user info to request
    req.id = decoded.userId;
    req.role = decoded.role; // Make sure token includes 'role' when generated

    next(); // Proceed to the controller
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(401).json({
      message: "Authentication failed!",
      success: false,
      error: error.message,
    });
  }
};

export default isAuthenticated;
