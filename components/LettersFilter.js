import PropTypes from 'prop-types';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const style = {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '960px',
    margin: '1rem 0 2rem 0'
};

const LettersFilter = ({ current }) => (
    <div style={style}>
        {
            alphabet.map((char) =>
                <a key={char} href={`?char=${char}`} className={current === char ? 'active' : ''}>
                    {char}
                </a>
            )
        }
    </div>
);

LettersFilter.propTypes = {
    current: PropTypes.string
};

export default LettersFilter;
