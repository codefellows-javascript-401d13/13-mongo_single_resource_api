'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Videogame = require('../model/videogame.js');
const PORT = process.env.PORT || 3000;

process.env.MONGODB_URI = 'mongodb://localhost/videogametest';

require('../server.js');

const url = `http://localhost:${PORT}`;
const exampleVideogame = {
    title: 'test title',
    genre: 'test genre'
};

describe('Videogame Routes', function() {
    describe('POST: /api/videogame', function() {
        describe('with a valid body', function() {
            after( done => {
                if (this.tempVideogame) {
                    Videogame.remove({})
                    .then(() => done())
                    .catch(done);
                    return;
                }
                done();
            });

            it('should return a videogame', done => {
                request.post(`${url}/api/videogame`)
                .send(exampleVideogame)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(200);
                    expect(res.body.title).to.equal('test title');
                    expect(res.body.genre).to.equal('test genre');
                    this.tempVideogame = res.body;
                    done();
                });
            });
        });
    });

    describe('GET: /api/videogame/:id', function() {
        describe('with a valid body', function() {
            before( done => {
                exampleVideogame.timestamp = new Date();
                new Videogame(exampleVideogame).save()
                .then( videogame => {
                    this.tempVideogame = videogame;
                    done();
                })
                .catch(done);
            });

            after( done => {
                delete exampleVideogame.timestamp;
                if(this.tempVideogame) {
                    Videogame.remove({})
                    .then(() => done())
                    .catch(done);
                    return;
                };
                done();
            });

            it('should return a videogame', done => {
                request.get(`${url}/api/videogame/${this.tempVideogame._id}`)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(200);
                    expect(res.body.title).to.equal('test title');
                    expect(res.body.genre).to.equal('test genre');
                    done();
                });
            });
        });
    });
});