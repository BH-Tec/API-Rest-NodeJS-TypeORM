import { UpdateUserService } from "./UpdateUserService";
import { FakeData } from "../utils/fakeData/fakeData";
import createConnection  from "../database";

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

    it('Deve editar o nome do usuario', async () => {
        
        const mockUser = await fakeData.createUser();

        const updateUserService = new UpdateUserService();

        const result = await updateUserService.execute({
            id: mockUser.id,
            nome: "Paulo",
        });

        expect(result).toHaveLength(0)
    })
})