'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const People = require('../model/people.js');
const PORT = process.env.PORT || 3000;
const debug = require('debug')('people:people-route-test');

process.env.MONGODB_URI = 'mongodb://localhost/peopletest';

require('../server.js');

const url = `http://localhost:${PORT}`;
const examplePeople = {
  name: 'test people name'
};

describe('People routes', function() {
  describe('POST: /api/people', function() {
    describe('with a valid body', function() {
      after( done => {
        if(this.temppeople) {
          People.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a valid people', done => {
        request.post(`${url}/api/people`)
        .send(examplePeople)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          this.temppeople = res.body;
          expect(res.body.name).to.equal('test people name');
          done();
        });
      });
    });

    describe('with no body supplied', function() {
      it('should return a 400 error', function() {
        request.post(`${url}/api/people`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET: /api/people/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        examplePeople.timestamp = new Date();
        new People(examplePeople).save()
        .then( people => {
          this.temppeople = people;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete examplePeople.timestamp;
        if(this.temppeople) {
          People.remove({})
          .then(() => done())
          .catch(done);
          return;
        };
        done();
      });

      it('should return an actual people', done => {
        request.get(`${url}/api/people/${this.temppeople._id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test people name');
          done();
        });
      });
    });

    describe('with an invalid id', function() {
      it('should return a 404 error', function() {
        request.get(`${url}/api/people/121212`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT: api/people/:id', function() {
    describe('with a valid id and body', function() {
      before( done => {
        examplePeople.timestamp = new Date();
        // debug('into before')
        new People(examplePeople).save()

        .then( people => {
          this.temppeople = people;
          // debug('into  nest before', people)
          done();
        })
        .catch(done);
      });

      after( done => {
        delete examplePeople.timestamp;
        if(this.temppeople) {
          People.remove({})
          .then(() => done())
          .catch(done);
          return;
        };
        done();
      });

      it('should update a people with a valid id and body', done => {
        let updatePeople = {name: 'some new people'}
        request.put(`${url}/api/people/${this.temppeople._id}`)
        .send(updatePeople)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('some new people');
          done();
        });
      });
    });

    describe('with an invalid id', function() {
      it('should return a 404 error with an invalid id', function() {
        request.put(`${url}/api/people/28288282`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with no body supplied', function() {
      it('should return a 400 error', function() {
        request.put(`${url}/api/people`)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
