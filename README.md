DOMContentLoaded
================

fixing the (in)famous event that does not trigger once "loaded".

Please [read the post](http://webreflection.blogspot.com/2014/02/the-underestimated-problem-about-script.html) to know more about issues you might have relying this event.

### How To
Simply include [the inline version of the script](./dcl.js) on top of any of your HTML pages (few extra bytes, really nothing to worry about) and stop worrying about not being initialized once the **DOM Content** ... has been **Loaded** !!!

Can you believe it ?

### Content Security Policy
If you are under this restriction, here the deprecated `sha1` version of [the script](./dcl.js): `sha1-//cbZaIlYySeh0GGSwpZKzOAkvg=`

While if you are targeting modern browsers, here the `sha256` version: `sha256-XpSHSiwcWV9TTNd43i/nMFtZA8u8gQVfVXEy6Wa68a0=`

These digests have been tested without problems via server side headers, as well as meta tag:
```html
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'unsafe-inline' 'self' 'sha1-//cbZaIlYySeh0GGSwpZKzOAkvg=' 'sha256-XpSHSiwcWV9TTNd43i/nMFtZA8u8gQVfVXEy6Wa68a0='"
>
```

Bear in mind you must specify `'unsafe-inline'` in addition to `'self'` for backward compatibility.


### Example
Just try to write something like:
```javascript
document.addEventListener('DOMContentLoaded', function (e) {
  alert([e.type, e.currentTarget === document]);
});
```
in [this page console](http://webreflection.github.io/DOMContentLoaded/example.html) and you should have your _always notified_ `DOMContentLoaded` event.