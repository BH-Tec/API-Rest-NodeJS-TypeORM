import { UpdateUserService } from "../services/UpdateUserService";
import { FakeData } from "../utils/fakeData/fakeData";
import createConnection  from "../database";
import { makeMockResponse } from "../utils/mocks/mockResponse";
import { getConnection } from "typeorm";
import { makeMockRequest } from "../utils/mocks/mockRequest";
import { DeleteUserController } from "./DeleteUserController";

describe("UpdateUserService", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async () => {
        const connection = await createConnection();
        await connection.close();
    })
    const fakeData = new FakeData();

    it("Deve retornar status 204 quando usuario for deletado", async () => {
        const mockUser = await fakeData.createUser();
        const deleteUserController = new DeleteUserController();

        const request = makeMockRequest({
            params: {
                id: mockUser.id
            }
        });

        const response = makeMockResponse();

        await deleteUserController.handle(request, response);

        expect(response.state.status).toBe(204);
    })
})