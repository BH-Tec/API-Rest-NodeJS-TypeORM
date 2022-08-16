import { UpdateUserService } from "../services/UpdateUserService";
import { FakeData } from "../utils/fakeData/fakeData";
import { UpdateUserController } from "./UpdateUserController";
import createConnection  from "../database";
import { makeMockResponse } from "../utils/mocks/mockResponse";
import { getConnection } from "typeorm";
import { Request } from 'express';

describe("UpdateUserService", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = await createConnection();
        await connection.query("DELETE FROM usuarios");
        await connection.close();
    })
    const fakeData = new FakeData();

    it('Deve retornar status 204 quando usuario for editado', async () => {
        const updateUserController = new UpdateUserController();

        const mockUser = await fakeData.createUser();

        const request = {
            body: {
                id: mockUser.id,
                nome: "Outro nome",
                email: "email@email.com"
            }
        } as Request

        const response = makeMockResponse();
        
        await updateUserController.handle(request, response);

        expect(response.state.status).toBe(204)
    })
})