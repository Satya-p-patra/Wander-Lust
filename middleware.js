const Listing = require("./models/listing");
const Review = require("./models/review.js")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
};


module.exports.isLoggedin = (req, res, next) => {
    console.log(req.originalUrl);
    console.log('Checking authentication...');
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        console.log('User is not authenticated. Redirecting...');
        req.flash('error', 'You must be logged in to access this page');
        return res.redirect("/login");
    }
    console.log('User is authenticated. Proceeding to the next middleware...');
    next();
};


module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the owner of this listing..!")
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review..!")
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    };
};