const users = require('../../fixtures/web/data/users.json')
let token
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
            //healthcheck
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property('success').to.eq(true)
            expect(res.body.data).to.have.property('token')
            // token = res.body.data.token
        })
    })
})