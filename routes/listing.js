const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

//index Route..
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isLoggedin, listingController.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(listingController.showListing));

// Create Route
router.post(
    "/",
    isLoggedin,
    validateListing,
    wrapAsync(listingController.createListing)
);

//Edit Route(renders edit form)
router.get(
    "/:id/edit",
    isLoggedin,
    isOwner,
    wrapAsync(listingController.editListing)
);

//Update Route
router.put(
    "/:id",
    isLoggedin,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
);

//Confirmation To delete Route..
router.get(
    "/:id/delete",
    isLoggedin,
    isOwner,
    wrapAsync(listingController.suretoDelete)
);

//Destroy Route
router.delete(
    "/:id",
    isLoggedin,
    isOwner,
    wrapAsync(listingController.destroyListing)
);

module.exports = router;