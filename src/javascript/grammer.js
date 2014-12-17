var grammer = (function(){

    var _corpus, _library

    var exports = function(){

        var self = this

        return self
    }

    var _cosineComparison = function(grams1, grams2){

        l1 = Math.sqrt(grams1.length)
        l2 = Math.sqrt(grams2.length)

        var sum = 0

        for (gram in grams1){

            if(grams1[gram].search(" ") < 0){
                for (checkgram in grams2){
                    if (grams1[gram].toLowerCase() == grams2[checkgram].toLowerCase()){
                        sum = sum + 1
                    }
                }
            }

        }

        return -Math.acos(sum / (l1 * l2)) * (180/Math.PI)
    }

    exports._scoring = function(type){
        if (type == 'cosine') { return _cosineComparison }
        return exports
    }

    exports.nGramComparison = function(grams1, grams2, params){
        var type = (params) ? (params.type || 'cosine') : 'cosine'
        return exports._scoring(type)(grams1, grams2)
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
                grams: exports.generateNGrams(term.name, params)
            }

            return phrase
        })

        return exports

    }

    exports.generateNGrams = function(term, params){

        var n = (params) ? (params.n || 2) : 2

        return this.recursiveBreak(term, n)
    }

    exports.recursiveBreak = function(str, n){
        var head =[str.slice(0, n)]
        var rest = str.slice(1)
        return (str.length >= n) ? head.concat(this.recursiveBreak(rest, n)) : []
    }

    exports.library = function(){

        if (arguments && arguments.length > 0){
            _library = arguments[0]
            return exports
        }

        return _library
    }

    exports.search = function(term, threshold){

        var self = this

        var searchgrams = self.generateNGrams(term)

        var results = self.library().map(function(phrase){
            return {phrase:phrase, score: self.nGramComparison(searchgrams, phrase.grams)}
        }).sort(function(a, b){
            //Higher scores come first here
            return (a.score > b.score) ? -1 : 1
        })

        return (typeof threshold != 'undefined') ? results.filter(function(w){ return w.score >= threshold}) : results[0]

    }

    if (typeof module !== 'undefined' && modules.exports){
        modules.exports = exports
    }

    return exports


})
