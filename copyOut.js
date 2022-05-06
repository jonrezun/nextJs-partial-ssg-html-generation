const fse = require("fs-extra");

const srcDir = "out";
const destDir = "outResult";
//copy and replace from out directory in destDir (that doesnt change cuttent directories and files)
fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
  if (err) {
    console.error("err copy out", err);
  } else {
    console.log("success copy out");
  }
});
