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

function myFunction(dataContext: DataContext, { converters, expressions }: Extras): any {
  let val = expressions.fetchValueExpression({ expressionStr: 'pageData.Qty', dataContext: dataContext })

  if (val > 100) {
    return 'Quantity < 100'
  }
}

function calculateTotal(formData: any): any {
  let total = 0

  formData.JobProducts.forEach((item: any, index: any) => {
    total += item.Qty
  })

  return total
}

exports = {
  myFunction: myFunction,
  calculateTotal: calculateTotal
}
