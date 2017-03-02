'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const ElecGuitar = require('../model/electric-guitar.js');
const PORT = process.env.PORT || 3000;

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/test_app';

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleGuitar = {
  name: 'Les Paul',
  make: 'Gibson'
};

describe('Electric Guitar Routes', function() {

  describe('POST: /api/electric-guitar', function() {
    describe('with a valid body', function() {
      after( done => {
        if(this.tempGuitar) {
          ElecGuitar.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return an electric guitar', done => {
        request.post(`${url}/api/electric-guitar`)
        .send(exampleGuitar)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Les Paul');
          expect(res.body.make).to.equal('Gibson');
          done();
        });
      });
    });
    describe('with an invalid body', function() {
      it('should return a 400', function(done) {
        request.post(`${url}/api/electric-guitar`)
        .send({ name: 'whoo-de-whoo'})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET: /api/electric-guitar', function() {
    describe('with a valid request', function() {

      before( done => {
        exampleGuitar.timestamp = new Date();
        new ElecGuitar(exampleGuitar).save()
        .then( elecGuitar => {
          this.tempGuitar = elecGuitar;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleGuitar.timestamp;
        if(this.tempGuitar) {
          ElecGuitar.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a guitar object', done => {
        request.get(`${url}/api/electric-guitar/${this.tempGuitar._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Les Paul');
          expect(res.body.make).to.equal('Gibson');
          done();
        });
      });
    });

    describe('with an invalid id', function() {
      it('should return a 404 status', function() {
        request.get(`${url}/api/guitar/whoo-de-whoo`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
        });
      });
    });
  });

  describe('PUT: /api/electric-guitar', function() {
    describe('With a valid request', function() {
      before( done => {

        exampleGuitar.timestamp = new Date();
        new ElecGuitar(exampleGuitar).save()
        .then( elecGuitar => {
          this.tempGuitar = elecGuitar;
          done();
        })
        .catch(done);
      });
      after( done => {
        delete exampleGuitar.timestamp;
        if(this.tempGuitar) {
          this.tempGuitar.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return a guitar object', done => {
        let updateGuitar = { name: 'Stratocaster', make: 'Fender'};
        request.put(`${url}/api/electric-guitar/${this.tempGuitar._id}`)
        .send(updateGuitar)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Stratocaster');
          expect(res.body.make).to.equal('Fender');
          done();
        });
      });
    });

    describe('with an invalid id', function() {
      it('should throw a 404 error', function(done) {
        request.put(`${url}/api/guitar/whoo-de-whoo`)
        .send(exampleGuitar)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with an invalid body', function() {
      before( done => {
        exampleGuitar.timestamp = new Date();
        new ElecGuitar(exampleGuitar).save()
        .then( elecGuitar => {
          this.tempGuitar = elecGuitar;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleGuitar.timestamp;
        if(this.tempGuitar) {
          ElecGuitar.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should throw a 400 error', done => {
        let badRequestObj = { doodle: 'wajit', boogie: 'no-no'};
        request.put(`${url}/api/electric-guitar/${this.tempGuitar.id}`)
        .send({badRequestObj})
        .end((err, res) => {
          console.log('temp guitar', this.tempGuitar);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
