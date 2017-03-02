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
        
        describe('with an invalid body', function() {
            after( done => {
                if (this.tempVideogame) {
                    tempVideogame.remove({})
                    .then( () => done())
                    .catch(done);
                    return;
                }
                done();
            });

            it('should return a 400 error', done => {
                request.post(`${url}/api/videogame`)
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body).to.be.an('error');
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

        describe('with an invalid id', () => {
            it('should return a 404 error', done => {
                request.post(`${url}/api/videogame/123456789`)
                .end((res) => {
                    expect(res.status).to.equal(404);
                    done();
                });
            });
        });
    });

    describe('PUT: /api/videogame/:id', function() {
        describe('with a valid body', function() {
            before( done => {
                new Videogame(exampleVideogame).save()
                .then( videogame => {
                    this.tempVideogame = videogame;
                    done();
                })
                .catch(done);
            });

            it('should update and return a videogame', done => {
                let updatedVideogame = { title: 'updated title', genre: 'updated genre' };
                request.put(`${url}/api/videogame/${this.tempVideogame._id}`)
                .send(updatedVideogame)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(200);
                    expect(res.body._id).to.equal(this.tempVideogame.id);
                    expect(res.body.title).to.equal('updated title');
                    expect(res.body.genre).to.equal('updated genre');
                    done();
                });
            });
        });

        describe('with no id', function() {
            before( done => {
                new Videogame(exampleVideogame).save()
                .then( videogame => {
                    this.tempVideogame = videogame;
                    done();
                })

                .catch(done);
            });

            after( done => {
                if (this.tempVideogame) {
                    Videogame.remove({})
                    .then( () => done())
                    .catch(done);
                    return;
                }
                done();
            });

            it('should return a 404 error', done => {
                let updatedVideogame = {
                    title: 'updated title',
                    genre: 'updated genre'
                };
                request.put(`${url}/api/videogame`)
                .send(updatedVideogame)
                .end((err, res) => {
                    expect(err).to.be.an('error');
                    expect(res.status).to.equal(404);
                    done();
                });
            });
        });

        describe('with an invalid body', function() {
            before( done => {
                new Videogame(exampleVideogame).save()
                .then( videogame => {
                    this.tempVideogame = videogame;
                    done();
                })
                .catch(done);
            });
            after( done => {
                if (this.tempVideogame) {
                    Videogame.remove({})
                    .then( () => done())
                    .catch(done);
                    return;
                }
                done();
            });

            it('should return a 400 status', done => {
                request.put(`${url}/api/videogame/${this.tempVideogame._id}`)
                .end((err, res) => {
                    expect(err).to.be.an('error');
                    expect(res.status).to.equal(400);
                    done();
                });
            });
        });
    });
});