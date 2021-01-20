'use strict';

export class CssClass {
    load(c){
        const l = 'link',
            a = document.getElementsByTagName(l),
            b = 'href';
        for (let i = a.length; i > 0; i--)
            if (a[i] && a[i].getAttribute(b) != null && a[i].getAttribute(b).indexOf(c) != -1)
                return false;
        const n = document.createElement(l);
        n.setAttribute('rel', 'stylesheet');
        n.setAttribute(b, c);
        document.getElementsByTagName('head')[0].appendChild(n)
        return n;
    }
    unLoad(c){
        const l = 'link',
             b = 'href',
             a = document.getElementsByTagName(l);
        for (let i = a.length; i > 0; i--)
            if (a[i] && a[i].getAttribute(b) != null && a[i].getAttribute(b).indexOf(c) != -1)
                a[i].parentNode.removeChild(a[i]);
    }
}
