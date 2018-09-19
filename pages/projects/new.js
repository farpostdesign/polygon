import Layout from '../../components/Layout';
import BreadcrumbsNav from '../../components/BreadcrumbsNav';
import { ProjectForm } from '../../components/forms';

const New = () => (
    <Layout>
        <BreadcrumbsNav items={[{ title: 'Projects', href: '/' }, { title: 'New Project' }]} />
        <ProjectForm />
    </Layout>
);

export default New;
