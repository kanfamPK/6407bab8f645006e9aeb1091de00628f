module.exports.validate = function(req,res,next){
	var nameErr,phoneErr,emailErr,passwordErr;
	if (req.body.name == '') nameErr = 'Name is required !';
	if (req.body.phone == '') phoneErr = 'Phone number is required !';
	if (req.body.email == '') emailErr = 'Email is required !';
	if (req.body.password == '') passwordErr = 'Password is required !';
	if (nameErr || phoneErr || emailErr || passwordErr){
		res.render('users/create.pug',{
			nameErr: nameErr,
			phoneErr: phoneErr,
			emailErr: emailErr,
			passwordErr: passwordErr,
			inputValues: req.body
		});
		return;
	}else res.locals.passedValidate = true;
	next();
}