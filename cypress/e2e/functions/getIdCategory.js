export const getIdCategory = () => {
    cy.request({
        method: 'GET',
        url: '/public/getCategories',
    }).then((res) => {
        let id = res.body.categories[0]._id;
        Cypress.env('_id', id); // Armazena o token em Cypress.env
        return id;
    });
}