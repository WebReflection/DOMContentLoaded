DOMContentLoaded
================

fixing the (in)famous event that does not trigger once "loaded"

### How To
Simply include the inline version of the script on top of any of your HTML pages (few extra bytes, really nothing to worry about) and stop worrying about not being initialized once the **DOM Content** ... has been **Loaded** !!!

Can you believe it ?

## Content Security Policy
If you are under this restriction, here the deprecated `sha1` version of the script: `sha1-F8ev0YcF+TLPZ/rYA4WxeI63FZE=`

While if you are targeting modern browsers, here the `sha256` version: `sha256-MhC1XWjT8q/sjgjx3fs59g6+Xyn5ixV2XK04JV4GiJE=`

These digests have been tested without problems via server side headers, as well as meta tag:
```html
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self' 'sha1-F8ev0YcF+TLPZ/rYA4WxeI63FZE=' 'sha256-MhC1XWjT8q/sjgjx3fs59g6+Xyn5ixV2XK04JV4GiJE='"
>
```

Bear in mind you might need to specify `'unsafe-inline'` before `'self'` for backward compatibility.