var fs = require('fs');

//create files in target directory
var numStudents=50;
function createFiles(dir){
    var _dir =dir;
    var stats = fs.statSync(_dir);
//    console.log(stats.isDirectory());
    if(stats.isDirectory()){
        for(var i=0;i<numStudents;i++){
            var fileName = Math.floor(100+Math.random()*100);
            fs.appendFileSync(_dir+'/'+fileName,' ');
        }}
    }

//get files from directory
function getFiles(dir,files_){
    files_=files_||[];
    var files = fs.readdirSync(dir);
    for (var i in files) {
        var name = files[i];
        files_.push(name);
        }
    return files_;
}

//Compare elements, e.g. compare elements in Development with Automation.indexOf... 
function compare(f1,f2,f3){
    var f1_=f1.toString().split(',')
    var f2_=f2.toString().split(',').filter(function(a){
        console.log('a is: '+ a+ ": "+f1_.indexOf(a));
        return f1_.indexOf(a)!==-1;
    });
    console.log("First round picks are:"+ f2_);
    var f3_=f3.toString().split(',').filter(function(b){
        console.log('b is: '+ b+ ": "+f1_.indexOf(b));
        return f2_.indexOf(b)!==-1;
    })
    console.log("Final round picks:"+ f3_);
}

//delete all files but not removing the folder
function rmDir(dirPath, removeSelf) {
  if (removeSelf === undefined)
    removeSelf = true;
  try { var files = fs.readdirSync(dirPath); }
  catch(e) { return; }
  if (files.length > 0)
    console.log('removing: '+dirPath);  
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
      else
        rmDir(filePath);
    }
  if (removeSelf)
    fs.rmdirSync(dirPath);
};

function main(){
    
    createFiles('Automation');
    var file1= getFiles('Automation');
    console.log("Automation team are: "+file1);
    rmDir('Automation',false);
    createFiles('Development');
    var file2= getFiles('Development');
    console.log("Development team are: "+file2);
    rmDir('Development',false);
    createFiles('Mobile');
    var file3= getFiles('Mobile');
    console.log("Mobile team are: "+file3);
    rmDir('Mobile',false);
    compare(file1,file2,file3);
}

main();
////Delete entire folders including the directory
//function rmDir(dirPath) {
//    try {
//        var files = fs.readdirSyn(dirPath); 
//        }
//    catch(e) { return; }
//    if (files.length > 0)
//        for (var i = 0; i < files.length; i++) {
//          var filePath = dirPath + '/' + files[i];
//          if (fs.statSync(filePath).isFile())
//            fs.unlinkSync(filePath);
//          else
//            rmDir(filePath);
//        }
//    console.log('deleting..');
//    fs.rmdirSync(dirPath);
//};



