(function(){

    define(['src/javascript/grammer'], function(){



        describe('Grammer library', function(){

            var nGrammer

            beforeEach(function(){
                nGrammer = grammer()
            })

            describe('corpus module', function(){

                describe('initial setup', function(){
                    it('should have corpus undefined when initialized', function(){
                        expect(nGrammer.corpus()).toBeUndefined()
                    })
                })

                describe('getter/setter method', function(){

                    var response,
                        testCorpus = [
                            {name:"New York", value:"NYC"},
                            {name:"New York City", value:"NYC"},
                            {name:"Beantown", value:"BOS"},
                            {name:"Phoenix", value:"PHX"}
                        ]

                    beforeEach(function(){

                        nGrammer
                            .corpus(testCorpus)

                        response = nGrammer.corpus()
                    })

                    it('should set corpus with given dataset when called', function(){
                        expect(response).toContain(testCorpus[0])
                        expect(response).toContain(testCorpus[1])
                        expect(response).toContain(testCorpus[2])
                        expect(response).toContain(testCorpus[3])
                    })
                })

            })

            describe('library module', function(){

                describe('generator', function(){
                    it('should generate library with set corpus')
                })

                describe('getter method', function(){
                    it('should retrieve library when called')
                })

                describe('setter method', function(){
                    it('should set library when called')
                })

            })

            describe('nGram comparison module', function(){
                describe('comparison function', function(){
                    describe('with default parameters', function(){
                        it('should compare n-grams with cosine distance')
                    })
                })

                describe('distance measures:', function(){
                    describe('cosine', function(){
                        describe('test case 1', function(){
                            it('should pass')
                        })
                    })
                })
            })

            describe('search module', function(){
                describe('search function', function(){
                    describe('with default parameters', function(){
                        it('should return highest scoring phrase with cosine distance')
                    })

                    describe('with similarity threshold', function(){
                        it('should only return phrases with similarity measure above given threshold')
                    })
                })
            })

        })
    })

})()
