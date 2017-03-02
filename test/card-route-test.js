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

  describe('PUT: api/card', function() {
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

      it('it should return an updated card', done =>{
        let updateCard = {
          brand: 'Upper Deck',
          completeSet: false,
          single: true
        };
        request.put(`${url}/api/card/${this.testCard._id}`)
        .send(updateCard)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body._id).to.equal(this.testCard._id.toString());
          expect(res.body.brand).to.equal(updateCard.brand);
          expect(res.body.completeSet).to.not.be.true;
          expect(res.body.single).to.be.true;
          done();
        });
      });
    });

    describe('with a body but undefined id', function() {
      it('should return a 404 error', function(done) {
        let fakeCard = {
          _id: '000000000000000000000000',
          football: 'sucks',
          soccer: 'rules',
          pingpong: 'too'
        };
        request.put(`${url}/api/card/${fakeCard._id}`)
        .send(fakeCard)
        .end((err, res) => {
          expect(err.status).to.equal(404);
          expect(res.status).to.equal(err.status);
          expect(err.message).to.equal('Not Found');
          done();
        });
      });
    });

    describe('without a req body', function() {
      it('should return a 400 error', function(done) {
        let testId = '000000000000000000000000';
        request.put(`${url}/api/card/${testId}`)
        .end((err, res) => {
          expect(err.status).to.equal(400);
          expect(err.status).to.equal(res.status);
          done();
        });
      });
    });
  });

  describe('DELETE: api/card', function() {
    describe('with a valid id', function() {
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

      it('should remove an item', done => {
        request.delete(`${url}/api/card/${this.testCard._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.brand).to.equal(this.testCard.brand);
          expect(res.body.completeSet).to.be.true;
          expect(res.body.single).to.not.be.true;
          done();
        });
      });
    });
  });
});
