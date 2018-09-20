import PropTypes from 'prop-types';
import FormField from './FormField';
import style from '../../style';

const ProjectForm = ({ project }) => {
    return (
        <div>
            <FormField type="text" name="name" value={project && project.title} />
            <br />
            <br />
            {!project && <input style={style.BUTTON} type="submit" value="Add Project" />}
        </div>
    );
};


ProjectForm.propTypes = {
    project: PropTypes.object
};


export default ProjectForm;
