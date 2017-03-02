'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Car = require('../model/car.js');
const PORT = process.env.PORT || 8000;

process.env.MONGODB_URI = 'mongodb://localhost/carappdev';

require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleCar = {
  make: 'test car make',
  model: 'test car model'
};

describe('Car Routes', function() {
  describe('POST: /api/car', function(){
    describe('with a valid body', function() {
      after( done => {
        if (this.tempCar) {
          Car.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a car', done => {
        request.post(`${url}/api/car`)
        .send(exampleCar)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.make).to.equal('test car make');
          expect(res.body.model).to.equal('test car model');
          this.tempCar = res.body;
          done();
        });
      });
    });


    it('should return 400 bad request', done => {
      request.post(`${url}/api/car`)
      .end((err, res) => {
        expect(err).to.be.an('error');
        expect(res.status).to.equal(400);
        this.tempCar = res.body;
        done();
      });
    });
  });


  describe('GET: api/car/:id', function(){
    describe('valid id and body', function(){
      before( done => {
        exampleCar.timestamp = new Date();
        new Car(exampleCar).save()
        .then( car => {
          this.tempCar = car;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleCar.timestamp;
        if (this.tempCar) {
          Car.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return a car', done => {
        request.get(`${url}/api/car/${this.tempCar._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.make).to.equal('test car make');
          expect(res.body.model).to.equal('test car model');
          done();
        });
      });
    });

    describe('with an invalid id', function(){
      it('should respond with a 404 status code', done => {
        request.get(`${url}/api/car/678b`)
        .end(err  => {
          expect(err).to.be.an('error');
          expect(err.status).to.equal(404);
          done();
        });
      });
    });
  });


  describe('PUT: /api/car/:id', function(){
    describe('valid id and body', function(){
      before( done => {
        exampleCar.timestamp = new Date();
        new Car(exampleCar).save()
        .then( car => {
          this.tempCar = car;
          done();
        })
        .catch(err => done(err));
      });

      after( done => {
        delete exampleCar.timestamp;
        if(this.tempCar){
          Car.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a car', done => {
        let updateCar = { make: 'Mercadez', model: 'Benz' };
        request.put(`${url}/api/car/${this.tempCar._id}`)
        .send(updateCar)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(updateCar._id);
          expect(res.body.make).to.equal(updateCar.make);
          expect(res.body.model).to.equal(updateCar.model);
          updateCar = res.body;
          done();
        });
      });
    });


    it('should respond with a 404 status code', done => {
      let updateCar = { make: 'new whip', model: 'new style'};
      request.put(`${url}/api/car/556`)
      .send(updateCar)
      .end(err => {
        expect(err.status).to.be.equal(404);
        done();
      });
    });


    describe('with an invalid body', function(){
      it('should return a 400', done => {
        request.put(`${url}/api/car/6`)
        .end(err => {
          expect(err.status).to.be.equal(400);
          done();
        });
      });
    });
  });
});
