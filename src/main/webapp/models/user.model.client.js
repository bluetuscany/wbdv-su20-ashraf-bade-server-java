function User(username, password, firstName, lastName, role) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;

    this.setUsername = setUsername;
    this.getUsername = getUsername;
    this.setPassword = setPassword;
    this.getPassword = getPassword;
    this.setFName = setFName;
    this.getFName = getFName;
    this.setLName = setLName;
    this.getLName = getLName;
    this.setRole = setRole;
    this.getRole = getRole;

    function setUsername(username) {
        this.username = username;
    }
    function getUsername() {
        return this.username;
    }

    function setPassword(p) {
        this.password = p;
    }
    function getUsername() {
        return this.password;
    }

    function setFName(n) {
        this.firstName = n;
    }
    function getFName() {
        return this.firstName;
    }
    function setLName(n) {
        this.lastName = n;
    }
    function getLName() {
        return this.lastName;
    }
    function setRole(r) {
        this.role = r;
    }
    function getUsername() {
        return this.role;
    }

}
