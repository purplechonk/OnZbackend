const { Router } = require("express");
const { addVotes, getVotes, getTotalUserInEvent, getAllEvent } = require("../controllers/roomEventController");

const router = Router();

router.get('/getVotes', getVotes);

router.post('/addVotes', addVotes);

router.get('/getTotal', getTotalUserInEvent)

module.exports = router;