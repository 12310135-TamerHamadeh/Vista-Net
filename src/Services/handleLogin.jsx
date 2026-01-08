import { LoginApi } from '../api/LoginApi';

export const handleLogin = async (e, email, password) => {
    e.preventDefault();

    console.log("Started Login " + email + " " + password);

    const result = await LoginApi(email, password);

    if ( result ) {
        const user = result.user;
        localStorage.setItem('id', user.id);
        localStorage.setItem('name', user.name);
        localStorage.setItem('email', user.email);
        localStorage.setItem('isLoggedIn', "true");
        window.location.href = '/dashboard';
    }
}