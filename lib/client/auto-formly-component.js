const {SetModule, Component, View,Inject} = angular2now;

function templatePrefix() {
    const m = /\@(\d+)\.(\d+)/.exec(Meteor.release);
    
    // version >= 1.2
    if((m[1] >= 1 && m[2] >= 2) || m[1] > 1) {
        return '/packages/wieldo:autoformly/';
    }
    return '/packages/wieldo_autoformly_';
}

SetModule('autoFormly');
@Component({
    selector: 'auto-formly',
    bind: {
        collection: '=',
        schema: '=',
        options: '=',
        onSubmit: '&',
        type: '@',
        doc: '=',
        //fields: '=',
        //model: '=',
        //form: '=',
        name: '@'
    }
})
@View({
    templateUrl: `${templatePrefix()}lib/client/auto-formly-component.html`,
    transclude: true
})
@Inject(['autoFormly'])
class autoFormlyComponent extends autoFormlyHelpers {
    // injectables
    autoFormly;

    /**
     * schema with set and get
     */
    _schema;
    /**
     * collection with set and get
     */
    _collection;
    /**
     * options with set and get
     */
    _options;
    /**
     * submit event handler with set and get
     */
    _onSubmit;
    /**
     * form type with set and get
     */
    _type;
    /**
     * auto-bound array with formly fields
     */
    fields;
    /**
     * auto-bound object with formly model
     */
    model;
    /**
     * auto-bound object with formly form
     */
    form;
    /**
     * auto-bound string with form name
     */
    name;

    constructor(autoFormly) {
        super();
        this.autoFormly = autoFormly;

        this.model = {};
        this.form;

        this.fields = this.createFields();
        this.checkType();
    }

    createFields() {
        let method;
        let value;

        if (this.collection && !this.schema) {
            method = 'collection';
            value = this.collection;
        } else if (!this.collection && this.schema) {
            method = 'schema';
            value = this.schema;
        } else {
            throw this.createError('Missing collection or schema. Specify only one.');
        }

        return this.autoFormly[method](value, this.options);
    }

    checkType() {
        if (!this.type) {
            throw this.createError('Missing form type.');
        }
        // update document
        if (this.type === 'update' && !angular.isObject(this.doc)) {
            throw this.createError('Update form has to have document assigned.');
        }
        // insert to collection
        if (this.type === 'insert' && !this.collection) {
            throw this.createError('Insert form has to have collection.');
        }
    }

    update() {

    }

    insert() {

    }

    submit() {
        if (this.form.$valid !== true) {
            return;
        }

        switch (this.type) {
            case 'insert':
                this.insert();
                break;
            case 'update':
                this.update();
                break;
        }

        if ("function" === typeof this.onSubmit) {
            this.onSubmit();
        }
    }

    //
    // schema
    //
    set schema(schema) {
        this._schema = schema;
    }

    get schema() {
        return this._schema;
    }

    //
    // collection
    //
    set collection(collection) {
        console.log('collection', collection);
        this._collection = collection;
    }

    get collection() {
        return this._collection;
    }

    //
    // options
    //
    set options(options) {
        console.log('options', options);
        this._options = options;
    }

    get options() {
        return this._options;
    }

    //
    // type
    //
    set type(type) {
        const available = ['insert', 'update'];

        if (available.indexOf(type.toLowerCase()) === -1) {
            throw this.createError(`Type ${type} not allowed. Try insert or update.`);
        }

        this._type = type.toLowerCase();
    }

    get type() {
        return this._type;
    }

    //
    // onSubmit
    //
    set onSubmit(onSubmit) {
        this._onSubmit = onSubmit;
    }

    get onSubmit() {
        return this._onSubmit;
    }
}