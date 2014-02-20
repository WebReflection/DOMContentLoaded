DOMContentLoaded
================

fixing the (in)famous event that does not trigger once "loaded"

### How To
Simply include the inline version of the script on top of any of your HTML pages (few extra bytes, really nothing to worry about) and stop worrying about not being initialized once the **DOM Content** ... has been **Loaded** !!!

Can you believe it ?

### Content Security Policy
If you are under this restriction, here the deprecated `sha1` version of the script: `sha1-m61EyXDZNMEkvnD+c4P5/vCLhS8=`

While if you are targeting modern browsers, here the `sha256` version: `sha256-N+4HzVHpaD4JeBbfFrpbp9lvZIKeqLofwNjcO7YHFIM=`

These digests have been tested without problems via server side headers, as well as meta tag:
```html
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self' 'sha1-m61EyXDZNMEkvnD+c4P5/vCLhS8=' 'sha256-N+4HzVHpaD4JeBbfFrpbp9lvZIKeqLofwNjcO7YHFIM='"
>
```

Bear in mind you might need to specify `'unsafe-inline'` before `'self'` for backward compatibility.


### Example
Just try to write something like:
```javascript
document.addEventListener('DOMContentLoaded', function (e) {
  alert([e.type, e.currentTarget === document]);
});
```
in [this page console](http://webreflection.github.io/DOMContentLoaded/example.html) and you should have your _always notified_ `DOMContentLoaded` event.