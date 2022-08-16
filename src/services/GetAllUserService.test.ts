import createConnection from "../database";
import { getConnection } from "typeorm";
import { GetAllUserService } from "./GetAllUserService";
import { CreateUserService } from "./CreateUserService";
import { v4 as uuid } from "uuid";
import { FakeData } from "../utils/fakeData/fakeData"

describe('GetAllUserService', () => {
    beforeAll(async () =>  {
        const connection = await createConnection();
        await connection.runMigrations
    })

    afterAll(async () =>  {
        const connection = getConnection();
        await connection.query('DELETE FROM usuarios');
        await connection.close();
    })

    const fakeData = new FakeData();


    it('Deve retornar todos os usuarios cadastrados', async() => {

        await fakeData.execute();

        const createUserService = new CreateUserService();                                                            

        const expectResponse = [
            {
                id: uuid(), 
                nome: 'Paulo',
                email: 'paulo@gmail.com'
            },
            {
                nome: 'Pedro',
                email: ''
            }
        ]

        const getAllUserService = new GetAllUserService();

        const result = await getAllUserService.execute();
        expect(result).toMatchObject(expectResponse);
    })
})