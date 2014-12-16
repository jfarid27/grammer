var grammer = (function(){

    var _corpus, _library

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

    exports.generateLibrary = function(params){

        if (!_corpus){
            return
        }

        _library = _corpus.map(function(term){

            var phrase = {
                name: term.name,
                value: term.value,
                grams: exports.generateNGrams(term, params)
            }

            return phrase
        })

    }

    exports.generateNGrams = function(term){
        return
    }

    exports.library = function(){
        if (arguments && arguments.length > 0){
            _library = arguments[0]
            return exports
        }

        return _library
    }

    if (typeof module !== 'undefined' && modules.exports){
        modules.exports = exports
    }

    return exports


})
