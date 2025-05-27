function main(args) {
    let name = args.name || 'stranger'
    let greeting = 'Hello ' + name + '!'
    console.log(greeting)
    console.log(process.env.DD_API_KEY)
    return {"body": greeting}
  }

exports.main = main
