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

export interface INotyfNotificationOptions {
    type?: string;
    className?: string;
    duration?: number;
    icon?: INotyfIcon | false;
    background?: string;
    message?: string;
    ripple?: boolean;
    position?: INotyfPosition;
    dismissible?: boolean;
}

export interface INotyfNotificationOptions{

}

const duration = 'duration';
const ripple = 'ripple';
const position = 'position';
const dismissible = 'dismissible';
const open = 'open';
export class NoTiff extends XtallatX(hydrate(HTMLElement)) implements INotyfNotificationOptions{
    static get is(){return 'no-tiff';}
    #notyf: Notyf;
    #conn = false;
    static get observedAttributes(){
        return [duration, ripple, position, dismissible, open].concat(super.observedAttributes);
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
                this[n] = JSON.parse(nv);
                break;
            default:
                super.attributeChangedCallback(n, ov, nv);
        }
    }
    #duration: number = 2000;
    get duration(){
        return this.#duration;
    }
    set duration(val){
        this.#duration = val;
        this.onPropsChange();
    }
    #ripple: boolean = true;
    get ripple(){
        return this.#ripple;
    }
    set ripple(val){
        this.#ripple = val;
        this.onPropsChange();
    }
    #dismissible: boolean = false;
    get dismissible(){
        return this.#dismissible;
    }
    set dismissible(val){
        this.#dismissible = val;
        this.onPropsChange();
    }

    #position: INotyfPosition = {x:'right',y:'bottom'};
    get position(){
        return this.#position;
    }
    set position(val){
        this.#position = val;
        this.onPropsChange();
    }

    #open: INotyfNotificationOptions | undefined;
    get open(){
        return this.#open;
    }
    set open(val){
        this.#open = val;
        if(this.#notyf !== undefined){
            this.#notyf(val);
        }
    }

    connectedCallback(){
        this.#conn = true;
        this.style.display = 'none';
        this.#notyf = new Notyf();
        this.#notyf.success('Your changes have been successfully saved!');
    }
    onPropsChange(){
        if(this._disabled || !this.#conn) return;
        this.#notyf = new Notyf({
            duration: this.#duration,
            ripple: this.#ripple,
            position: this.#position,
            dismissible: this.#dismissible
        });
        if(this.#open !== undefined){
            this.#notyf(this.#open);
            this.#open = undefined;
        }
    }
}
define(NoTiff);