const fs = require('fs'),
      path = require('path'),
      { promisify } = require('util'),
      Mustache = require('mustache')

const readFileAsync = promisify(fs.readFile),
      writeFileAsync = promisify(fs.writeFile)

const output = 'dist',
      files = [
  'browser.mustache',
  'node.mustache'
]

;(async () => {
  const code = await readFileAsync(path.join(__dirname, '../ansilove.js'), 'utf8')
        
  for(let i = 0; i < files.length; i++) {
    const file = files[i],
          template = await readFileAsync(path.join(__dirname, file), 'utf8'),
          dist = Mustache.render(template, { code })

    await writeFileAsync(path.join(output, `${path.parse(file).name}.js`), dist, 'utf8')
  }
})()