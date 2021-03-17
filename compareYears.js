const fs = require('fs')
const iconvlite = require('iconv-lite')
const similarity = require('./utils')

const yearOne = '2016'
const yearTwo = '2018'

const pathOne = `./_compare_${yearOne}.json`
const pathTwo = `./${yearTwo}_flat.json`

const firstFile = fs.readFileSync(pathOne)
const firstText = iconvlite.decode(firstFile, 'utf-8')
const first = JSON.parse(firstText)

const secondFile = fs.readFileSync(pathTwo)
const secondText = iconvlite.decode(secondFile, 'utf-8')
const second = JSON.parse(secondText)

console.log(first.length)
console.log(second.length)
let count = 0
const sumRes = []

for (let i = 0; i < second.length; i++) {
  const firstItem = first[i]
  const secondItem = second[i]

  const p = similarity(firstItem.street, secondItem.street)

  sumRes.push({
    ...secondItem,
    newAdress: firstItem.newAdress,
    p
  })


  // if (firstItem.street === secondItem.street) {
  //   sumRes.push(firstItem)
  //   count++
  // }
  // else {
  //   console.log(firstItem);
  //   console.log(secondItem);
  //   console.log('------------');
  // }
}
console.log(count);
fs.appendFileSync(`_compare_${yearTwo}.json`, JSON.stringify(sumRes))