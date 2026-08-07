const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {

    try {

        // Get token from header

        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({

                success: false,

                message: "Token Missing"

            });

        }

        // const token = authHeader.replace("Bearer ", "");
        
        
        
        const token =
            req.cookies?.token ||
            (req.header("Authorization")?.startsWith("Bearer ")
                ? req.header("Authorization").replace("Bearer ", "")
                : null);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }



        // Verify token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message: "Invalid or Expired Token"

        });

    }

};