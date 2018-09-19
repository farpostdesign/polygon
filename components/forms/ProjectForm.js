import FormField from './FormField';
import style from '../../style';

const ProjectForm = () => {
    return (
        <div>
            <FormField type="text" name="name" />
            <br />
            <br />
            <input style={style.BUTTON} type="submit" value="Add Project"/>
        </div>
    );
};

export default ProjectForm;
