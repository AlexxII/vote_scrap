const fs = require('fs')
const iconvlite = require('iconv-lite')
const tiks = require('./const')

const year = '2018'
const path = `./${year}.json`
const path2021 = './data/2021.csv'

const data2021 = fs.readFileSync(path2021)
const data2021Text = iconvlite.decode(data2021, 'cp1251')

const rawDataFile = fs.readFileSync(path)
const rawDataJSON = iconvlite.decode(rawDataFile, 'utf-8')
const rawData = JSON.parse(rawDataJSON)


// плоские номер для поиска дублей номеров УИКов
const flat = rawData.reduce((acum, item) => {
  acum.push(...item.sectors)
  return acum
}, [])
const flatNumbers = flat.map(obj => obj.sector)

// получаем структуру уиков как ниже
const flatSectors = rawData.reduce((acum, item) => {
  const sectors = item.sectors
  const updateSectors = sectors.map(obj => ({ ...obj, tik: item.number }))
  acum.push(...updateSectors)
  return acum
}, [])
fs.appendFileSync(`${year}_flat.json`, JSON.stringify(flatSectors))
return


const dataArray = data2021Text.split('\n')
// {'Мурманская ТИК': 1, ...}
let needData = {}
for (let key in tiks) {
  needData[tiks[key].title] = tiks[key].number
}
let result = []
for (let i = 1; i < dataArray.length; i++) {
  const str = dataArray[i]
  // пропуск пустой строки
  if (str.trim() === '') {
    continue
  }
  const strArray = str.split(';')
  // пропускаем ТИКи
  if (+strArray[1] === 0) {
    continue
  }
  const tik = strArray[0]
  const uik = strArray[1]
  const uikTitle = strArray[2]
  const postIndex = uikTitle.split(',')[0]
  result.push({
    tik,
    sector: uik,
    postIndex,
    title: uikTitle
  })

}
const dd = result.reduce((acum, item) => {
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
// console.log(dd);
fs.appendFileSync(`2021_flat.json`, JSON.stringify(dd))