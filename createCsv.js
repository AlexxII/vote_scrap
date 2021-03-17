const fs = require('fs')
const iconvlite = require('iconv-lite')

const year = '2016'

const path = `./_compare_${year}.json`

const dataFile = fs.readFileSync(path)
const dataText = iconvlite.decode(dataFile, 'utf-8')
const data = JSON.parse(dataText)

console.log(data.length);

const dData = data.reduce((acum, item) => {
  if (acum[item.tik]) {
    acum[item.tik] = [
      ...acum[item.tik],
      item
    ]
  } else {
    acum[item.tik] = [item]
  }
  return acum
}, {})
console.log(dData);
/*
for (let i = 0; i < data.length; i++) {
  const item = data[i]
  console.log(item.newAdress);
}
*/