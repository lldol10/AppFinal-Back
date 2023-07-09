const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")

const AppError = require("../utils/AppError")

describe("UserCreateServide", () => {

    // let userRepository = null
    // let userCreateService = null

    // beforeEach(() => {
    //      userRepository = new UserRepositoryInMemory()
    //      userCreateService = new UserCreateService(userRepository)
    // })

    it("user should be create", async () => {
        const user = {
            name: "User Test",
            email: "user@test.com",
            password: "123"
        }
    

   const userRepository = new UserRepositoryInMemory()
   const userCreateService = new UserCreateService(userRepository)
        const userCreated = await userCreateService.execute(user)
        expect(userCreated).toHaveProperty("id")
    })

    it("User not should be created with exist email", async () => {

        const user1 = {
            name: "User test 1",
            email: "user@test.com",
            password: "123"
        }

        const user2 = {
            name: "User test 2",
            email: "user@test.comm",
            password: "456"
        }

        const userRepository = new UserRepositoryInMemory()
        const userCreateService = new UserCreateService(userRepository)

        await userCreateService.execute(user1)
        console.log("usuario criado fera " + user1)
        expect(async () => {
           await userCreateService.execute(user2)
        }).rejects.toEqual(new AppError("Este email já está em uso"))
    })
})
