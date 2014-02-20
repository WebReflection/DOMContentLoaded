// DO NOT COPY AND PASTE IN ANY LIBRARY OR JS FILE
// this  MUST be the first script on top of **your** HTML page
// and it MUST be **included/executed only once**
// If your framework fix this already and every script in your page
// uses such framework then you don't need this script

(function (
  callLater,  // setImmediate or setTimeout as fallback
  document,   // the current document
  add,        // shortcut for minifiers
  type        // shortcut for DOMContentLoaded type
) {

  // the current method
  var addEventListener = document[add];

  // ued to simulate dispatched event
  function invoke(dler, han) {
    var e = document.createEvent('Event'),
        // setImmediate will receive two args
        // while setTimeout only the first one
        handler = han || dler;
    // normally initliazed event
    e.initEvent(type, true, true);
    // add some common property
    e.currentTarget = e.target = document;
    try {
      // if callback invoke with document as context
      if (typeof handler === 'function') {
        handler.call(document, e);
      }
      // otherwise invoke as regular handler
      else {
        handler.handleEvent(e);
      }
    } catch(emAll) {
      // gonna notify later on ...
      callLater(notify, 0, emAll);
    }
  }

  // ... later on ...
  function notify(or, err) {
    throw (err || or);
  }

  // the main and first DOMContentLoaded callback
  function onDOMContentLoaded() {
    // once notified, drop this listener
    // so nobody can dispatch this callback again
    document.removeEventListener(
      type,
      onDOMContentLoaded
    );
    // overwrite the original method
    // this **will not hurt performances**
    // plus **will not change behavior**
    document[add] = function addEventListener(
      which,    // same signature
      handler,  // function or object
      capture   // capture, will be casted as false by default
    ) {
      // if the listener type is exactly "DOMContentLoaded"
      if (which === type) {
        // since this has been fired already
        // it shold be invoked but asynchronously
        callLater(invoke, 0, handler);
        // no dispatching since usually developers do not clean up
        // once DOMContentLoaded has been fired
      } else {
        // in every other case just use the normal listener
        addEventListener.call(
          document,
          which,
          handler,
          !!capture
        );
      }
    };
  }

  // add the DOMContentLoaded regularly
  addEventListener.call(
    document,
    type,
    onDOMContentLoaded
  );

}(
  this.setImmediate || setTimeout,  // to invoke ASAP
  document,                         // the current document
  'addEventListener',               // minifier shortcut
  'DOMContentLoaded'                // minifier shortcut
));

// Closure Compiler Simple
// 288 bytes gzipped (415 bytes uncompressed)
// (function(g,a,h,e){function l(m,d){var b=a.createEvent("Event"),c=d||m;b.initEvent(e,!0,!0);b.currentTarget=b.target=a;try{"function"===typeof c?c.call(a,b):c.handleEvent(b)}catch(f){g(n,0,f)}}function n(a,d){throw d||a;}function k(){a.removeEventListener(e,k);a[h]=function d(b,c,f){b===e?g(l,0,c):d.call(a,b,c,!!f)}}a[h].call(a,e,k)})(this.setImmediate||setTimeout,document,"addEventListener","DOMContentLoaded");
// Content-Security-Policy
// script-src 'unsafe-inline' 'self' 'sha1-F8ev0YcF+TLPZ/rYA4WxeI63FZE=' 'sha256-MhC1XWjT8q/sjgjx3fs59g6+Xyn5ixV2XK04JV4GiJE='