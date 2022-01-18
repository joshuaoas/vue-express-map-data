const jwt = require("jsonwebtoken");
const config = require("../config/keys");

module.exports = (req, res, next) => {
	if (req.get("Authorization")) {
		const token = req.get("Authorization").split(" ")[1];
		let decodedToken;
		try {
			decodedToken = jwt.verify(token, config.SECRETKEY);
		} catch (err) {
			return res.status(401).json({ errors: [{ msg: "Not authenticated" }] });
		}
		if (!decodedToken) {
			return res.status(401).json({ errors: [{ msg: "Not authenticated" }] });
		}
		req.userID = decodedToken.UserId;
		next();
	} else {
		return res.status(401).json({ errors: [{ msg: "Not authenticated" }] });
	}
};
