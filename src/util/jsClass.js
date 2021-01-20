'use strict';

export class JsClass {
    load(j){
        const a = document.getElementsByTagName('script'),
            b = 'src';
        for (let i = a.length; i > 0; i--)
            if (a[i] && a[i].getAttribute(b) != null && a[i].getAttribute(b).indexOf(j) != -1)
                return false;
        const n = document.createElement('script');
        n.setAttribute('type', 'text/javascript');
        n.setAttribute(b, j);
        document.getElementsByTagName('head')[0].appendChild(n)
        return n;
    }
    unLoad(j){
        const b = 'src',
        a = document.getElementsByTagName("script");
        for (let i = a.length; i > 0; i--)
            if (a[i] && a[i].getAttribute(b) != null && a[i].getAttribute(b).indexOf(j) != -1)
                a[i].parentNode.removeChild(a[i]);
    }

}
