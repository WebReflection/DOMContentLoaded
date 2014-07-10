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
  var originalAddEventListener = document[add];

  // ued to simulate dispatched event
  function invoke(dler, han) {
    // no need to go fancy with DOM events
    // specially because target and currentTarget
    // might not be addressable without a dispatch
    var
      e = {
        type: type,
        currentTarget: document,
        target: document
      },
      handler = han || dler
    ;
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
        originalAddEventListener.call(
          document,
          which,
          handler,
          !!capture
        );
      }
    };
  }

  // add the DOMContentLoaded regularly
  originalAddEventListener.call(
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