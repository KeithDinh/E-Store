require("dotenv").config({ path: "./.env.local" });
const mongoose = require("mongoose");

const chai = require("chai");
const request = require("supertest");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;

var authController = require("./authController");
const User = require("../models/user");

describe("Auth Controller", () => {
  // before(() => {
  let SampleUser = {
    name: "Sample User",
    email: "sampleuser@mail.com",
    role: "subscriber",
    cart: [],
    address: "Houston TX",
  };
  let invalidUser = {};
  let req, res, spy;

  afterEach(() => {
    sinon.restore();
  });
  it("should update user", async () => {
    let user = SampleUser;
    let findAndUpdateStub = sinon
      .stub(User, "findOneAndUpdate")
      .yields(null, user);

    req = { user };

    authController.createOrUpdateUser(req, res).then(() => {
      expect(findAndUpdateStub).to.have.been.calledOnce;
      expect(res.user).to.be.exist;
      expect(res.user).to.be.equal(user);
    });
  });

  it("should create user", async () => {
    let user = SampleUser;
    let findAndUpdateStub = sinon
      .stub(User, "findOneAndUpdate")
      .yields(null, null);

    let saveStub = sinon.stub(User.prototype, "save");
    req = { user };

    authController.createOrUpdateUser(req, res).then(() => {
      expect(findAndUpdateStub).to.have.been.calledOnce;
      expect(saveStub).to.have.been.calledOnce;
      expect(res.user).to.be.exist;
      expect(res.user).to.be.equal(user);
    });
  });

  it("should get current user", async () => {
    let user = SampleUser;
    let findAndUpdateStub = sinon
      .stub(User, "findOneAndUpdate")
      .yields(null, null);

    let saveStub = sinon.stub(User.prototype, "save");
    req = { user };

    authController.createOrUpdateUser(req, res).then(() => {
      expect(findAndUpdateStub).to.have.been.calledOnce;
      expect(saveStub).to.have.been.calledOnce;
      expect(res.user).to.be.exist;
      expect(res.user).to.be.equal(user);
    });
  });
});
