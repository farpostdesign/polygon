import Layout from '../components/Layout';
import { LoginForm } from '../components/forms';

const Login = () => (
    <Layout navBar={false}>
        <h1 className="p-logo">Log in to continue to Polygon</h1>
        <LoginForm />
    </Layout>
);

export default Login;
