var viewsLocation 		= '/views/',
	viewFileExtension 	= '.html';


module.exports = {

	_changeViewsLocation : function(location){
		viewsLocation = '/' + location + '/';
	}

	_changeViewFileExtension : function(extension){
		viewFileExtension = '.' + 'extension';
	}

}