describe('URL Varifications ', () => { 
  it(' Title Verify ', () => { 
    cy.visit('http://localhost:5173/')
    cy.title().should('eq','Vite + React')
  })
})

describe('Add emp with Valid Data', () => {
  it('new employee with valid data', () => {
    cy.visit('http://localhost:5173/')
    cy.get('a.inline-block.rounded').click();
    cy.get('h1.text-center.text-xl.font-bold').should('have.text', 'Add Employee');
    cy.get('#name').type('Arjun Chaurasiya');
    cy.get('#dob').clear()
    cy.get('#dob').type('02/05/1997');
    cy.get('#salary').clear().type('50000');
    cy.contains('Relieving Date').next().find('input').clear().type('04/20/2024');
    cy.get('#contact').type('7906973405');
    cy.get('#joining\\ date').clear().type('03/21/2024');
    cy.get('#status').select('inactive');
    cy.get('button').click();
    //validate the data in the list page
    cy.contains('td', 'Arjun Chaurasiya').should('exist');
  });
});

//Add a new employee with invalid data

describe('Add a new employee with invalid data', () => {
  it('Invalid Data Test Case 1', () => {
    cy.visit('http://localhost:5173/')
    cy.get('a.inline-block.rounded').click();
  
    cy.get('button').click();
  
    cy.contains('Please fill all fields.').should('exist'); 
  });
});

describe('Add a new employee with invalid data', () => {
  it('Invalid Data Test Case 2', () => {
    cy.visit('http://localhost:5173/')
    cy.get('a.inline-block.rounded').click();
    cy.get('#joining\\ date').clear().type('03/21/2024');
    cy.get('#name').type('Arjun Chaurasiya');
    cy.get('#dob').clear()
    cy.get('#dob').type('02/05/1997');
     cy.get('#salary').clear().type('50000');
    cy.contains('Relieving Date').next().find('input').clear().type('04/20/2024');
    cy.get('#status').select('inactive');
    cy.get('button').click();
    cy.contains('Please fill all fields.').should('exist'); 
  });
});

      //Edit an existing employee's details.
    describe('Edit an existing employees details.', () => {
    it('Update  with Valid Data', () => {
    cy.visit('http://localhost:5173/')
    cy.get('a.inline-block.rounded').click();
    cy.get('#name').type('Arjun Chaurasiya');
    cy.get('#dob').clear()
    cy.get('#dob').type('02/05/1997');
    cy.get('#salary').clear().type('50000');
    cy.contains('Relieving Date').next().find('input').clear().type('04/20/2024');
    cy.get('#contact').type('7906973405');
    cy.get('#joining\\ date').clear().type('03/21/2024');
    cy.get('#status').select('inactive');
    cy.get('button').click();
// Update page
    cy.get('td > a[href^="/update-employee/"]').contains('Edit').click();
    cy.get('h1.text-center.text-xl.font-bold').should('have.text', 'Update Employee');
    cy.get('#name').clear().type('Arjun Chaurasiya');
    cy.get('#dob').clear().type('02/05/1997');
    cy.get('#salary').clear().type('50000');
    cy.contains('Relieving Date').next().find('input').clear().type('04/20/2024');
    cy.get('#contact').clear().type('7906973405');
    cy.get('#joining\\ date').clear().type('03/21/2024');
    cy.get('#status').select('active');
    cy.get('button').click();
    //validate the change in the list 
    cy.log('validate the change in the list ')
    const name = 'Arjun Chaurasiya';
      const expectedStatus = 'active';
    cy.contains('td', name).then(($tdName) => {
      const $statusTd = $tdName.siblings('td').eq(5);
      expect($statusTd).to.contain(expectedStatus);
      cy.log(' Status has been changes')
    });
      });
});

//Update with Incomplete Data
describe('Update with Incomplete Data ', () => {
  it('AUpdate with Incomplete Data ', () => {
    cy.visit('http://localhost:5173/')
    cy.get('a.inline-block.rounded').click();
    cy.get('#name').type('Arjun Chaurasiya');
    cy.get('#dob').clear()
    cy.get('#dob').type('02/05/1997');
    cy.get('#salary').clear().type('50000');
    cy.contains('Relieving Date').next().find('input').clear().type('04/20/2024');
    cy.get('#contact').type('7906973405');
    cy.get('#joining\\ date').clear().type('03/21/2024');
    cy.get('#status').select('inactive');
    cy.get('button').click();
// Update page with Incomplete data
    cy.log('Update with Incomplete data')
    cy.get('td > a[href^="/update-employee/"]').contains('Edit').click();
    cy.get('h1.text-center.text-xl.font-bold').should('have.text', 'Update Employee');
    cy.get('#name').clear();
    cy.get('#dob').clear();
    cy.get('#salary').clear().type('50000');
    cy.contains('Relieving Date').next().find('input').clear().type('04/20/2024');
    cy.get('#contact').clear().type('7906973405');
    cy.get('#joining\\ date').clear().type('03/21/2024');
    cy.get('#status').select('active');
    cy.get('button').click();
    cy.contains('Please fill all fields.').should('exist'); 
  });
});

