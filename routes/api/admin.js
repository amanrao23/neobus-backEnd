const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authAdmin = require("../../middleware/auth/authAdmin");
const {
  registerAdmin,
  loginAdmin,
  addBus,
  getMyBuses,
  ticketInfo,
  cancelTickets
} = require("../controllers/admin");

router.get("/", authAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//Register Admin
router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  registerAdmin
);

//Login Admin
router.post("/login", loginAdmin);

//Add a bus
router.post("/addBus", authAdmin, addBus);

//get all buses of admin
router.get("/myBuses", authAdmin, getMyBuses);

router.post("/ticketInfo", authAdmin, ticketInfo);


router.post("/cancelTickets",authAdmin,cancelTickets)
module.exports = router;

