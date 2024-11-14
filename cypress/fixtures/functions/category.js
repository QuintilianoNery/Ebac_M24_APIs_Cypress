export const getIdCategory = () => {
    cy.request({
        method: 'GET',
        url: '/public/getCategories',
    }).then((res) => {
        let categoryId = res.body.categories[0]._id;
        Cypress.env('categoryId', categoryId); // Armazena o _id em Cypress.env
        return categoryId;
    });
}

export const postNewCategory = (randomCategoryName, image) => {
    cy.request({
        method: 'POST',
        url: '/api/addCategory',
        headers: {
            'Authorization': Cypress.env('token')
        },
        body: {
            "name": randomCategoryName,
            "photo": image
        }
    })
}
