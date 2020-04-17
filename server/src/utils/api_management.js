module.exports = function () {

	this.createErrorObject = function (errorType, errorMessage) {
        var errorObj = {};        
        errorObj.errorType = errorType;
        errorObj.errorMessage = errorMessage;
        return errorObj;
	}
	
}