'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Employee = require('../model/employee.js');
require('../server.js');
process.env.MONGODB_URI = 'mongodb://localhost/employeelist';
const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`;
const exampleEmployee = {
  name: 'test name'
};
const secondEmployee = {
// this is from vim
  name: 'second test name',
  timestamp: new Date()
};


describe('Employee routes', function() {

  describe('POST /api/employee', function(){
    describe('with a valid body', function(){
      after( done => {
        if(this.tempEmployee){
          Employee.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return an employee', done => {
        request.post(`${url}/api/employee`)
        .send(exampleEmployee)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test name');
          this.tempEmployee = res.body;
          done();
        });
      });
    });
  });

  describe('GET /api/employee/:id', function(){
    describe('with a valid id', function(){
      before( done => {
        exampleEmployee.timestamp = new Date();
        new Employee(exampleEmployee).save()
        .then(employee => {
          this.tempEmployee = employee;
          done();
        })
        .catch(done)
      });

      after( done => {
        delete exampleEmployee.timestamp;
        if(this.tempEmployee) {
          Employee.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });

      it('should return and employee', done => {
        request.get(`${url}/api/employee/${this.tempEmployee._id}`)
        .end((err, res) =>{
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test name');
          done();
        });
      });
    });
    // describe('with and invalid id', function(){
    //   it('should return a 404 error', done => {
    //     request.get(`${url}/api/employee/invalidID`)
    //     .end((err, res) => {
    //       console.log(res.status);
    //       expect(res.status).to.equal(404);
    //       done();
    //     })
    //   })
    // })
  });

  describe('PUT /api/employee', function(){
    describe('with a valid id', function(){
      before(done => {
        exampleEmployee.timestamp = new Date();
        new Employee(exampleEmployee).save()
        .then( employee => {
          this.tempEmployee = employee;
          done();
        })
        .catch(done);
      });
      after( done => {
        delete exampleEmployee.timestamp;
        if(this.tempEmployee){
          Employee.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return an employee', done => {
        request.put(`${url}/api/employee/${this.tempEmployee._id}`)
        .send(secondEmployee)
        .end((err, res) => {
          console.log('yeyo ',res.body.name);
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('second test name');
          done();
        });
      });
    });
    describe('with an invalid body request', function(){
      before( done => {
        exampleEmployee.timestamp = new Date();
        new Employee(exampleEmployee).save()
        .then( employee => {
          this.tempEmployee = employee;
          done();
        })
        .catch(done)
      });
      after( done => {
        delete exampleEmployee.timestamp;
        if(this.tempEmployee){
          Employee.remove({})
          .then(() => done())
          .catch(done);
          return;
        }
        done();
      });
      it('should return a 400 error', done => {
        request.put(`${url}/api/employee/${this.tempEmployee._id}`)
        .end((err, res) => {
          console.log('exp 400 :::::',res.status);
          expect(!!err).to.equal(true);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

});
