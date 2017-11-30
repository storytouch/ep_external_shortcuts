var $ = require('ep_etherpad-lite/static/js/rjquery').$;

var EDITOR_READY = 'editor_ready';
var REGISTER_SHORTCUTS = 'register_shortcuts';
var SHORTCUT_TRIGGERED = 'shortcut_triggered';

exports.postAceInit = function(hook, context) {
  _init();
}

var _init = function() {
  // listen to outbound calls of this API
  window.addEventListener('message', function(e) {
    if (e.data.type === REGISTER_SHORTCUTS) {
      _registerShortcuts(e.data.combos)
    }
  });

  // let external wrappers know we're ready to receive messages
  _triggerReadyEvent();
}

var SHORTCUT_TARGETS;
var _getShortcutTargets = function() {
  if (!SHORTCUT_TARGETS) {
    var onMainFrame = document;
    var onOuterFrame = $('iframe[name="ace_outer"]').get(0).contentDocument;
    var onInnerFrame = $('iframe[name="ace_outer"]').contents().find('iframe[name="ace_inner"]').get(0).contentDocument;
    SHORTCUT_TARGETS = [onMainFrame, onOuterFrame, onInnerFrame];
  }
  return SHORTCUT_TARGETS;
}

var _registerShortcuts = function(shortcuts) {
  var targets = _getShortcutTargets();
  for (var i = targets.length - 1; i >= 0; i--) {
    Mousetrap(targets[i]).bind(shortcuts, _triggerShortcutPressed);
  }
}

var _triggerReadyEvent = function() {
  var message = {
    type: EDITOR_READY,
  };
  _triggerEvent(message);
}

var _triggerShortcutPressed = function(e, combo) {
  var message = {
    type: SHORTCUT_TRIGGERED,
    combo: combo,
  };
  _triggerEvent(message);
}

var _triggerEvent = function _triggerEvent(message) {
  // if there's a wrapper to Etherpad, send data to it; otherwise use Etherpad own window
  var target = window.parent ? window.parent : window;
  target.postMessage(message, '*');
}
