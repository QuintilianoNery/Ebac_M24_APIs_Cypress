const users = require('../../fixtures/web/data/users.json')
describe('Autenticação de Usuários', () => {
    it('Deve realizar a autenticação com sucesso', () => {
        const usuario = {
            "email": users.users.email,
            "password": users.users.password
        }

        cy.request({
            method: 'POST',
            url: '/public/authUser',
            body: usuario
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true)
            expect(res.body.data).to.have.property('token')
        })
    })
})