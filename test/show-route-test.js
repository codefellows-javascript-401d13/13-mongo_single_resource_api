'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Show = require('../model/show.js');
const PORT = process.env.PORT || 3000;

process.env.MONGODB_URI || 'mongodb://localhost/showtest';

const url = `http://localhost:${PORT}`;
require('../server.js');

const exampleShow = {
  name: 'test show name'
};

describe('Show Routes', function(){
  describe('Post /api/show', function(){
    describe('with a valid body', function(){
      after( done => {
        if(this.tempShow){
          Show.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return a show', done => {
        request.post(`${url}/api/show`)
        .send(exampleShow)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test show name');
          this.tempShow = res.body;
          done();
        });
      });
    });
    //without a valid body;
  });
  describe('GET /api/show/:id', function(){
    describe('with a valid id', function(){
      before( done => {
        exampleShow.timestamp = new Date();
        new Show(exampleShow).save()
        .then(show => {
          this.tempShow = show;
          done();
        })
        .catch(done);
      });
      after( done => {
        delete exampleShow.timestamp;
        if(this.tempShow){
          Show.remove({})
          .then( () => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return a show', done => {
        request.get(`${url}/api/show/${this.tempShow._id}`)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test show name');
          done();
        });
      });
    });
  });
  describe('PUT /api/show/:id', function(){
    describe('with a valid id', function(){
      before( done => {
        exampleShow.timestamp = new Date();
        new Show(exampleShow).save()
        .then(show => {
          this.tempShow = show;
          done();
        })
        .catch(done);
      });
      after( done => {
        delete exampleShow.timestamp;
        if(this.tempShow){
          Show.remove({})
          .then( () => done())
          .catch(done);
        }
      });
      it('should return a new show', done => {
        request.put(`${url}/api/show/${this.tempShow._id}`)
        .send({name:'new show name'})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('new show name');
          done();
        });
      });
    });
  });
  describe('Delete /api/show/:id', function(){
    describe('with a valid id', function(){
      before( done => {
        exampleShow.timestamp = new Date();
        new Show(exampleShow).save()
        .then(show => {
          this.tempShow = show;
          done();
        })
        .catch(done);
      });
      it('should return a  deleted show', done => {
        request.delete(`${url}/api/show/${this.tempShow._id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test show name');
          done();
        });
      });
    });
  });
});
