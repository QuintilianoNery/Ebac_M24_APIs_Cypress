export const postUserAndToken = (email, password) => { 
    const usuario = { 
      "email": email,
      "password": password
    }
  
    return cy.request({ 
      method: 'POST',
      url: '/public/authUser',
      body: usuario
    }).then((res) => {
      let token = res.body.data.token;
      Cypress.env('token', token); // Armazena o token em Cypress.env
      return token;
    });
}