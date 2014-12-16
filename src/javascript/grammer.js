var grammer = (function(){

    var _corpus

    var exports = function(){

        var self = this

        return self
    }

    exports.corpus = function(){

        if (arguments && arguments.length > 0){
            _corpus = arguments[0]
            return exports
        }

        return _corpus
    }

    exports.generateLibrary = function(){

    }

    if (typeof module !== 'undefined' && modules.exports){
        modules.exports = exports
    }

    return exports


})
