var express = require('express');
var router = express.Router();
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const passport = require('passport');

function isAuthenticated(req, res, next) {
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.isAuthenticated())
        return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/login');
}

function isNotAuthenticated(req, res, next) {
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (!(req.isAuthenticated())){
        return next();
    }

    // IF A USER IS LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/403');
}

function isAdmin(req, res, next) {
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user.username === 'admin') {
        return next();
    }

    // IF A USER IS NOT ADMIN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/403');
}

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
    res.redirect('/clients');
});

/// CLIENT ROUTES ///

// GET request for creating a Client. NOTE This must come before routes that display Client (uses id).
router.get('/clients/new', isAuthenticated, isAdmin, function(req, res){
    res.render('clients/new', {
        errors: req.flash('errors'),
        inputs: req.flash('inputs')
    });
});

// POST request for creating Client.
router.post('/clients', isAuthenticated, isAdmin, [
    // validation
    body('firstname', 'Empty firstname').not().isEmpty(),
    body('lastname', 'Empty lastname').not().isEmpty(),
    body('dob', 'Empty dob').not().isEmpty(),
    body('gender', 'Empty gender').not().isEmpty(),
    body('city', 'Empty city').not().isEmpty(),
    body('state', 'Empty state').not().isEmpty(),
    body('email', 'Empty email').not().isEmpty(),
    body('tel', 'Empty phone').not().isEmpty(),

    body('firstname', 'First name must be between 5-45 characters.').isLength({min:5, max:45}),
    body('lastname', 'Last name must be between 5-45 characters.').isLength({min:5, max:45}),
    body('city', 'City must be between 5-45 characters.').isLength({min:5, max:45}),
    body('state', 'State must be between 5-45 characters.').isLength({min:5, max:45}),
    body('email', 'Email must be between 5-255 characters.').isLength({min:5, max:255}),
    body('tel', 'Phone must be 10 characters.').isLength({min:10, max:10}),

    body('dob', 'Invalid DOB').isISO8601(),
    body('email', 'Invalid email').isEmail(),
    body('tel', 'Invalid phone').isMobilePhone()
], (req, res) => {
    const errors = validationResult(req);
    console.log(req);
    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        // Error messages can be returned in an array using `errors.array()`.
        req.flash('errors', errors.array());
        req.flash('inputs', req.body );
        res.redirect('/clients/new');
        // res.render('users/new', {
        //     errors: errors.array(),
        //     email: req.body.email,
        //     username: req.body.username
        // });
    }
    else {
        // Data from form is valid.
        console.log(req.body);
        sanitizeBody('firstname').trim().escape();
        sanitizeBody('lastname').trim().escape();
        sanitizeBody('dob').trim().escape();
        sanitizeBody('gender').trim().escape();
        sanitizeBody('city').trim().escape();
        sanitizeBody('state').trim().escape();
        sanitizeBody('email').trim().escape();
        sanitizeBody('tel').trim().escape();
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const dob = req.body.dob;
        const gender = req.body.gender;
        const city = req.body.city;
        const state = req.body.state;
        const email = req.body.email;
        const phone = req.body.tel;
        connection.query('INSERT INTO client (firstName, lastName, dob, gender, city, state, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [firstname, lastname, dob, gender, city, state, email, phone], function (error, results, fields) {
            // error will be an Error if one occurred during the query
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            if (error) {
                throw error;
                console.log('w');
            }
            req.flash('alert', 'Client created.');
            res.redirect('/clients');
        });
    }
});

// DELETE request to delete Client.
router.delete('/clients/:id', function(req, res){

});

// GET request to update Client.
router.get('/clients/:id/edit', function(req, res){
    res.send('edit form');
});

// PUT request to update Client.
router.put('/clients/:id', function (req, res) {
    
});

// GET request for list of all Client items.
router.get('/clients', isAuthenticated, function(req, res){
    connection.query('SELECT * FROM `client`', function (error, results, fields) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
        if (error) {
            throw error;
        }
        res.render('clients/index', {
            clients: results,
            req: req,
            alert: req.flash('alert')
        });
    });
});

/// EMPLOYEE ROUTES ///

// GET request for creating a Employee. NOTE This must come before routes that display Employee (uses id).
router.get('/employees/new', function(req, res){
    res.send('employee form');
});

// POST request for creating Employee.
router.post('/employees', function(req, res){

});

// DELETE request to delete Employee.
router.delete('/employees/:id', function(req, res){

});

// GET request to update Employee.
router.get('/employees/:id/edit', function(req, res){
    res.send('edit form');
});

// PUT request to update Employee.
router.put('/employees/:id', function (req, res) {

});

// GET request for list of all Employee items.
router.get('/employees', function(req, res){
    res.send('employees list');
});

/// SALES ROUTES ///

// GET request for creating a Sale. NOTE This must come before routes that display Sale (uses id).
router.get('/sales/new', function(req, res){
    res.send('sale form');
});

// POST request for creating Sale.
router.post('/sales', function(req, res){

});

// DELETE request to delete Sale.
router.delete('/sales/:id', function(req, res){

});

// GET request to update Sale.
router.get('/sales/:id/edit', function(req, res){
    res.send('edit form');
});

// PUT request to update Sale.
router.put('/sales/:id', function (req, res) {

});

// GET request for list of all Sale items.
router.get('/sales', function(req, res){
    res.send('sales list');
});


/// USERS ROUTES ///

// GET request for creating a User. NOTE This must come before routes that display User (uses id).
router.get('/users/new', function(req, res){
    res.send('user form');
});

// POST request for creating User.
router.post('/users', function(req, res){

});

// DELETE request to delete User.
router.delete('/users/:id', function(req, res){

});

// GET request to update User.
router.get('/users/:id/edit', function(req, res){
    res.send('edit form');
});

// PUT request to update User.
router.put('/users/:id', function (req, res) {

});

// GET request for list of all User items.
router.get('/users', function(req, res){
    res.send('users list');
});

/// LOGIN ROUTES ///

router.get('/login', isNotAuthenticated, function(req, res) {
    res.render('login', { errors: req.flash('errors') });
});

router.post('/login', isNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})
);


/// ERROR ROUTES ///
router.get('/403', function(req, res){
    res.render('403');
});

module.exports = router;
