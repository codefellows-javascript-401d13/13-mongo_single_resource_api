'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Journal = require('../model/journal.js');
const PORT = process.env.PORT || 3000;

// process.env.MONGODB_URI = 'mongodb://localhost/journaltest';

require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleJournal = {
  name: 'test journal name',
  subject: 'test journal subject',
  timestamp: new Date()
};


describe('Journal Routes', function() {
  describe('POST: /api/journal', function() {
    describe('with a valid body', function(){
      after( done => {
        if (this.tempJournal) {
          Journal.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return a journal', done => {
        request.post(`${url}/api/journal`)
        .send(exampleJournal)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test journal name');
          expect(res.body.subject).to.equal('test journal subject');
          this.tempJournal = res.body;
          done();
        });
      });
    });

    describe('with an invalid body or none provided', function(){
      it('should return a 400 error', done => {
        request.post(`${url}/api/journal`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET: /api/journal/:id', function() {
    describe('with a valid body', function(){
      before( done => {
        exampleJournal.timestamp = new Date();
        new Journal (exampleJournal).save()
        .then( journal => {
          this.tempJournal = journal;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete exampleJournal.timestamp;
        if (this.tempJournal) {
          Journal.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });

      it ('should return a journal', done => {
        request.get(`${url}/api/journal/${this.tempJournal._id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test journal name');
          expect(res.body.subject).to.equal('test journal subject');
          done();
        });
      });
    });

    describe('with an invalid id', function(){
      it('should return a 404 error', function(done) {
        request.get(`${url}/api/journal/87687687`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT: /api/journal/:id', function() {
    describe('with a valid id and body', function(){
      before( done => {
        exampleJournal.timestamp = new Date();
        new Journal (exampleJournal).save()
        .then( journal => {
          this.tempJournal = journal;
          done();
        })
        .catch(done);
      });
      after( done => {
        delete exampleJournal.timestamp;
        if (this.tempJournal) {
          Journal.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return an updated journal', done => {
        let updatedJournal = {name: 'cale', subject: 'diet'};
        request.put(`${url}/api/journal/${this.tempJournal._id}`)
        .send(updatedJournal)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(updatedJournal._id);
          expect(res.body.name).to.equal(updatedJournal.name);
          expect(res.body.subject).to.equal(updatedJournal.subject);
          updatedJournal = res.body;
          done();
        });
      });

      describe('with an invalid id', function (){
        it('should return a 404 error with invalid id', done => {
          request.put(`${url}/api/journal/34234234`)
          .end(res => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
      it('should return a 400 status code', done => {
        let updatedJournal = 'strinnnng';
        request.put(`${url}/api/journal/id`)
        .set('Content-Type', 'application/json')
        .send(updatedJournal)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
