(function () {
    var allTestFiles = [];
    var TEST_REGEXP = /spec\.js$/;

    var pathToModule = function (path) {
        return path.replace(/^\/base\//, '').replace(/\.js$/, '');
    }

    Object.keys(window.__karma__.files).forEach(function (file) {
        if (TEST_REGEXP.test(file)) {
            // Normalize paths to RequireJS module names.
            allTestFiles.push(pathToModule(file));
        }
    })

    require.config({

        'baseUrl': '/base',

        'paths': {},

        'shim': {},

        'waitSeconds': 6,

        'deps': allTestFiles,

        'callback': window.__karma__.start
    })

})();
