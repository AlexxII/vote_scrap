const fs = require('fs')
const iconvlite = require('iconv-lite')
const similarity = require('./utils')

const year = '2014'
const path = `./${year}_flat.json`
const path2021 = './2021_flat.json'

const data2021Path = fs.readFileSync(path2021)
const data2021Text = iconvlite.decode(data2021Path, 'utf-8')
const data2021 = JSON.parse(data2021Text)

const rawDataFile = fs.readFileSync(path)
const rawDataJSON = iconvlite.decode(rawDataFile, 'utf-8')
const rawData = JSON.parse(rawDataJSON)

// const cityObj = {
//   'город': 'г',
//   'населенный пункт': 'нп',
//   'поселок': 'нп',
//   'ж.д. станция': 'ж/д ст',
//   'село': 'c'
// }

// const streetObj = {
//   'ул.': 'улица',
//   'пер.': 'переулок',
//   'просп.': 'улица',
//   'ул.': 'улица',
//   'ул.': 'улица',
// }

const streetNumReg = /\d{1,}/gi
let sumResult = []
for (let i = 0; i < rawData.length; i++) {
  // for (let i = 0; i < 1; i++) {
  const item = rawData[i]
  const tik = item.tik
  const streetNumMatch = item.street.match(streetNumReg)
  const streetNum = streetNumMatch ? streetNumMatch[0] : null
  const tiks2021 = data2021[tik]
  // 2021 год
  let max = 0
  let result = {}
  for (let j = 0; j < tiks2021.length; j++) {
    const tikItem = tiks2021[j]
    const street = tikItem.title.split(',').slice(2,).join(' ').replace(/город/gi)
    const streetNum2021Match = street ? street.match(streetNumReg) : null
    const streetNum2021 = streetNum2021Match ? streetNum2021Match[0] : null
    const p = similarity(item.street, street)
    if (p > max) {
      if (streetNum2021 === streetNum) {
        max = p
        result = {
          ...item,
          postIndex: tikItem.title.split(',')[0],
          newAdress: tikItem.title,
          p
        }
      }
    }
  }
  sumResult.push(result)
}

fs.appendFileSync(`_compare_${year}.json`, JSON.stringify(sumResult))