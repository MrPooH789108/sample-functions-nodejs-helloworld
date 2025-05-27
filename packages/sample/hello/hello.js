function main(args) {
    let name = args.name || 'stranger'
    let greeting = 'Hello ' + name + '!'
    console.log(greeting)
    console.log('Your API Key is = ' + process.env.DD_API_KEY)
    return {"body": greeting}
  }

exports.main = main
