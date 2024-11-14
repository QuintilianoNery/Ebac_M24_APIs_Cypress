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

export const postNewproduct = (name, price, quantity, categories, description, photos, popular, visible, location, additionalDetails, specialPrice) => {
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
}
