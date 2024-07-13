const router = require("express").Router();
const { login } = require("../controllers/auth");
const users = require("../controllers/users");
const devices = require("../controllers/devices");
const passport = require("passport");
require("../passport");

router.post('/api/login', login);

router.use('/api', passport.authenticate('jwt', { session: false }));/* , async (req, res, next) => {
	const token = req.get('Authorization').split(' ')[1];

	const checkToken = await Token.findOne({ where: { token } });
	if (!checkToken.active) {
		return res.sendStatus(401);
	}
	next();
}); */

router.get('/api/users', users.index);
router.post('/api/users', users.create);
router.put('/api/users/:id', users.update);

router.get('/api/devices', devices.index);
router.post('/api/devices', devices.create);
router.put('/api/devices/:id', devices.update);

module.exports = router;