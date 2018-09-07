import ProjectsList from '../components/List';
import Layout from '../components/Layout';

const fakeProjects = [
    { title: 'Dazel' },
    { title: 'Drom' },
    { title: 'Time Manager' }
];

const Index = () => (
    <Layout>
        <ProjectsList items={fakeProjects} />
    </Layout>
);

export default Index;
