const fs = require('fs')
const iconvlite = require('iconv-lite')

const tiks = require('./const')
const year = '2011'
const folderName = `./data/${year}/`
let allRes = []

for (let key in tiks) {
  const fileName = `${key}.csv`
  const path = folderName + fileName
  const data = fs.readFileSync(path)
  const tik = tiks[key]
  const cp1251Text = iconvlite.decode(data, 'cp1251')
  const strArray = cp1251Text.split('\n')
  let result = {
    tik,
    sectors: []
  }
  for (let j = 1; j < strArray.length; j++) {
    // попадаются пустые строки
    if (strArray[j] === '') {
      console.log('Пустая строка -> пропускаем');
      break
    }
    const dataArray = strArray[j].split(';')
    const sectors = dataArray[2] ? dataArray[2].split(',') : null
    // нет информации по количеству участков
    if (!sectors) {
      console.log('Нет информации по количеству участков');
      console.log(strArray[j]);
      break
    }
    const sectorsCount = dataArray[3]
    // не совпадает количество участков
    if (sectors.length !== +sectorsCount) {
      console.log('Не совпадает количество участков');
      console.log(sectors.length);
      console.log(sectorsCount);
      console.log(strArray[j]);
      break
    }
    for (let k = 0; k < sectors.length; k++) {
      const sector = sectors[k].trim()
      result.sectors.push({
        street: dataArray[0],
        describe: dataArray[1] ? dataArray[1] : null,
        sector
      })
    }
  }
  allRes.push(result)
}
fs.appendFileSync('dataA.json', JSON.stringify(allRes))
console.log('А ВСЕ!');