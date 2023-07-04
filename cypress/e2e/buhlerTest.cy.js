describe('buhler test', () => {

  const url = 'https://64a02e19ed3c41bdd7a713b4.mockapi.io/users'

  before('deleteUser', () => {

    cy.request('GET', url).then((response) => {

      var users = response.body

      for (var i = 0; i < users.length; i++) {
        cy.request('DELETE', url + '/' + users[i].id).then((response) => {
          expect(response.status).to.eq(200)
        })
      }
      expect(response.status).to.eq(200)
    })
  })

  it('verify successful creation of a new user', () => {
    cy.request('POST', url, { name: 'user1', email: 'email@email.com', password: '1234', id: 1 }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('name', 'user1')
      expect(response.body).to.have.property('email', 'email@email.com')
      expect(response.body).to.have.property('password', '1234')
    })

    cy.request('GET', url + '/1').then((response) => {
      expect(response.status).to.eq(200)
    })

    cy.request('GET', url).then((response) => {
      expect(response.status).to.eq(200)
    })

    cy.request('POST', url, { name: 'user2', email: 'email@email.com', password: '1234', id: 1 }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('name', 'user2')
      expect(response.body).to.have.property('email', 'email@email.com')
      expect(response.body).to.have.property('password', '1234')
    })

  })
})
