var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _notyf, _conn, _duration, _ripple, _dismissible, _position, _open, _success, _error, _types;
import { define } from 'trans-render/define.js';
import { hydrate } from 'trans-render/hydrate.js';
import { XtallatX } from 'xtal-element/xtal-latx.js';
import { Notyf } from 'notyf/notyf.es.js';
const duration = 'duration';
const ripple = 'ripple';
const position = 'position';
const dismissible = 'dismissible';
const open = 'open';
const types = 'types';
const success = 'success';
const error = 'error';
/**
 * @element no-tiff
 */
export class NoTiff extends XtallatX(hydrate(HTMLElement)) {
    constructor() {
        super(...arguments);
        _notyf.set(this, void 0);
        _conn.set(this, false);
        _duration.set(this, 2000);
        _ripple.set(this, true);
        _dismissible.set(this, false);
        _position.set(this, { x: 'right', y: 'bottom' });
        _open.set(this, void 0);
        _success.set(this, void 0);
        _error.set(this, void 0);
        _types.set(this, void 0);
    }
    static get is() { return 'no-tiff'; }
    static get observedAttributes() {
        return [duration, ripple, position, dismissible, open, types, success, error].concat(super.observedAttributes);
    }
    attributeChangedCallback(n, ov, nv) {
        switch (n) {
            case duration:
                this.duration = parseInt(nv);
                break;
            case ripple:
            case dismissible:
                this[n] = nv !== null;
                break;
            case position:
            case open:
            case types:
                this[n] = JSON.parse(nv);
                break;
            case success:
            case error:
                this[n] = nv;
                break;
            default:
                super.attributeChangedCallback(n, ov, nv);
                this.onPropsChange();
        }
    }
    get duration() {
        return __classPrivateFieldGet(this, _duration);
    }
    /**
     * Number of miliseconds before hiding the notification
     * Default:  2000
     * @attr
     */
    set duration(val) {
        __classPrivateFieldSet(this, _duration, val);
    }
    get ripple() {
        return __classPrivateFieldGet(this, _ripple);
    }
    /**
     * Whether to show the notification with a ripple effect
     * Default:  true
     * @attr
     */
    set ripple(val) {
        __classPrivateFieldSet(this, _ripple, val);
    }
    get dismissible() {
        return __classPrivateFieldGet(this, _dismissible);
    }
    set dismissible(val) {
        __classPrivateFieldSet(this, _dismissible, val);
    }
    get position() {
        return __classPrivateFieldGet(this, _position);
    }
    /**
     * Viewport location where notifications are rendered
     * Default:  {x:'right',y:'bottom'}
     * @attr
     */
    set position(val) {
        __classPrivateFieldSet(this, _position, val);
    }
    get open() {
        return __classPrivateFieldGet(this, _open);
    }
    /**
     * Customizable toast
     */
    set open(val) {
        __classPrivateFieldSet(this, _open, val);
        this.onPropsChange();
    }
    get success() {
        return __classPrivateFieldGet(this, _success);
    }
    /**
     * Success message
     */
    set success(val) {
        __classPrivateFieldSet(this, _success, val);
        this.onPropsChange();
    }
    /**
     * Error message
     */
    get error() {
        return __classPrivateFieldGet(this, _error);
    }
    set error(val) {
        __classPrivateFieldSet(this, _error, val);
        this.onPropsChange();
    }
    onPropsChange() {
        if (this._disabled || !__classPrivateFieldGet(this, _conn) || (!__classPrivateFieldGet(this, _open) && !this.success && !this.error))
            return;
        if (__classPrivateFieldGet(this, _notyf) === undefined) {
            __classPrivateFieldSet(this, _notyf, new Notyf({
                duration: __classPrivateFieldGet(this, _duration),
                ripple: __classPrivateFieldGet(this, _ripple),
                position: __classPrivateFieldGet(this, _position),
                dismissible: __classPrivateFieldGet(this, _dismissible)
            }));
        }
        if (__classPrivateFieldGet(this, _open) !== undefined) {
            __classPrivateFieldGet(this, _notyf).open(__classPrivateFieldGet(this, _open));
            __classPrivateFieldSet(this, _open, undefined);
        }
        if (__classPrivateFieldGet(this, _success) !== undefined) {
            __classPrivateFieldGet(this, _notyf).success(__classPrivateFieldGet(this, _success));
            __classPrivateFieldSet(this, _success, undefined);
        }
        if (__classPrivateFieldGet(this, _error) !== undefined) {
            __classPrivateFieldGet(this, _notyf).error(__classPrivateFieldGet(this, _error));
            {
                __classPrivateFieldSet(this, _error, undefined);
            }
        }
    }
    get types() {
        return __classPrivateFieldGet(this, _types);
    }
    /**
     * Array with individual configurations for each type of toast
     */
    set types(val) {
        __classPrivateFieldSet(this, _types, val);
    }
    connectedCallback() {
        __classPrivateFieldSet(this, _conn, true);
        this.style.display = 'none';
        this.propUp(NoTiff.observedAttributes);
        this.onPropsChange();
    }
}
_notyf = new WeakMap(), _conn = new WeakMap(), _duration = new WeakMap(), _ripple = new WeakMap(), _dismissible = new WeakMap(), _position = new WeakMap(), _open = new WeakMap(), _success = new WeakMap(), _error = new WeakMap(), _types = new WeakMap();
define(NoTiff);
