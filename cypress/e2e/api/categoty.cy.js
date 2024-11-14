const users = require('../../fixtures/web/data/users.json')
import { loginAuth } from '../functions/auth'
// let token;

describe.only('Categorias', () => {
    //Incluir
    //Alterar
    //Excluir
    // Buscar
    it('Incluir uma categoria', () => {
        loginAuth(users.users.email, users.users.password).then((token) => {
            cy.log(token)
            cy.request({
                method: 'POST',
                url: '/api/addCategory',
                headers: {
                    'Authorization': token
                },
                body: {
                    "name": "Categoria Cypress3"
                }
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).to.have.property('success').to.eq(true)
                expect(res.body.data).to.have.property('name').to.eq('Categoria Cypress3')
            })
        })
    });
});