import Router from 'next/router';
import config from '../config';

/**
 * Actions, perform only on client side
 *
 */

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
    },

    logout() {
        return fetch('/api/token', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());
    },

    sendmagiclink(action) {
        return fetch('/api/loginlink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.userdata)
        }).then((res) => res.json());
    }
};

function withHostURL(path) {
    return `http://${config.host}${path}`;
}

/**
 * Get resources
 *
 * @param {Object} ctx - next js context, may be client side or server side
 *
 */
function getState(ctx) {
    function handleUnauthorized(res) {
        if (res.status === 401) {
            if (ctx.res) {
                return ctx.res.redirect('/viewer/login');
            } else {
                return Router.push('/viewer/login');
            }
        }
        return res;
    }

    function handleJSON(res) {
        return res.json();
    }

    const reqOpts = {};
    if (ctx.req) {
        // proxy headers when doing server side rendering
        // from original request to the server
        reqOpts.headers = ctx.req.headers;
    }

    return {
        projects() {
            return fetch(withHostURL('/api/projects'), reqOpts)
                .then(handleUnauthorized)
                .then(handleJSON);
        },

        viewers() {
            return fetch(withHostURL('/api/viewers'), reqOpts)
                .then(handleUnauthorized)
                .then(handleJSON);
        },

        project(id) {
            return fetch(withHostURL(`/api/project?id=${id}`), reqOpts)
                .then(handleUnauthorized)
                .then(handleJSON);
        },

        design(id) {
            return fetch(withHostURL(`/api/design?id=${id}`), reqOpts)
                .then(handleUnauthorized)
                .then(handleJSON);
        }
    };
}

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
    },
    getState
};

export default store;
