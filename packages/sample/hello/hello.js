function main(args) {
    let name = args.name || process.env.DD_API_KEY
    let greeting = 'Hello ' + name + '!'
    console.log(greeting)
    return {"body": greeting}
  }

exports.main = main
