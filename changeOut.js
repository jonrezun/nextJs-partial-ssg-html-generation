const fse = require("fs-extra");
const fetch = require("node-fetch");
const glob = require("glob");

const srcDir = "out";
const destDir = "outResult";
const pathName = "id";

//copy and replace from out directory in destDir (that doesnt change cuttent directories and files)
fse.copySync(srcDir, destDir, { overwrite: true }, function (err) {
  if (err) {
    console.error("err copy out", err);
  } else {
    console.log("success copy out");
  }
});

//function for removing files
const removeFile = (path) => {
  fse.remove(path, (err) => {
    if (err) console.error("err delete folfer", err);
    console.log("success delete folfer");
  });
};

//looking for deleted items
async function deleteFiles() {
  //request for getting paths
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "GET",
  });
  const json = await response.json();

  //only for examle!!!
  const result = json.map((el) => {
    if (el.id > 18) {
      return {
        ...el,
        delete: true,
      };
    } else {
      return el;
    }
  });

  //looking for all items with flag "delete"
  const onlyDeleted = [];
  result.forEach((el) => {
    if (el.delete) onlyDeleted.push(String(el.id));
  });

  if (onlyDeleted.length > 0) {
    //delete folder with html
    glob(destDir + `/${pathName}/*`, function (err, res) {
      if (err) {
        console.log("err while deleting file from out", err);
      } else {
        if (res.length) {
          res.forEach((element) => {
            //find name directory (end of path)
            const name = (() => {
              let arr = element.split("/");
              return !!arr.length ? arr[arr.length - 1] : "";
            })();

            //if onlyDeleted contains the same key, then delete it
            if (onlyDeleted.includes(name)) {
              removeFile(element);
            }
          });
        }
      }
    });

    //delete folder with json (as next js filder contains json files connection with html)
    glob(destDir + "/_next/data/**/*", function (err, res) {
      if (err) {
        console.log("err while deleting file from _next", err);
      } else {
        if (res.length) {
          res.forEach((element) => {
            if (element.indexOf(".json") == -1) return;

            //find file name (end of path) and then cut extension to get only file name
            const name = (() => {
              let arr = element.split("/");
              let file = !!arr.length ? arr[arr.length - 1] : "";
              return file.split(".").shift();
            })();

            //if onlyDeleted contains the same key, then delete it
            if (onlyDeleted.includes(name)) {
              removeFile(element);
            }
          });
        }
      }
    });
  }
}

deleteFiles();
