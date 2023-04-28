// **********************************
// * Sample code for frontend side  *
// **********************************
type DataContext = {}

type Expressions = {
  fetchValueExpression: (args: { expressionStr: string; dataContext: DataContext }) => any
}

type Extras = {
  converters: any
  expressions: Expressions
}

function myFunction(dataContext: DataContext, { expressions }: Extras): any {
  let val = expressions.fetchValueExpression({ expressionStr: 'pageData.Qty', dataContext: dataContext })

  if (val > 100) {
    return 'Quantity < 100'
  }
}

function calculateTotal(formData: any): any {
  let total = 0

  formData.JobProducts.forEach((item: any, _index: any) => {
    total += item.Qty
  })

  return total
}

// Note: The exported functions and names are depended on the Developer.
exports = {
  myFunction: myFunction,
  calculateTotal: calculateTotal
}
