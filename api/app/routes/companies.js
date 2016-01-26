module.exports = function(router) {
	var User = require('../models/user').model,
		Company = require('../models/company').model,
		Branch = require('../models/branch').model,
		Address = require('../models/address').model;


	//---------------------------------------------------
	// COMPANIES
	//---------------------------------------------------
	router.post('/companies', function(req, res) {
		console.log('----------User.current._id-------');
		console.log(User.current._id);
		var company = new Company({
			name: req.body.name,
			owner: User.current._id
		});

		company.save(function(err, newCompany) {
			if (err) {
				res.send(err);
			}

			console.log(newCompany);
			User.findById(newCompany.owner, function(err, user) {
				console.log(err);
				console.log(user);
				user.company = newCompany;
				user.save(function(err) {
					if (err) {
						res.send(err);
					}

					res.json({
						success: true
					});
				});
			});
		});
	});

	router.put('/companies/:companyId', function(req, res) {
		var companyId = req.params.companyId;

		Company.findById(companyId, function(err, company) {
			if (err) {
				res.send(err);
			}

			company.name = req.body.name;
			company.save(function(err, newCompany) {
				if (err) {
					res.send(err);
				}

				User.findById(newCompany.owner, function(err, user) {
					user.company = newCompany;
					user.save(function(err, user) {
						if (err) {
							res.send(err);
						}

						res.json({
							success: true
						});
					});
				});
			});
		});
	});

	router.delete('/companies/:companyId', function(req, res) {
		var companyId = req.params.companyId;

		Company.remove({
			_id: companyId
		}, function(err, company) {
			if (err) {
				res.send(err);
			}

			User.findById(User.current._id, function(err, user) {
				if (err) {
					res.send(err);
				}

				user.company = null;
				user.save(function(err, user) {
					if (err) {
						res.send(err);
					}

					res.json({
						success: true
					});
				});
			})
		});
	});

	// ------------------------------------------------------------
	// BRANCHES
	// ------------------------------------------------------------
	router.post('/companies/:companyId/branches', function(req, res) {
		var companyId = req.params.companyId;

		//var address = new Address(req.params.address),
		var	branch = new Branch({
				companyId: companyId,
				//address: address,
				name: req.body.name
			});

		Company.findById(companyId, function(err, company) {
			if (err) {
				res.send(err);
			}
			console.log(branch);
			company.branches.push(branch);

			company.save(function(err, newCompany) {
				if (err) {
					res.send(err);
				}

				User.findById(newCompany.owner, function(err, user) {
					if (err) {
						res.send(err);
					}

					user.company = newCompany;

					user.save(function(err, newUser) {
						if (err) {
							res.send(err);
						}

						res.json({
							success: true,
							user: newUser
						});
					});

				});
			});
		});
	});
};