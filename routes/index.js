var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hey' });
});

/// CLIENT ROUTES ///

// GET request for creating a Client. NOTE This must come before routes that display Client (uses id).
router.get('/clients/new', function(req, res){
    res.send('client form');
});

// POST request for creating Client.
router.post('/clients', function(req, res){

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
router.get('/clients', function(req, res){
  res.send('clients list');
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

router.get('/login', function(req, res) {
    // res.render('login', {
    //     msg: req.flash('success')
    // });
});

router.post('/login',
    // passport.authenticate('local', { successRedirect: '/',
    //     failureRedirect: '/login',
    //     failureFlash: true })
);

module.exports = router;