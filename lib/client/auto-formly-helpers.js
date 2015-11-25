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

    getSchema(collection) {
        if (!collection) {
            return;
        }

        // Mongo Collection
        if (angular.isFunction(collection.simpleSchema)) {
            return collection.simpleSchema();
        }

        // AngularMeteorCollection
        if (collection.$$collection && angular.isFunction(collection.$$collection.simpleSchema)) {
            return collection.$$collection.simpleSchema();
        }

        return;
    }

    getCollection(collection) {
        if (this.isCollection(collection)) {
            return collection;
        }

        if (this.isAngularMeteorCollection(collection)) {
            return collection.$$collection;
        }

        return;
    }

    isCollection(collection) {
        return collection && collection._c2;
    }

    isAngularMeteorCollection(collection) {
        return collection && collection.$$collection && this.isCollection(collection.$$collection);
    }

    isSchema(schema) {
        return schema && schema instanceof SimpleSchema;
    }
};