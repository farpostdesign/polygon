const actions = {
    addProject(action) {
        return fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.attributes)
        }).then((res) => res.json());
    }
};

const store = {
    dispatch(action) {
        const type = action.type;
        return actions[type](action);
    }
};

module.exports = store;
