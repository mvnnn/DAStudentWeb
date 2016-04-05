exports.preferences=function(req,res){
  res.render('Preferences');
};

exports.changePass=function(req,res){
  res.render('ChangePass');
};

exports.help=function(req,res){
  res.render('Help');
};

exports.logout=function(req,res){
  res.render('Logout');
};
