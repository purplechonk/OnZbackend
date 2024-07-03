const { Router } = require("express");
const { createNewRoom, joinRoom, retreiveUsersInRoom } = require("../controllers/roomController");

const router = Router();

router.post('/create', createNewRoom);
router.post('/join', joinRoom)
router.get('/displayPage', retreiveUsersInRoom);


module.exports = router;