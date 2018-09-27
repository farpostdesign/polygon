import FormField from './FormField';

const LoginForm = () => (
    <div>
        <h1>Login</h1>
        <br/>
        <FormField type="email" name="email" />
        <br/>
        <FormField type="password" name="password" />
        <br/>
        <button rightIcon="log-in" type='submit' className="p-button">Login</button>
    </div>
);

export default LoginForm;
