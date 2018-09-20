import FormField from './FormField';
import style from '../../style';

const LoginForm = () => (
    <div style={{ maxWidth: '400px' }} >
        <h1>Login</h1>
        <br/>
        <FormField type="email" name="email" />
        <br/>
        <FormField type="password" name="password" />
        <br/>
        <button rightIcon="log-in" type='submit' style={style.BUTTON}>Login</button>
    </div>
);

export default LoginForm;
