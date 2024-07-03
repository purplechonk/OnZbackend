const { Router } = require("express");
const { createNewRoom, joinRoom, showUserNameInRoom } = require("../controllers/roomController");

const router = Router();

router.post('/create', createNewRoom);
router.post('/join', joinRoom)
router.get('/displayPage', showUserNameInRoom);


module.exports = router;