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
var _notyf, _conn, _duration, _ripple, _dismissible, _position, _open;
import { define } from 'trans-render/define.js';
import { hydrate } from 'trans-render/hydrate.js';
import { XtallatX } from 'xtal-element/xtal-latx.js';
import { Notyf } from 'notyf/notyf.es.js';
const duration = 'duration';
const ripple = 'ripple';
const position = 'position';
const dismissible = 'dismissible';
const open = 'open';
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
    }
    static get is() { return 'no-tiff'; }
    static get observedAttributes() {
        return [duration, ripple, position, dismissible, open].concat(super.observedAttributes);
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
                this[n] = JSON.parse(nv);
                break;
            default:
                super.attributeChangedCallback(n, ov, nv);
        }
    }
    get duration() {
        return __classPrivateFieldGet(this, _duration);
    }
    set duration(val) {
        __classPrivateFieldSet(this, _duration, val);
        this.onPropsChange();
    }
    get ripple() {
        return __classPrivateFieldGet(this, _ripple);
    }
    set ripple(val) {
        __classPrivateFieldSet(this, _ripple, val);
        this.onPropsChange();
    }
    get dismissible() {
        return __classPrivateFieldGet(this, _dismissible);
    }
    set dismissible(val) {
        __classPrivateFieldSet(this, _dismissible, val);
        this.onPropsChange();
    }
    get position() {
        return __classPrivateFieldGet(this, _position);
    }
    set position(val) {
        __classPrivateFieldSet(this, _position, val);
        this.onPropsChange();
    }
    get open() {
        return __classPrivateFieldGet(this, _open);
    }
    set open(val) {
        __classPrivateFieldSet(this, _open, val);
        if (__classPrivateFieldGet(this, _notyf) !== undefined) {
            __classPrivateFieldGet(this, _notyf).call(this, val);
        }
    }
    connectedCallback() {
        __classPrivateFieldSet(this, _conn, true);
        this.style.display = 'none';
        __classPrivateFieldSet(this, _notyf, new Notyf());
        __classPrivateFieldGet(this, _notyf).success('Your changes have been successfully saved!');
    }
    onPropsChange() {
        if (this._disabled || !__classPrivateFieldGet(this, _conn))
            return;
        __classPrivateFieldSet(this, _notyf, new Notyf({
            duration: __classPrivateFieldGet(this, _duration),
            ripple: __classPrivateFieldGet(this, _ripple),
            position: __classPrivateFieldGet(this, _position),
            dismissible: __classPrivateFieldGet(this, _dismissible)
        }));
        if (__classPrivateFieldGet(this, _open) !== undefined) {
            __classPrivateFieldGet(this, _notyf).call(this, __classPrivateFieldGet(this, _open));
            __classPrivateFieldSet(this, _open, undefined);
        }
    }
}
_notyf = new WeakMap(), _conn = new WeakMap(), _duration = new WeakMap(), _ripple = new WeakMap(), _dismissible = new WeakMap(), _position = new WeakMap(), _open = new WeakMap();
define(NoTiff);
