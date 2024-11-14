const users = require('../../fixtures/web/data/users.json')
import { postUserAndToken } from '../../fixtures/functions/auth.js'
import { getIdCategory, postNewCategory } from '../../fixtures/functions/category.js'
const faker = require('faker-br')

const image = "https://www.hostinger.com.br/tutoriais/wp-content/uploads/sites/12/2019/12/O-Que-e-WebP-Um-Guia-para-Iniciantes.webp"
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
                "photo": image
            }
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true)
            expect(res.body).to.have.property('message').to.eq('category added');
            expect(res.body.data).to.have.property('name').to.eq(randomCategoryName);
        });
    });

    it('Listar categorias', () => {
        postNewCategory(randomCategoryName, image)
        cy.request({
            method: 'GET',
            url: '/public/getCategories',
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true)
            expect(res.body.categories[0]._id).to.exist;
        });
    });

    it('Alterar categoria', () => {
        cy.log(Cypress.env('categoryId'))
        postNewCategory(randomCategoryName, image)
        cy.request({
            method: 'PUT',
            url: `/api/editCategory/${Cypress.env('categoryId')}`,
            headers: {
                'Authorization': Cypress.env('token')
            },
            body: {
                "name": randomCategoryName,
                "photo": image
            }
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true)
            expect(res.body).to.have.property('message').to.eq('category updated');
        });
    });

    it('Excluir categoria', () => {
        postNewCategory(randomCategoryName, image)
        cy.request({
            method: 'DELETE',
            url: `/api/deleteCategory/${Cypress.env('categoryId')}`,
            body: {
                "authorization": Cypress.env('token')
            }
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true)
            expect(res.body).to.have.property('message').to.eq('category deleted');
        });
    });
});