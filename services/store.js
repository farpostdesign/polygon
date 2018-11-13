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
