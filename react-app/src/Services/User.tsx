class User {
    public email: string;
    private password: string;
    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }
}

export default User