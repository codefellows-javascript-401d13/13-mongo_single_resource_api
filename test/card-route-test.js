'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Card = require('../model/card.js');
// const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`;

// process.env.MONGODB_URI = 'mongodb://localhost/cardapp';

require('../server.js');


const sampleCard = {
  brand: 'Topps',
  completeSet: true,
  single: false
};

describe('Card Routes', function() {
  describe('POST: /api/card', function() {
    describe('with a valid req body', function() {
      after( done => {
        if (this.testCard) {
          Card.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a card', done => {
        request.post(`${url}/api/card`)
        .send(sampleCard)
        .end((err, res) => {
          if (err) return done(err);
          this.tempCard = res.body;
          expect(res.status).to.equal(200);
          expect(res.body.brand).to.equal('Topps');
          expect(res.body.completeSet).to.be.true;
          expect(res.body.single).to.not.be.true;
          done();
        });
      });

      it('should return 400 error', done => {
        request.post(`${url}/api/card`)
        .send()
        .end((err, res) => {
          expect(err.status).to.equal(400);
          expect(err.message).to.equal('Bad Request');
          expect(res.status).to.equal(err.status);
          done();
        });
      });
    });
  });

  describe('GET: /api/card', function() {
    describe('with a valid req body', function() {
      before( done => {
        new Card(sampleCard).save()
        .then( card => {
          this.testCard = card;
          done();
        })
        .catch(done);
      });

      after( done => {
        if (this.testCard) {
          Card.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a card', done => {
        request.get(`${url}/api/card/${this.testCard._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.brand).to.equal(this.testCard.brand);
          expect(res.body.completeSet).to.equal(this.testCard.completeSet);
          done();
        });
      });
    });

    describe('with an invalid id', function() {
      it('should return a 404 error', function(done) {
        let testId = '000000000000000000000000';
        request.get(`${url}/api/card/${testId}`)
        .end((err, res) => {
          expect(err.status).to.equal(404);
          expect(res.status).to.equal(err.status);
          done();
        });
      });
    });
  });
});