describe('Update with Valid Data  ', () => {
  it('Update with Valid Data', () => {
    cy.visit('http://localhost:5173/')
    cy.get('a.inline-block.rounded').click();
    cy.get('#name').type('Arjun Chaurasiya');
    cy.get('#dob').clear()
    cy.get('#dob').type('02/05/1997');
    cy.get('#salary').clear().type('50000');
    cy.contains('Relieving Date').next().find('input').clear().type('04/20/2024');
    cy.get('#contact').type('7906973405');
    cy.get('#joining\\ date').clear().type('03/21/2024');
    cy.get('#status').select('inactive');
    cy.get('button').click();
// Update page with Incomplete data
    cy.log('Update with Invalid data')
    cy.get('td > a[href^="/update-employee/"]').contains('Edit').click();
    cy.get('h1.text-center.text-xl.font-bold').should('have.text', 'Update Employee');
    cy.get('#dob').type('02/05/1997');
    cy.get('#salary').clear().type('Salary should be number only ');
    cy.contains('Relieving Date').next().find('input').clear().type('04/20/2024');
    cy.get('#contact').clear().type('ha ha ha this is bug');
    cy.get('#joining\\ date').clear().type('03/21/2024');
    cy.get('#status').select('active');
    cy.get('button').click();
    cy.contains('Please fill all fields with valid data type.').should('exist'); 
  });
});

     //- Verify that the status of an employee can be changed between "active" and "inactive".

describe('Verify that the status of an employee can be changed between "active" and "inactive".', () => {
  it('Change Status active to in active', () => {
    cy.visit('http://localhost:5173/')
    cy.get('a.inline-block.rounded').click();
    cy.get('#name').type('Arjun Chaurasiya');
    cy.get('#dob').clear()
    cy.get('#dob').type('02/05/1997');
    cy.get('#salary').clear().type('50000');
    cy.contains('Relieving Date').next().find('input').clear().type('04/20/2024');
    cy.get('#contact').type('7906973405');
    cy.get('#joining\\ date').clear().type('03/21/2024');
    cy.get('#status').select('active');
    cy.get('button').click();
// Update page to change the status
    cy.get('td > a[href^="/update-employee/"]').contains('Edit').click();
    cy.get('h1.text-center.text-xl.font-bold').should('have.text', 'Update Employee');
    cy.get('#name').clear().type('Arjun Chaurasiya');
    cy.get('#dob').clear().type('02/05/1997');
    cy.get('#salary').clear().type('50000');
    cy.contains('Relieving Date').next().find('input').clear().type('04/20/2024');
    cy.get('#contact').clear().type('7906973405');
    cy.get('#joining\\ date').clear().type('03/21/2024');
    cy.get('#status').select('inactive');
    cy.get('button').click();
    // Validating the status Corresponding Arjun
    cy.log('validating the status Corresponding Arjun')
      const name = 'Arjun Chaurasiya';
      const expectedStatus = 'inactive';
    cy.contains('td', name).then(($tdName) => {
      const $statusTd = $tdName.siblings('td').eq(5);
      expect($statusTd).to.contain(expectedStatus);
      cy.log(' Status has been changes')
    });
      });
});
  // Delete an employee record.

  describe('Delete an employee record.', () => {
  it('Add Employee data for Delete', () => {
    cy.visit('http://localhost:5173/')
    cy.get('a.inline-block.rounded').click();
    cy.get('h1.text-center.text-xl.font-bold').should('have.text', 'Add Employee');
    var empname = cy.get('#name').type('Arjun Chaurasiya');
    cy.get('#dob').clear()
    cy.get('#dob').type('02/05/1997');
    cy.get('#salary').clear().type('50000');
    cy.contains('Relieving Date').next().find('input').clear().type('04/20/2024');
    cy.get('#contact').type('7906973405');
    cy.get('#joining\\ date').clear().type('03/21/2024');
    cy.get('#status').select('inactive');
    cy.get('button').click();
    cy.log('Delete an employee record.')
    //Delete record.
    cy.get('button.border-red-600').click();
    // Validated deleted record 
    const expectedName = empname;
    cy.contains('td', expectedName).should('not.exist');
 });
});


