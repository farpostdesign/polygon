import PropTypes from 'prop-types';
import FormField from './FormField';
import style from '../../style';

const newFormConfig = {
    buttonText: 'Add project',
    value: ''
};

function formConfig(project) {
    if (project) {
        return {
            buttonText: 'Edit project',
            value: project.title
        };
    }

    return newFormConfig;

}

const ProjectForm = ({ project }) => {
    const conf = formConfig(project);
    return (
        <div>
            <FormField type="text" name="name" value={conf.value} />
            <br />
            <br />
            <input style={style.BUTTON} type="submit" value={conf.buttonText} />
        </div>
    );
};


ProjectForm.propTypes = {
    project: PropTypes.object
};


export default ProjectForm;
