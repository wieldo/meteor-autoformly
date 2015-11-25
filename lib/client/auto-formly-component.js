const {SetModule, Component, View,Inject} = angular2now;

function templatePrefix() {
    const m = /\@(\d+)\.(\d+)/.exec(Meteor.release);

    // version >= 1.2
    if ((m[1] >= 1 && m[2] >= 2) || m[1] > 1) {
        return '/packages/wieldo:autoformly/';
    }
    return '/packages/wieldo_autoformly_';
}

SetModule('autoFormly');
@Component({
    selector: 'auto-formly',
    bind: {
        collection: '=',
        options: '=?',
        doc: '=?',
        onSuccess: '=?',
        onError: '=?'
    }
})
@View({
    templateUrl: `${templatePrefix()}lib/client/auto-formly-component.ng.html`,
    transclude: true
})
@Inject(['autoFormly', '$meteor'])
class autoFormlyComponent extends autoFormlyHelpers {
    // injectables
    autoFormly;
    $meteor;

    /**
     * collection (with set and get)
     */
    _collection;
    /**
     * options (with set and get)
     */
    _options;
    /**
     * document (with set and get)
     */
    _doc;
    /**
     * success callback (with set and get)
     */
    _onSuccess;
    /**
     * error callback (with set and get)
     */
    _onError;
    /**
     * auto-bound array with formly fields
     */
    formFields;
    /**
     * auto-bound object with formly model
     */
    formModel;
    /**
     * auto-bound object with formly options
     */
    formOptions;
    /**
     * auto-bound object with formly form
     */
    form;
    /**
     * auto-bound string with form name
     */
    formName;

    constructor(autoFormly, $meteor) {
        super();
        this.autoFormly = autoFormly;
        this.$meteor = $meteor;

        this.formFields = this.createFormFields();
        this.formModel = this.createFormModel();
    }

    /**
     * Create fields based on collection and options
     * @returns {array}
     */
    createFormFields() {
        return this.autoFormly.collection(this.collection, this.options);
    }

    /**
     * Create model based on document
     * @returns {Object}
     */
    createFormModel() {
        return this.doc || {};
    }

    /**
     * Submit form and save form model in collection
     */
    submit() {
        if (!this.form.$valid) {
            this.callError(false);
            return;
        }

        this.$meteor.collection(this.getCollection(this.collection), false)
            .save(this.formModel)
            .then((result) => {
                // reset model
                this.formModel = {};
                // reset form
                this.form.$setPristine();
                this.form.$setUntouched();
                // callback
                this.callSuccess(result);
            })
            .catch((error) => {
                // set validity on fields
                this.autoFormly.errors(this.collection, this.formFields);
                // callback
                this.callError(error);
            });
    }

    //
    // collection
    //
    set collection(collection) {
        this._collection = collection;
    }

    get collection() {
        return this._collection;
    }

    //
    // options
    //
    set options(options) {
        if (!angular.isObject(options)) {
            throw this.createError('Invalid options. Expected object');
        }
        this._options = options;
    }

    get options() {
        return this._options;
    }

    //
    // document
    //
    set doc(doc) {
        if (!angular.isObject(doc)) {
            throw this.createError('Invalid document. Expected object');
        }
        this._doc = angular.copy(doc);
    }

    get doc() {
        return this._doc;
    }

    //
    // onSuccess
    //
    set onSuccess(onSuccess) {
        if (!angular.isFunction(onSuccess)) {
            throw this.createError("Invalid success callback. Expected function");
        }
        this._onSuccess = onSuccess;
    }

    get onSuccess() {
        return this._onSuccess;
    }

    /**
     * call success callback if defined
     * @param {Object|Array} result
     */
    callSuccess(result) {
        if (this.onSuccess) {
            this.onSuccess(result);
        }
    }

    //
    // onError
    //
    set onError(onError) {
        if (!angular.isFunction(onError)) {
            throw this.createError("Invalid error callback. Expected function");
        }
        this._onError = onError;
    }

    get onError() {
        return this._onError;
    }

    /**
     * call error callback if defined
     * @param {boolean|Error} error
     */
    callError(error) {
        if (this.onError) {
            this.onError(error);
        }
    }
}