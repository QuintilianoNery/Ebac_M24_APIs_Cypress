export const getIdProduct = () => {
    cy.request({
        method: 'GET',
        url: '/public/getProducts',
    }).then((res) => {
        let productId = res.body.products[0]._id;
        Cypress.env('productId', productId); // Armazena o _id em Cypress.env
        return productId;
    });
}