import FormField from './FormField';

const LoginForm = () => (
    <div>
        <div className="p-form--group">
            <FormField type="email" name="email" label="Email" />
        </div>
        <div className="p-form--group">
            <FormField type="password" name="password" label="Password" />
        </div>
        <button rightIcon="log-in" type='submit' className="p-button">Login</button>
    </div>
);

export default LoginForm;
