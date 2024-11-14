export const loginAuth = (email, password) => {
    const usuario = {
      "email": email,
      "password": password
    }
  
    return cy.request({ 
      method: 'POST',
      url: '/public/authUser',
      body: usuario
    }).then((res) => {
      return res.body.data.token
    })
  }
  