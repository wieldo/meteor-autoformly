autoFormlyHelpers = class autoFormlyHelpers {
    createError(msg) {
        return new Error(`[AutoFormly] ${msg}`);
    }

    createNestedObject(obj, path) {
        path = this.pathNestedObject(path);
        for (let i = 0; i < path.length; i++) {
            obj = obj[path[i]] = obj[path[i]] || {};
        }
    }

    getNestedObject(obj, path) {
        path = this.pathNestedObject(path);
        let objCopy = angular.copy(obj);
        for (let i = 0; i < path.length; i++) {
            if (!objCopy.hasOwnProperty(path[i])) {
                objCopy = undefined;
                break;
            } else {
                objCopy = objCopy[path[i]];
            }
        }

        return objCopy;
    }

    pathNestedObject(path) {
        if ("string" === typeof path) {
            path = path.split('.');
        }
        return path;
    }
};