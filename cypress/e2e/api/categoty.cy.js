const users = require('../../fixtures/web/data/users.json')
import { postUserAndToken } from '../functions/auth.js'
import { getIdCategory } from '../functions/getIdCategory.js'

const faker = require('faker-br')
const randomCategoryName = faker.commerce.department()

describe('Categorias', () => {
    beforeEach(() => {
        //Obtem o token de usuário
        postUserAndToken(users.users.email, users.users.password);
        // Obtém o ID da primeira categoria e armazena em Cypress.env
        getIdCategory();
    });

    it('Incluir categoria', () => {
        cy.request({
            method: 'POST',
            url: '/api/addCategory',
            headers: {
                'Authorization': Cypress.env('token') // Usa o token diretamente
            },
            body: {
                "name": randomCategoryName,
                "photo": "https://www.hostinger.com.br/tutoriais/wp-content/uploads/sites/12/2019/12/O-Que-e-WebP-Um-Guia-para-Iniciantes.webp"
            }
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('success').to.eq(true);
            expect(res.body).to.have.property('message').to.eq('category added');
            expect(res.body.data).to.have.property('name').to.eq(randomCategoryName);
        });
    });

    it('Listar categorias', () => {
        cy.request({
            method: 'GET',
            url: '/public/getCategories',
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('success').to.eq(true);
            expect(res.body.categories[0]._id).to.exist;
        });
    });

    it('Alterar categoria', () => {
        cy.request({
            method: 'PUT',
            url: `/api/editCategory/${Cypress.env('_id')}`,
            headers: {
                'Authorization': Cypress.env('token')
            },
            body: {
                "name": randomCategoryName,
                "photo": "https://www.hostinger.com.br/tutoriais/wp-content/uploads/sites/12/2019/12/O-Que-e-WebP-Um-Guia-para-Iniciantes.webp"
            }
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('success').to.eq(true);
            expect(res.body).to.have.property('message').to.eq('category updated');
        });
    });

    it('Excluir categoria', () => {
        cy.request({
            method: 'DELETE',
            url: `/api/deleteCategory/${Cypress.env('_id')}`,
            body: {
                "authorization": Cypress.env('token')
            }
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('success').to.eq(true);
            expect(res.body).to.have.property('message').to.eq('category deleted');
        });
    });
});