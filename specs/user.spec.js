//IMPORT SECTION
//  Import {expect} assertion function from Chai assertion library
import { expect } from "chai"
//  Import helper(s)
import UserHelper from "../helpers/user.helper"
//  Creating a new instance of helper(s)
const userHelper = new UserHelper()
//Main Test Suite
describe("USER", () => {
  describe("\nSuccessful registration sub suite (happy path with valid login and password)", () => {
    //BEFORE hook
    before(async () => {
      await userHelper.create("fitstName", "lastName", process.env.EMAIL, process.env.PASSWORD)
      console.log(userHelper.response.body, "TEXT")
    })
    //Test Cases REGISRATION
    it("Checking that response status code is 201", () => {
      expect(userHelper.response.statusCode).to.eq(201)
    })
    it("Checking that response has a message", () => {
      expect(userHelper.response.body.message).not.to.be.undefined
    })
    it("Checking that response has a message", () => {
      expect(userHelper.response.body.message).to.eq("User created successfully. Please check your email and verify it")
    })
    it("Checking that response has a success", () => {
      expect(userHelper.response.body.success).not.to.be.undefined
    })
    it("Checking that response has a success", () => {
      expect(userHelper.response.body.success).to.eq(true)
    })
    it("Checking that response has a fail", () => {
      expect(userHelper.response.body.fail).not.to.be.undefined
    })
    it("Checking that response has a fail", () => {
      expect(userHelper.response.body.fail).to.eq(false)
    })
    it("Checking that response has a silent", () => {
      expect(userHelper.response.body.silent).not.to.be.undefined
    })
    it("Checking that response has a silent", () => {
      expect(userHelper.response.body.silent).to.eq(true)
    })
  })
  describe("\nSuccessful login sub suite (happy path with valid login and password)", () => {
    //BEFORE hook
    before(async () => {
      await userHelper.login(process.env.EMAIL, process.env.PASSWORD)
      //console.log(userHelper.response, "TEXT")
    })
    //Test Cases LOGIN/TOKEN
    it("Checking that response status code is 200", () => {
      expect(userHelper.response.statusCode).to.eq(200)
    })
    it("Checking that response has a token", () => {
      expect(userHelper.response.body.payload).not.to.be.undefined
    })
    // Проверяем что длинна token больше чем 200 символов
    it("Checking that token has length more then  200 symbols", () => {
      expect(userHelper.response.body.payload.token).to.have.lengthOf.greaterThan(200)
    })
    //содержит ли токен
    it("Checking that response has a token", () => {
      expect(userHelper.response.body.payload.token).not.to.be.undefined
    })
    //токен является стрингом
    it("Checking that token is a string", () => {
      expect(userHelper.response.body.payload.token).to.be.a("string")
    })
    //роль у юзера определена
    it("Checking that response has a user roles ", () => {
      expect(userHelper.response.body.payload.user.roles).to.be.an("array")
    })
    it("Checking that response has a role", () => {
      expect(userHelper.response.body.payload.user.roles).not.to.be.undefined
    })
    //роль юзера new и первый в массиве
    it("Checking that user role is new", () => {
      expect(userHelper.response.body.payload.user.roles[0]).not.to.be.a("new")
    })
  })
})
