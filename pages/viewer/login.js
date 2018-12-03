import Layout from '../../components/Layout';
import { RequestMagicLinkForm } from '../../components/forms';

const ViewerLogin = () => (
    <Layout navBar={false}>
        <h1 className="p-logo">Log in with magic link to continue to Polygon</h1>
        <RequestMagicLinkForm />
    </Layout>
);

export default ViewerLogin;
