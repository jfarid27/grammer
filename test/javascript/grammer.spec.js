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

            describe('nGram generator module', function(){
                describe('when given a term', function(){

                    var term = "Test Term"

                    describe('with default parameters', function(){

                        var expected = ["Te", "es", "st", "er", "rm"],
                        results

                        beforeEach(function(){
                            spyOn(nGrammer, 'recursiveBreak').and.returnValue(['foo'])
                            results = nGrammer.generateNGrams(term)
                        })

                        it('should return a valid list of bigrams', function(){
                            expect(results).toContain('foo')
                        })
                    })
                })
            })

            describe('recursive n-gram generator', function(){
                describe('test case 1:', function(){

                    var testString = "abc",
                        expected = ['ab', 'bc'],
                        results

                    beforeEach(function(){
                        results = nGrammer.recursiveBreak(testString, 2)
                    })

                    it('should return valid n-grams', function(){
                        expect(results).toContain(expected[0])
                        expect(results).toContain(expected[1])
                    })
                })
            })

            describe('nGram comparison module', function(){
                describe('comparison function', function(){

                    describe('with default parameters', function(){
                        var expected = 20,
                            testGram1 = ["fo"],
                            testGram2 = ["ba"],
                            mockScoring = function(){ return 20},
                            results

                        beforeEach(function(){
                            spyOn(nGrammer, '_scoring').and.returnValue(mockScoring)
                            results = nGrammer.nGramComparison(testGram1, testGram2)
                        })
                        it('should compare n-grams with cosine distance', function(){
                            expect(nGrammer._scoring).toHaveBeenCalledWith('cosine')
                            expect(results).toBe(20)
                        })
                    })
                })

                describe('distance measures:', function(){
                    describe('cosine', function(){

                        var cosignScoring

                        beforeEach(function(){
                            cosignScoring = nGrammer._scoring('cosine')
                        })

                        describe('test case 1 (Little off)', function(){

                            var expected = -41.41,
                                results,
                                test1,
                                test2

                            beforeEach(function(){

                                test1 = ['fo', 'ob', 'Te', 'hh']
                                test2 = ['Te', 'ob', 'bb', 'hh']

                                results = cosignScoring(test1, test2)
                            })

                            it('should pass', function(){
                                expect(results).toBeCloseTo(expected)
                            })
                        })

                        describe('test case 2 (Exact Match)', function(){
                            var expected = 0,
                                results,
                                test1,
                                test2

                            beforeEach(function(){

                                test1 = ['fo', 'ob', 'Te', 'hh']
                                test2 = ['fo', 'ob', 'Te', 'hh']

                                results = cosignScoring(test1, test2)
                            })

                            it('should pass', function(){
                                expect(results).toBeCloseTo(expected)
                            })
                        })

                        describe('test case 2 (Mismatch)', function(){
                            var expected = -90,
                                results,
                                test1,
                                test2

                            beforeEach(function(){

                                test1 = ['fo', 'ob', 'Te', 'hh']
                                test2 = ['fa']

                                results = cosignScoring(test1, test2)
                            })

                            it('should pass', function(){
                                expect(results).toBeCloseTo(expected)
                            })
                        })
                    })
                })
            })

            describe('search module', function(){

                var testCorpus

                beforeEach(function(){
                    testCorpus = [
                            {name:"New York", value:"NYC"},
                            {name:"New York City", value:"NYC"},
                            {name:"Beantown", value:"BOS"},
                            {name:"Phoenix", value:"PHX"}
                        ]

                    nGrammer
                        .corpus(testCorpus)
                        .generateLibrary()

                })
                describe('search function', function(){

                    describe('with default parameters', function(){

                        var expected = "BOS", results

                        beforeEach(function(){
                            results = nGrammer.search('Beantow').phrase
                        })

                        it('should return highest scoring phrase with cosine distance', function(){
                            expect(results.value).toBe(expected)
                        })
                    })

                    describe('with similarity threshold', function(){

                        var expected = "NYC", results

                        beforeEach(function(){
                            results = nGrammer.search('New ork City', -65)
                        })

                        it('should only return phrases with similarity measure above given threshold', function(){
                            expect(results[0].phrase.value).toBe(expected)
                            expect(results[1].phrase.value).toBe(expected)
                        })
                    })
                })
            })

        })
    })

})()
