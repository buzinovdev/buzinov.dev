const Categories = require('../models/categories.model.js')
const Project = require('../models/project.model.js')
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
bodyParser.urlencoded({extended: true})
module.exports.getCategories = async function (req, res) {
  try {
    const categories = [{
      _id: '63c82fd86cd887821052f282',
      title: 'Агрегаторы и доски объявлений'
    }, {_id: '63c82ffd6cd887821052f283', title: 'Блоги'}, {
      _id: '63c830556cd887821052f284',
      title: 'Веб-приложения'
    }, {_id: '63c8305d6cd887821052f285', title: 'Веб-сервисы'}, {
      _id: '63c830686cd887821052f286',
      title: 'Интернет-магазины'
    }, {_id: '63c830716cd887821052f287', title: 'Коммерческие сайты'}, {
      _id: '63c8307d6cd887821052f288',
      title: 'Корпоративные порталы'
    }, {_id: '63c830866cd887821052f289', title: 'Лендинги'}, {
      _id: '63c8308d6cd887821052f28a',
      title: 'Новостные ресурсы'
    }, {_id: '63c830a16cd887821052f28b', title: 'Онлайн-кинотеатры'}, {
      _id: '63c830ab6cd887821052f28c',
      title: 'Портфолио'
    }, {_id: '63c830b46cd887821052f28d', title: 'Промо-сайты'}, {
      _id: '63c830bc6cd887821052f28e',
      title: 'Сайт-визитка'
    }, {_id: '63c830c56cd887821052f28f', title: 'Сайты знакомств'}, {
      _id: '63c830cd6cd887821052f290',
      title: 'Сайты услу'
    }, {_id: '63c830d46cd887821052f291', title: 'Соцсети'}, {
      _id: '63c830dc6cd887821052f292',
      title: 'Справочники'
    }, {_id: '63c830e46cd887821052f293', title: "Форумы"}]
    //const categories = await Categories.find()
    return res.json(categories)
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при получении категорий'})
  }
}
module.exports.getProjects = async function (req, res) {
  try {
    const projects = await Project.find()
    return res.json(projects)
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при получении спаска проектов'})
  }
}
module.exports.add = async function (req, res) {
  try {
    const {title, dir, ready, link, category, preview, description, stack} = req.body
    const tmpDir = path.join(__dirname?.split('/api')?.shift() + '/uploads/tmp')
    const uploadDir = path.join(__dirname?.split('/api')?.shift() + `/uploads/projects/${dir}`);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, '0777', true);
    fs.rename(`${tmpDir}/${preview}`, `${uploadDir}/${preview}`, function (err) {
      if (err) throw err
    })
    await Project.create(req.body)
    return res.json({status: 400, msgActive: true, msgType: 'success', msg: 'Проект добавлен', token: ''})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при добавлении проекта'})
  }
}
module.exports.update = async function (req, res) {
  try {
    const {id, title, oldDir, dir, ready, link, category, preview, description, stack} = req.body
    if (oldDir !== dir) {
      const baseDir = path.join(__dirname?.split('/api')?.shift() + '/uploads/projects/')
      fs.renameSync(baseDir + oldDir, baseDir + dir)
    }
    if (preview.length > 0) {
      const tmpDir = path.join(__dirname?.split('/api')?.shift() + '/uploads/tmp')
      const uploadDir = path.join(__dirname?.split('/api')?.shift() + `/uploads/projects/${dir}`);
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, '0777', true);
      fs.rename(`${tmpDir}/${preview}`, `${uploadDir}/${preview}`, function (err) {
        if (err) throw err
      })
      await Project.findByIdAndUpdate(id, {title, ready, link, category, preview, description, stack});
    } else {
      await Project.findByIdAndUpdate(id, {title, ready, link, category, description, stack});
    }
    return res.json({status: 200, msgActive: true, msgType: 'success', msg: 'Проект обновлен'})
  } catch (e) {
    console.log(e)
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка при обновлении проекта'})
  }
}