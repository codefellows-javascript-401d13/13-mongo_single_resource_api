'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Show = require('../model/show.js');
const Character = require('../model/character.js');
const PORT = process.env.PORT || 3000;

process.env.MONGODB_URI || 'mongodb://localhost/showtest';

const url = `http://localhost:${PORT}`;
require('../server.js');

const exampleShow = {
  name: 'test show name',
  timestamp: new Date()
};

const exampleCharacter = {
  name: 'Ruby Rose',
  weapon: 'Scythe',
  timestamp: new Date()
};

describe('Character Routes', function() {
  describe('Post /api/show/:showID/character', function(){
    describe('with a valid body and id', function(){
      before(done => {
        new Show(exampleShow).save()
        .then( Show => {
          this.tempShow = Show;
          done();
        })
        .catch(done);
      });
      after(done => {
        Promise.all([
          Show.remove({}),
          Character.remove({})
        ])
        .then(() => done())
        .catch(done);
      });
      it('should return a character', done => {
        request.post(`${url}/api/show/${this.tempShow._id}/character`)
        .send(exampleCharacter)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Ruby Rose');
          expect(res.body.weapon).to.equal('Scythe');
          done();
        });
      });
    });
    describe('with a valid body and invalid id', function(){
      before(done => {
        new Show(exampleShow).save()
        .then( Show => {
          this.tempShow = Show;
          done();
        })
        .catch(done);
      });
      after(done => {
        Promise.all([
          Show.remove({}),
          Character.remove({})
        ])
        .then(() => done())
        .catch(done);
      });
      it('should return a character', done => {
        request.post(`${url}/api/show/idisweird/character`)
        .send(exampleCharacter)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    describe('with an invalid body and valid id', function(){
      before(done => {
        new Show(exampleShow).save()
        .then( Show => {
          this.tempShow = Show;
          done();
        })
        .catch(done);
      });
      after(done => {
        Promise.all([
          Show.remove({}),
          Character.remove({})
        ])
        .then(() => done())
        .catch(done);
      });
      it('should return a character', done => {
        request.post(`${url}/api/show/${this.tempShow._id}/character`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('Get /api/character/:characterId', function(){
    describe('with a valid id', function(){
      before( done => {
        new Show(exampleShow).save()
        .then( show => {
          this.tempShow = show;
          return Show.findByIdAndAddCharacter(show._id, exampleCharacter);
        })
        .then( character => {
          this.tempCharacter = character;
          done();
        })
        .catch(done);
      });
      after(done => {
        Promise.all([
          Show.remove({}),
          Character.remove({})
        ])
        .then(() => done())
        .catch(done);
      });
      it('should return a character', done => {
        request.get(`${url}/api/character/${this.tempCharacter._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Ruby Rose');
          expect(res.body.weapon).to.equal('Scythe');
          done();
        });
      });
    });
    describe('with an invalid id', function(){
      before( done => {
        new Show(exampleShow).save()
        .then( show => {
          this.tempShow = show;
          return Show.findByIdAndAddCharacter(show._id, exampleCharacter);
        })
        .then( character => {
          this.tempCharacter = character;
          done();
        })
        .catch(done);
      });
      after(done => {
        Promise.all([
          Show.remove({}),
          Character.remove({})
        ])
        .then(() => done())
        .catch(done);
      });
      it('should return a character', done => {
        request.get(`${url}/api/character/boobadidea`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('PUT /api/character/:id', function(){
    describe('with a valid id and body', function(){
      before( done => {
        new Show(exampleShow).save()
        .then( show => {
          this.tempShow = show;
          return Show.findByIdAndAddCharacter(show._id, exampleCharacter);
        })
        .then( character => {
          this.tempCharacter = character;
          done();
        })
        .catch(done);
      });
      after(done => {
        Promise.all([
          Show.remove({}),
          Character.remove({})
        ])
        .then(() => done())
        .catch(done);
      });
      it('should return a new object', done => {
        let newExample = {name: 'Weiss Schnee', weapon: 'Rapier'};
        request.put(`${url}/api/character/${this.tempCharacter._id}`)
        .send(newExample)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Weiss Schnee');
          expect(res.body.weapon).to.equal('Rapier');
          done();
        });
      });
    });
    describe('with an invalid id and valid body', function(){
      before( done => {
        new Show(exampleShow).save()
        .then( show => {
          this.tempShow = show;
          return Show.findByIdAndAddCharacter(show._id, exampleCharacter);
        })
        .then( character => {
          this.tempCharacter = character;
          done();
        })
        .catch(done);
      });
      after(done => {
        Promise.all([
          Show.remove({}),
          Character.remove({})
        ])
        .then(() => done())
        .catch(done);
      });
      it('should return a 404 error', done => {
        let newExample = {name: 'Weiss Schnee', weapon: 'Rapier'};
        request.put(`${url}/api/character/badid`)
        .send(newExample)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    describe('with a valid id and invalid body', function(){
      before( done => {
        new Show(exampleShow).save()
        .then( show => {
          this.tempShow = show;
          return Show.findByIdAndAddCharacter(show._id, exampleCharacter);
        })
        .then( character => {
          this.tempCharacter = character;
          done();
        })
        .catch(done);
      });
      after(done => {
        Promise.all([
          Show.remove({}),
          Character.remove({})
        ])
        .then(() => done())
        .catch(done);
      });
      it('should return a 404 error', done => {
        request.put(`${url}/api/character/${this.tempCharacter._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
});
