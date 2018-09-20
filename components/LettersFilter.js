import PropTypes from 'prop-types';
import Link from 'next/link';

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
                <Link key={char} href={`?char${char}`}>
                    <a href={`?char=${char}`} style={current === char ? { color: 'red' } : {}}>
                        {char}
                    </a>
                </Link>
            )
        }
    </div>
);

LettersFilter.propTypes = {
    current: PropTypes.string
};

export default LettersFilter;
