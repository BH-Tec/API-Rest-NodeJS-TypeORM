import { CreateUserService } from "../../services/CreateUserService";
import { v4 as uuid } from "uuid";


class FakeData {

    createUserService = new CreateUserService();
    
    async execute() {

        await this.createUserService.execute({
            id: uuid(),
            nome: "Paulo",
            email: "paulo@gmail.com"
        })
        await this.createUserService.execute({
            id: uuid(), 
            nome: 'Pedro',
            email: ''
        }) 
    }

    async createUser(){

        const user = await this.createUserService.execute({
            id: uuid(),
            nome: "Chico",
            email: "chico@gmail.com"
        })

        return user
    }
}

export { FakeData }