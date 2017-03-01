'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Pet = require('../model/pet.js');
const PORT = process.env.PORT || 3000;

process.env.MONGODB_URI = 'mongodb://localhost/pettest';

require('../server.js');

const url = `http://localhost:${PORT}`;
const examplePet = {
  name: 'test pet name'
};

describe('Pet Routes', function() {
  describe('POST: /api/pet', function () {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempPet) {
          Pet.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a pet', done => {
        request.post(`${url}/api/pet`)
        .send(examplePet)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test pet name');
          this.tempPet = res.body;
          done();
        });
      });
    });
  });

  describe('GET: /api/list/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        examplePet.timestamp = new Date();
        new Pet(examplePet).save()
        .then( pet => {
          this.tempPet = pet;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete examplePet.timestamp;
        if(this.tempPet) {
          Pet.remove({})
          .then( () => done() )
          .catch(done);
          return;
        };
        done();
      });

      it('should return a pet', done => {
        request.get(`${url}/api/pet/${this.tempPet._id}`)
        .end((err, res) =. {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test pet name');
          done();
        });
      });
    });
  });
});
