import jwt from 'jsonwebtoken';
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:'User not authenticated!',
                success: false
            });
        }
        const decode = jwt.decode(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:'Invalid token',
                success: false
            });
        }
        req.id=decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;

// import jwt from 'jsonwebtoken';

// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token; // Get token from cookies

//         if (!token) {
//             return res.status(401).json({
//                 message: "User not authenticated!",
//                 success: false
//             });
//         }

//         // Verify token
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);

//         if (!decoded) {
//             return res.status(401).json({
//                 message: "Invalid token",
//                 success: false
//             });
//         }

//         req.user = { id: decoded.userId }; // Attach userId to req.user
//         next(); // Proceed to the next middleware
//     } catch (error) {
//         console.error("Authentication Error:", error.message);
//         return res.status(401).json({
//             message: "Authentication failed!",
//             success: false,
//             error: error.message
//         });
//     }
// };

// export default isAuthenticated;
