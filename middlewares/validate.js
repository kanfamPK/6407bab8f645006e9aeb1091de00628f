module.exports.validate = function(req,res,next){
	var nameErr,phoneErr;
	if (req.body.name == '') nameErr = 'Name is required !';
	if (req.body.phone == '') phoneErr = 'Phone number is required !';
	if (nameErr || phoneErr){
		res.render('users/create.pug',{
			nameErr: nameErr,
			phoneErr: phoneErr,
			inputValues: req.body
		});
		return;
	}else res.locals.passedValidate = true;
	next();
}