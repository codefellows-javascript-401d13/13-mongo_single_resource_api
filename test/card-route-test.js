'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Card = require('../model/card.js');

const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`;

const sampleCard = {
  brand: 'Topps',
  set: true,
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
          expect(res.status).to.be(200);
          expect(res.body.brand).to.equal('Topps');
          expect(res.body).to.have.key('set');
          expect(res.body.set).to.be.ok();
          done();
        });
      });
    });
  });
});
