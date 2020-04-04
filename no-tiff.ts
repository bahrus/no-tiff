import {define} from 'trans-render/define.js';
import {hydrate} from 'trans-render/hydrate.js';
import {XtallatX} from 'xtal-element/xtal-latx.js';
import {Notyf} from 'notyf/notyf.es.js';


export declare type NotyfHorizontalPosition = 'left' | 'center' | 'right';
export declare type NotyfVerticalPosition = 'top' | 'center' | 'bottom';
export interface INotyfPosition {
    x: NotyfHorizontalPosition;
    y: NotyfVerticalPosition;
}
export interface INotyfIcon {
    className: string;
    tagName: keyof ElementTagNameMap;
    text: string;
}
export interface INotyfCommonOptions{
    duration?: number;
    ripple?: boolean;
    position?: INotyfPosition;
    dismissible?: boolean;
}

export interface INotyfNotificationOptions extends INotyfCommonOptions {
    type?: string;
    className?: string;
    icon?: INotyfIcon | false;
    background?: string;
    message?: string;
}

export interface INotifyInitOptions extends INotyfCommonOptions{
    types?: INotyfNotificationOptions[]
}

const duration = 'duration';
const ripple = 'ripple';
const position = 'position';
const dismissible = 'dismissible';
const open = 'open';
const types = 'types';
const success = 'success';
const error = 'error';

export class NoTiff extends XtallatX(hydrate(HTMLElement)) implements INotifyInitOptions{
    static get is(){return 'no-tiff';}
    #notyf: Notyf;
    #conn = false;
    static get observedAttributes(){
        return [duration, ripple, position, dismissible, open, types, success, error].concat(super.observedAttributes);
    }
    attributeChangedCallback(n: string, ov: string, nv: string){
        switch(n){
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
    #duration: number = 2000;
    get duration(){
        return this.#duration;
    }
    set duration(val){
        this.#duration = val;
    }
    #ripple: boolean = true;
    get ripple(){
        return this.#ripple;
    }
    set ripple(val){
        this.#ripple = val;
    }
    #dismissible: boolean = false;
    get dismissible(){
        return this.#dismissible;
    }
    set dismissible(val){
        this.#dismissible = val;
    }

    #position: INotyfPosition = {x:'right',y:'bottom'};
    get position(){
        return this.#position;
    }
    set position(val){
        this.#position = val;
    }

    #open: INotyfNotificationOptions | undefined;
    get open(){
        return this.#open;
    }
    set open(val){
        this.#open = val;
        this.onPropsChange();
    }

    #success: string | undefined;
    get success(){
        return this.#success;
    }
    set success(val){
        this.#success = val;
        this.onPropsChange();
    }

    #error: string | undefined;
    get error(){
        return this.#error;
    }
    set error(val){
        this.#error = val;
        this.onPropsChange();
    }

    onPropsChange(){
        if(this._disabled || !this.#conn || (!this.#open && !this.success && !this.error)) return;
        if(this.#notyf === undefined){
            this.#notyf = new Notyf({
                duration: this.#duration,
                ripple: this.#ripple,
                position: this.#position,
                dismissible: this.#dismissible
            });
        }
        if(this.#open !== undefined){
            this.#notyf.open(this.#open);
            this.#open = undefined;
        }
        if(this.#success !== undefined){
            this.#notyf.success(this.#success);
            this.#success = undefined;
        }
        if(this.#error !== undefined){
            this.#notyf.error(this.#error){
                this.#error = undefined;
            }
        }
    }



    #types: INotyfNotificationOptions[] | undefined;
    get types(){
        return this.#types;
    }
    set types(val){
        this.#types = val;
    }



    connectedCallback(){
        this.#conn = true;
        this.style.display = 'none';
        this.propUp(NoTiff.observedAttributes);
        this.onPropsChange();
    }

}
define(NoTiff);