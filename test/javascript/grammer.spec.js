(function(){

    define(['src/javascript/grammer'], function(){

        var nGrammer

        beforeEach(function(){

            nGrammer = grammer()

        })

        describe('Grammer library', function(){

            describe('corpus module', function(){

                describe('getter method', function(){
                    it('should retrieve set corpus when called')
                })

                describe('setter method', function(){
                    it('should set corpus when called')
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
