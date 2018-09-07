import PropTypes from 'prop-types';
import { ButtonGroup, AnchorButton } from '@blueprintjs/core';

const style = {
    margin: '1rem 0 2rem 0'
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const LettersFilter = ({ current }) => (
    <ButtonGroup style={style} minimal={true}>
        {
            alphabet.map((char) =>
                <AnchorButton key={char} active={current === char}>
                    {char}
                </AnchorButton>
            )
        }
    </ButtonGroup>
);

LettersFilter.propTypes = {
    current: PropTypes.string
};

export default LettersFilter;
