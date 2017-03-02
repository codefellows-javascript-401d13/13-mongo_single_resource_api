'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Mountains = require('../model/mountains.js');
const url = 'http://localhost:3004';
const wrongID = 'w8ro7625ngi6811677088980';

require ('../server.js');

const testMountain = {
  name: 'test mountain name'
};

const newInfo = {
  name: 'new name'
};

describe('Mountains Routes', function() {
  describe('unregistered routes', function() {
    it('should return a 404 not found', done => {
      request.get(`${url}/someWrongRoute`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('GET: /api/mountains/:id', function() {
    beforeEach(done => {
      testMountain.timestamp = new Date();
      new Mountains(testMountain).save()
      .then(mountain => {
        this.tempMountains = mountain;
        done();
      })
      .catch(done);
    });
    afterEach(done => {
      delete testMountain.timestamp;
      if (this.tempMountains) {
        Mountains.remove({})
        .then( () => done())
        .catch(done);
        return;
      }
      done();
    });
    describe('with a valid body', () => {
      it('should return a mountain', done => {
        request.get(`${url}/api/mountains/${this.tempMountains._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(testMountain.name);
          done();
        });
      });
    });
    describe('with an invalid id', () => {
      it('should return a 404 not found', done => {
        request.get(`${url}/api/mountains/${wrongID}`)
        .end(err => {
          expect(err.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('GET: /api/mountains', function() {
    describe('list of documents in mountains collection', function() {
      before(done => {
        testMountain.timestamp = new Date();
        newInfo.timestamp = new Date();
        new Mountains(testMountain).save();
        new Mountains(newInfo).save();
        done();
      });
      after(done => {
        delete testMountain.timestamp;
        delete newInfo.timestamp;
        Mountains.remove({})
        .then( () => done())
        .catch(done);
      });
      it('should return a list of names', done => {
        var testList = ['test mountain name','new name'];
        request.get(`${url}/api/mountains`)
        .end((err, res) => {
          if (err) done(err);
          console.log('res.body in tst', res.body);
          expect(res.body[0]).to.equal(testList[0]); // I initially had expect(res.body).to.equal(testList), but it threw an assertion error even though the expected and actual were identical...
          expect(res.body[1]).to.equal(testList[1]);
          done();
        });
      });
    });
  });
  describe('PUT: /api/mountains/:id', function() {
    beforeEach(done => {
      testMountain.timestamp = new Date();
      new Mountains(testMountain).save()
      .then(mountain => {
        this.tempMountains = mountain;
        done();
      })
      .catch(done);
    });
    afterEach(done => {
      delete testMountain.timestamp;
      if (this.tempMountains) {
        Mountains.remove({})
        .then( () => done())
        .catch(done);
        return;
      }
      done();
    });
    describe('with a valid id and body', () => {
      it('should return a mountain', done => {
        request.put(`${url}/api/mountains/${this.tempMountains._id}`)
        .send(newInfo)
        .end((err, res) => {
          if (err) return done();
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(newInfo.name);
          this.tempMountains = res.body;
          done();
        });
      });
    });
    describe('with an invalid id', () => {
      it('should return a 404 not found', done => {
        request.put(`${url}/api/mountains/${wrongID}`)
        .send(newInfo)
        .end(err => {
          expect(err.status).to.equal(404);
          done();
        });
      });
    });
    describe('with invalid response body', () => {
      it('should return a 400 bad request', done => {
        request.put(`${url}/api/mountains/${this.tempMountains._id}`)
        .end(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('POST: /api/mountains', function() {
    afterEach(done => {
      delete testMountain.timestamp;
      if(this.tempMountains) {
        Mountains.remove({})
        .then( () => done())
        .catch(done);
        return;
      }
      done();
    });
    describe('with no request body', function() {
      it('should return a 400 bad request', function(done) {
        request.post(`${url}/api/mountains`)
        .end(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
    describe('with a valid body', function() {
      it('should return a mountain', done => {
        request.post(`${url}/api/mountains`)
        .send(testMountain)
        .end((err, res) => {
          if (err) return done();
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(testMountain.name);
          this.tempMountains = res.body;
          done();
        });
      });
    });
  });
  describe('DELETE: /api/mountains/:id', function() {
    describe('with a valid id', function() {
      before(done => {
        testMountain.timestamp = new Date();
        new Mountains(testMountain).save()
        .then(mountain => {
          this.tempMountains = mountain;
          done();
        })
        .catch(done);
      });
      it('should delete an entry', done => {
        request.delete(`${url}/api/mountains/${this.tempMountains._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          Mountains.findById(this.tempMountains._id, (err, res) => {
            expect(res).to.equal(null);
          });
          done();
        });
      });
    });
    describe('with invalid id', function() {
      it('should return a 404 not found', done =>  {
        request.delete(`${url}/api/mountains/${wrongID}`)
        .end(err => {
          expect(err.status).to.be.equal(404);
          done();
        });
      });
    });
  });
});
