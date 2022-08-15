import createConnection  from '../database';
import { CreateUserController } from './CreateUserController';
import { Request } from 'express';
import { mockMockResponse } from '../utils/mocks/mockResponse';
import { getConnection } from 'typeorm';


describe('CreateUserController', () => {
    beforeAll(async() => {
        const connection = await createConnection()
        await connection.runMigrations();
    })
    afterAll (async() => {
        const connection = getConnection();
        await connection.query('DELETE FROM usuarios');
        await connection.close();
    })

    const createUserController = new CreateUserController();
    
    const response = mockMockResponse();

        it('Deve retornar status 201 quando usuario for criado', async() => {        
        
        const request = {
            body: {
                name: 'John Doe',
                email: 'john.doe@gmail.com'
            }
        } as Request

        const result = await createUserController.handle(request, response);
        
        expect(response.state.status).toBe(201)
    })

    it('Deve retornar status 400 quando o nome não for informado', async() => {
        const request = {
            body: {
                name: '',
                email: 'john.doe@gmail.com'
            }
        } as Request

        await createUserController.handle(request, response);
        
        expect(response.state.status).toBe(400)
    })

    it('Deve retornar status 201 quando o email não for informado', async() => {
        const request = {
            body: {
                name: 'John Doe',
                email: ''
            }
        } as Request

        await createUserController.handle(request, response);

        expect(response.state.status).toBe(201)
    })

}) 