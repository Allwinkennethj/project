(function () {
    function it(desc, func) {
        try {
            func();
            console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc);
        }
        catch (error) {
            console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc);
        }
    }
    function assert(isTrue) {
        if (!isTrue) {
            throw new Error();
        }
    }
    it('should pass and check', function () {
        assert(1 === 1);
    });
    it('should validate a date string and return true 02/02/2020', function () {
        assert($myapp.isValidDate('02/02/2020'));
    });
    it('should validate a date string and return false 02/02/2024', function () {
        assert(!$myapp.isValidDate('02/02/2024'));
    });
    it('should validate a date string and return true 12/02/2020', function () {
        assert($myapp.isValidDate('12/02/2020'));
    });
    it('should validate a date string and return false 10/02/2025', function () {
        assert(!$myapp.isValidDate('10/02/2025'));
    });
    it('should validate a mobile string and return true 7397049491', function() {
        assert($myapp.isValidMobile(7397049491));
    });
    it('should validate a mobile string and return false 997123123123', function() {
        assert(!$myapp.isValidMobile(997123123123));
    });
    it('should validate a mobile string and return false 997689876123123125', function() {
        assert(!$myapp.isValidMobile(997689876123123125));
    });
    it('should validate a mobile string and return true 9965935979', function() {
        assert($myapp.isValidMobile(9965935979));
    });
    it('should validate a first name string and return true for Allwin', function() {
        assert($myapp.isValidFName("Allwin"));
    });
    it('should validate a first name string and return false for Allwin123', function() {
        assert(!$myapp.isValidFName("Allwin123"));
    });
    it('should validate a first name string and return false for Allwin Kord', function() {
        assert(!$myapp.isValidFName("Allwin Kord"));
    });
    it('should validate a first name string and return true for allwinKords', function() {
        assert($myapp.isValidFName("allwinKords"));
    });
    it('should validate a last name string and return true for Allwin', function() {
        assert($myapp.isValidLName("Allwin"));
    });
    it('should validate a last name string and return false for Allwin123', function() {
        assert(!$myapp.isValidLName("Allwin123"));
    });
    it('should validate a last name string and return false for Allwin Kord', function() {
        assert(!$myapp.isValidLName("Allwin Kord"));
    });
    it('should validate a last name string and return true for allwinKords', function() {
        assert($myapp.isValidLName("allwinKords"));
    });
    it('should validate a email string and return true for alldare19@gmail.com', function() {
        assert($myapp.isValidEmail("alldare19@gmail.com"));
    });
    it('should validate a email string and return false for allwin.com', function() {
        assert(!$myapp.isValidEmail("allwin.com"));
    });
    it('should validate a email string and return true for allwin@gmail.com', function() {
        assert($myapp.isValidEmail("allwin@gmail.com"));
    });
    it('should validate a email string and return false for allwinKords@com', function() {
        assert(!$myapp.isValidEmail("allwinKords@com"));
    });
})();