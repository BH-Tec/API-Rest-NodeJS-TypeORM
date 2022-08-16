import { GetAllUserController } from "./GetAllUserController";
import createConnection from "../database";
import { getConnection } from "typeorm";
import { makeMockRequest } from "../utils/mocks/mockRequest";
import { makeMockResponse } from "../utils/mocks/mockResponse";
import { FakeData} from "../utils/fakeData/fakeData";

describe("GetAllUserController", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        connection.query("DELETE FROM usuarios");
        connection.close();
    })

    const fakeData = new FakeData();

    it('Deve retornar status 200 quando pegar todos usuarios', async () => {
        await fakeData.execute();

        const getAllUserController = new GetAllUserController();

        const request = makeMockRequest({});

        const response = makeMockResponse();

        await getAllUserController.handle(request, response);

        expect(response.state.status).toBe(200);
    })
})