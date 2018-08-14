module.exports = (api, opts, rootOpts) => {

  // add npm package dependencies
  api.extendPackage({
    dependencies: {
      "vue-codemirror": "^4.0.5"
    }
  });
  // copy plugin code to user dir
  api.render({
    './src/plugins/codemirror.js': './templates/default/src/plugins/codemirror.js'
  });

    // modify main.ts/main.js
    const fs = require('fs');
    let tsPath = api.resolve('src/main.ts');
    let jsPath= api.resolve('src/main.js');
    let tsExists=fs.existsSync(tsPath);
    let jsExists=fs.existsSync(jsPath);
    if(!tsExists&&!jsExists){
      throw new Error('No entry fontd:[src/main.ts or src/main.js]');
    }
    const mainPath=tsExists? 'src/main.ts':'src/main.js'
    api.injectImports(mainPath,`import './plugins/codemirrot';`);
}