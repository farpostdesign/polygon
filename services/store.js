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

    updateProject(action) {
        return fetch(`/api/projects/${action.id}`, {
            method: 'PATCH',
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
    },

    updateDesign(action) {
        return fetch(`/api/designs/${action.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.attributes)
        }).then((res) => res.json());
    },

    uploadFiles(action) {
        const filesData = new FormData();
        action.files.forEach((file) => filesData.append('files', file));
        return fetch(`/api/designs/${action.id}/uploads`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: filesData
        }).then((res) => res.json());
    },

    replaceFile(action) {
        const filesData = new FormData();
        filesData.append('file', action.file);
        return fetch(`/api/designs/${action.designId}/files/${action.fileId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            },
            body: filesData
        }).then((res) => res.json());
    },

    deleteFile(action) {
        return fetch(`/api/designs/${action.designId}/files/${action.fileId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => res.json());
    },

    login(action) {
        return fetch('/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.credentials)
        }).then((res) => res.json());
    }
};

class StoreError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'Store Error';
    }
}

const store = {
    dispatch(action) {
        const type = action.type;
        if (typeof type === 'undefined') {
            throw new StoreError('Dispatch function requires property `type` in the argument object');
        }
        const actionFn = actions[type];
        if (!actionFn) {
            throw new StoreError(`There is no such action as \`${action.type}\``);
        }
        return actionFn(action);
    }
};

module.exports = store;
