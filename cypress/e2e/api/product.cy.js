const users = require('../../fixtures/web/data/users.json')
import { postUserAndToken } from '../../fixtures/functions/auth.js'
import { getIdProduct } from '../../fixtures/functions/products.js'
import { getIdCategory } from '../../fixtures/functions/category.js'
const faker = require('faker-br')

let name = faker.commerce.productName();
let price = faker.commerce.price();
let quantity = faker.random.number({ min: 1, max: 100 });
let categories = Cypress.env('categoryId');
let description = faker.commerce.productAdjective();
let photos = "https://www.hostinger.com.br/tutoriais/wp-content/uploads/sites/12/2019/12/O-Que-e-WebP-Um-Guia-para-Iniciantes.webp";
let popular = true;
let visible = true;
let location = "Florianópolis, SC, Brasil";
let additionalDetails = [];
let specialPrice = faker.commerce.price();

beforeEach(() => {
    //Obtem o token de usuário
    postUserAndToken(users.users.email, users.users.password, { log: false });
    // Obtém o ID da primeira produto e armazena em Cypress.env
    getIdProduct();
    getIdCategory();
});

describe('Produtos  ', () => {
    it('Incluir produto', () => {
        cy.request({
            method: 'POST',
            url: '/api/addProduct',
            headers: {
                'Authorization': Cypress.env('token')
            },
            body: {
                "name": name,
                "price": price,
                "quantity": quantity,
                "categories": categories,
                "description": description,
                "photos": photos,
                "popular": popular,
                "visible": visible,
                "location": location,
                "additionalDetails": additionalDetails,
                "specialPrice": specialPrice
            }
        })
            .then((res) => {
                cy.validateParametersResponse(res.status, res.body, 200, true)
                expect(res.body).to.have.property('message').to.eq('product added');
            });
    });

    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            url: '/public/getProducts',
        }).then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true)
            expect(res.body.products[0]._id).to.exist;
        });

    });

    it.only('Listar detalhes do produto - getProductDetails', () => {
        cy.request({
            method: 'GET',
            url: `/public/getProductDetails/${Cypress.env('productId')}`,
        })
        .then((res) => {
            cy.validateParametersResponse(res.status, res.body, 200, true)
            expect(res.body.product._id).to.exist;
        });
    });

    it('Alterar produto', () => {

    });
    it('Excluir produto', () => {

    });
})