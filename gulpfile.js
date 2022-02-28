const { src, dest } = require('gulp');
const fs = require("fs");
const replace = require("gulp-replace");
const TemplateName = "GetOffMyLawn"

exports.postInstall = function () {
  const projectFile = fs.readdirSync("./").find(d => d.endsWith(".wlp"));
  
  const projectContents = fs.readFileSync(projectFile);
  const project = JSON.parse(projectContents);
  const projectName = project.settings.project.name;
  if(!fs.existsSync(`./${TemplateName}-bundle.js`)) {
    console.warn("Post Install script already executed...")
    return src('.'); // do nothing
  }
  fs.renameSync(`./${TemplateName}-bundle.js`, `${projectName}-bundle.js`)
  // fs.unlinkSync('gulpfile.js'); //TODO: Need to update in package.json as well.
  return src(['js/**/*.js', '*.wlp','*.json','*.js'],{base: "./"})
    .pipe(replace(TemplateName, projectName))
    .pipe(dest("./"));
}