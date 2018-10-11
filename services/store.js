const actions = {
    addProject(action) {
        return fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.attributes)
        }).then((res) => res.json());
    },

    addDesign(action) {
        return fetch('/api/designs', {
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
        const actionFn = actions[type];
        if (!actionFn) {
            throw new Error(`No action ${action.type}`);
        }
        return actionFn(action);
    }
};

module.exports = store;
