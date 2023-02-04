const formidable = require("formidable")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")

bodyParser.urlencoded({extended: true})

class routerController {
  async uploadFiles(req, res) {
    try {
      const uploadDir = path.join(__dirname?.split('/api')?.shift() + '/uploads/tmp');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, '0777', true);
      const customOptions = {
        uploadDir: uploadDir,
        keepExtensions: true,
        allowEmptyFiles: false,
        maxFileSize: 5 * 1024 * 1024 * 1024,
        multiples: true
      };
      const form = new formidable.IncomingForm(customOptions);
      form.parse(req, (err, field, files) => {
        if (err) throw err;
        if (!files) return res.json({status: 400, message: 'Файлы не найдены'});
        const uploadFiles = []
        Object.entries(files).forEach((file) => {
          const [key, value] = file;
          const newFilepath = `${uploadDir}/${value.originalFilename}`;
          fs.rename(value.filepath, newFilepath, err => err);
          uploadFiles.push(value.originalFilename)
        });
        return res.json({status: 200, files:uploadFiles});
      });
    } catch (e) {
      console.log(e)
      return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка во время загрузки фалов'})
    }
  }
}

module.exports = new routerController()