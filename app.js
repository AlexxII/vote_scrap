const fs = require('fs')
const iconvlite = require('iconv-lite')

const cities = require('./const')
const folderName = './data/' + '2011/'

for (let key in cities) {
  // console.log(key);
  const fileName = `${key}.csv`
  const path = folderName + fileName
  fs.readFile(path,
    function (error, data) {
      if (error) throw error
      const city = cities[key]
      const cp1251Text = iconvlite.decode(data, 'cp1251')
      const strArray = cp1251Text.split('\n')
      for (let j = 1; j < strArray.length; j++) {
        
      }
    }
  )
}