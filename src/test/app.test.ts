// /* eslint-disable @typescript-eslint/no-unused-vars */
// import {app, server} from '../app';
// import supertest from 'supertest';
// import { expect } from 'chai';

// import { Sequelize } from 'sequelize-typescript';

// // import {sequelize, dataTypes, checkModelName, checkUniqueIndex, checkPropertyExists} from 'sequelize-test-helpers';

// // import SequelizeService from '../common/services/sequelize/sequelize.service';

// describe('LOGIN API DAL', function() {
//     // let request: supertest.SuperAgentTest;
//     // before(function() {
//     //     request = supertest.agent(app);
//     // });
//     after(function(done) {
//         server.close(done);
//     })

//     describe('DATABASE CONNECTION', function() {
        
//         it('should return sequelize instance', async function () {
//             expect((SequelizeService.getSequelize)).to.be.an('Sequelize');
//         });
//     })

//     // describe('API ENDPOINT', function() {
//     //     let request: supertest.SuperAgentTest;
//     //     before(function() {
//     //         request = supertest.agent(app);
//     //     });

//     //     it('should return insert new user in table', async function () {
//     //         try {
//     //             const res = await request.post('/insertUser').send({
//     //                 "EMAILID": "amey2p@gmail.com"
//     //             });
//     //             expect(res.status).to.equal(200);
//     //             expect(res.body.success).to.equal(true);
//     //             expect(res.body).not.to.be.empty;
//     //             expect(res.body).to.be.an('Response');
//     //             expect(res.body.data.message).to.equal("OTP sent successfully");
//     //         }
//     //         catch(e: any) {
//     //             console.log(e.message);
//     //         }
//     //     });
    
//     //     it('should throw an error', async function () {
//     //         try {
//     //             const res = await request.post('/createOTP').send({
//     //                 "EMAILID": "amey2p@gmailcom"
//     //             });
//     //             expect(res.status).to.equal(400);
//     //             expect(res.body.success).to.equal(false);
//     //             expect(res.body).not.to.be.empty;
//     //             expect(res.body).to.be.an('Response');
//     //             expect(res.body.data.message).to.equal("Invalid type for property /EMAILID");
//     //         }
//     //         catch(e: any) {
//     //             console.log(e.message);
//     //         }
//     //     })

//     //     it('should show user already exists while registration', async function () {
//     //         try {
//     //             const res = await request.post('/registerUser').send({
//     //                 "EMAILID": "amey2p@gmail.com",
//     //                 "PASSWORD": "pass@1234",
//     //                 "FIRSTNAME": "Ameya",
//     //                 "LASTNAME": "Patil",
//     //                 "FLAG": "REGISTER"

//     //             });
//     //             expect(res.status).to.equal(409);
//     //             expect(res.body.success).to.equal(false);
//     //             expect(res.body).not.to.be.empty;
//     //             expect(res.body).to.be.an('Response');
//     //             expect(res.body.data.message).to.equal("User already exists");
//     //         }
//     //         catch(e: any) {
//     //             console.log(e.message);
//     //         }
//     //     })

//     //     it('should login the user', async function () {
//     //         try {
//     //             const res = await request.post('/registerUser').send({
//     //                 "EMAILID": "amey2p@gmail.com",
//     //                 "PASSWORD": "pass@1234",
//     //                 "FLAG": "LOGIN"

//     //             });
//     //             expect(res.status).to.equal(200);
//     //             expect(res.body.success).to.equal(true);
//     //             expect(res.body).not.to.be.empty;
//     //             expect(res.body).to.be.an('Response');
//     //             expect(res.body.data.message).to.equal("Logged in successfully");
//     //             expect(res.body.data.data).to.have.keys(['id','EMAILID','FIRSTNAME','LASTNAME'])
//     //         }
//     //         catch(e: any) {
//     //             console.log(e.message);
//     //         }
//     //     })
//     // });

//     // describe('Unit function', async function() {
//     //     it('should return OTP', async function(){
//     //         try {
//     //             expect(otpServices.createOTP("amey2p@gmailcom")).to.be.an('string').that.have.lengthOf(6);
//     //             // expect(otpServices.createOTP("amey2p@gmailcom").length).to.be.an('string');
//     //         }
//     //         catch(e: any) {
//     //             console.log(e.message);
//     //         }
//     //     })
    
//     //     it('should send mail', async function(){
//     //         try {
//     //             expect(Nodemailer.sendMail("amey2p@gmailcom", "Test mail", "Test")).to.be.an('object');
//     //             expect(Nodemailer.sendMail("amey2p@gmailcom", "Test mail", "Test")).to.have.keys(['accepted', 'rejected', 'ehlo', 'envelopeTime', 'messageTime', 'messageSize', 'response', 'envelope', 'messageId']);
//     //             expect(Nodemailer.sendMail("amey2p@gmailcom", "Test mail", "Test")).to.haveOwnProperty('accepted').to.equal(['amey2p@getMaxListeners.com']);
//     //             expect(Nodemailer.sendMail("amey2p@gmailcom", "Test mail", "Test")).to.haveOwnProperty('envelope').to.equal({ from: 'a.may3pp@gmail.com', to: [ 'amey2p@gmailcom' ] });
//     //             expect(Nodemailer.sendMail("amey2p@gmailcom", "Test mail", "Test")).to.haveOwnProperty('response').to.contain('250 2.0.0 OK');                
//     //         }
//     //         catch(e: any) {
//     //             console.log(e.message);
//     //         }
//     //     })


    
    
//     // })


// })