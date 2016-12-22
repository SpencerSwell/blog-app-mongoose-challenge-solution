var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var faker = require('faker');

var {runServer,closeServer,app} = require('../server');
var {blogpost} = require('../models');
	
	console.log(blogpost,"MODEL RIGHT HERE");

var should = chai.should();

mongoose.promise = global.promise;

chai.use(chaiHttp);

function generateBlogData () {

	return {
		author: {
			firstName:faker.name.firstName(),
			lastName:faker.name.lastName()
		},
		title:faker.random.words(),
		content:faker.lorem.paragraph(),
		created:faker.date.past()

	};

}

function seedBlogData() {
	console.log('Seeding generated blog data');
	let fakeDataContainer = [];

	for (let i = 0; i<10; i++) {

		fakeDataContainer.push(generateBlogData());
	}
	// console.log(fakeDataContainer);
	// console.log(blogpost.methods.insertOne);
	return blogpost.insertMany(fakeDataContainer)
	};




describe('BlogServer', function server() {

	before(function() {
		console.log('STARTING SERVER');
		return runServer();
	});

	after(function() {
		console.log("SHUTTING DOWN DATABASE");
		return closeServer();
	});

	beforeEach(function() {
		console.log('ADDING SEED DATA');
		return seedBlogData();
	});

	afterEach(function() {
		console.log("EMPTYING DATABASE");
		return mongoose.connection.dropDatabase();
	});



	it('When given a get request for all blogs it should return all blogs', function() {
		// let res;
		return chai.request(app)
		.get('/posts')
		.then(function(res){
			// res = _res;
			console.log(res.body,"RESPONSE BODY HERE");
			// res.should.have.status(200);
			// res.should.have.json;
			res.body.should.have.length.of.at.least(1);
			return blogpost.count()
			console.log(blogpost.count());
		})
		then(function(count) {
		
			// res.body.length.to.equal(count);
		});
	});

});
