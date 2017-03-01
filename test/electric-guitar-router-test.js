'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const ElecGuitar = require('../model/electric-guitar.js');
const PORT = process.env.PORT || 3000;

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/test_app';

require('../server.js');

const url = `http://localhost:${PORT}`;

const dumbThing = 'whoo-de-whoo';
const exampleGuitar = {
  name: 'Les Paul',
  make: 'Gibson'
};

describe('Electric Guitar Routes', function() {
  describe('GET: /api/electric-guitar', function() {

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
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
