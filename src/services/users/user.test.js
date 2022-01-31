import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import faker from "faker";
import UserService from "./user.service";

//const should = chai.should()
const expect = { chai };

chai.use(chaiHttp);

describe("UserService", () => {
    describe("addUser", () => {
        it("Should add a user document to the Database", async () => {
            const userDoc = {
                name: faker.lorem.word(),
                email: faker.internet.email(),
                pwd: faker.internet.paragraph(),
                ucode: faker.internet.paragraph(),
            };

            const stub = sinon.stub(UserService, "addUser");

            expect(stub.called).to.be.true;
        });
    });
});
