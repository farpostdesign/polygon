import Layout from '../components/Layout';
import { FormGroup, InputGroup, Button, H1 } from '@blueprintjs/core';

const Login = () => (
    <Layout>
        <H1>Login</H1>
        <form style={{ maxWidth: '400px' }} >
            <FormGroup>
                <InputGroup type='email' placeholder="Email" />
            </FormGroup>
            <FormGroup>
                <InputGroup type='password' placeholder="Password" />
            </FormGroup>
            <FormGroup>
                <Button rightIcon="log-in" type='submit' intent='success'>Login</Button>
            </FormGroup>
        </form>
    </Layout>
);

export default Login;
