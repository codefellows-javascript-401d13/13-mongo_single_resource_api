'use strict';

const expect =  require('chai').expect;
const request = require('superagent');
const Food = require('../model/food.js');
const Salad = require('../model/salad.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleFood = {
  name: 'test food name',
  meal: 'Breakfast',
  timestamp: new Date()
};

const exampleSalad = {
  name: 'test salad name',
  dressing: 'ceaser',
  timestamp: new Date()
};

describe('Salad Routes', function() {
  describe('POST: /api/food/:foodId/salad', function() {
    describe('with a valid body', () => {
      before( done => {
        new Food(exampleFood).save()
        .then( food => {
          this.tempFood = food;
          done();
        })
        .catch(done);
      });
      after( done => {
        Promise.all([
          Food.remove({}),
          Salad.remove({})
        ])
        .then( () => done())
        .catch(done);
      });
      it('should return a salad', done => {
        request.post(`${url}/api/food/${this.tempFood._id}/salad`)
        .send(exampleSalad)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.name).to.equal(exampleSalad.name);
          expect(res.body.foodID).to.equal(this.tempFood._id.toString());
          done();
        });
      });
    });
  });
});
