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

            describe('library', function(){

                describe('initial setup', function(){
                    it('should have library undefined when initialized', function(){
                        expect(nGrammer.library()).toBeUndefined()
                    })
                })

                describe('generator', function(){

                    var testCorpus = [
                        {name:"Beantown", value:"BOS"},
                        {name:"Phoenix", value:"PHX"}
                    ]

                    describe('with default parameters', function(){
                        var results

                        beforeEach(function(){

                            nGrammer
                                .corpus(testCorpus)

                            spyOn(nGrammer, 'generateNGrams').and.returnValue(["foo"])

                            nGrammer.generateLibrary()

                            results = nGrammer.library()
                        })

                        it('should generate library with set corpus', function(){

                            //First
                            var first = results[0]
                                //name
                                expect(first.name).toBe('Beantown')
                                //grams
                                expect(first.grams).toContain('foo')
                                //value
                                expect(first.value).toBe("BOS")

                            //First
                            var second = results[1]
                                //name
                                expect(second.name).toBe('Phoenix')
                                //grams
                                expect(second.grams).toContain('foo')
                                //value
                                expect(second.value).toBe("PHX")

                        })
                    })
                })

                describe('getter/setter method', function(){

                    var testLib = "foo",
                        results

                    beforeEach(function(){
                        nGrammer.library(testLib)
                        results = nGrammer.library()
                    })
                    it('should retrieve library when called', function(){
                        expect(results).toBe(testLib)
                    })
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
