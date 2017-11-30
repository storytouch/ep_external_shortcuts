var ep_external_shortcuts_test_helper = ep_external_shortcuts_test_helper || {};
ep_external_shortcuts_test_helper.utils = {
  createPad: function(test, done) {
    test.timeout(60000);
    helper.newPad(function() {
      ep_external_shortcuts_test_helper.apiUtils.startListeningToApiEvents();
      done();
    });
  },

  pressKeyWithModifier: function(code, modifierKeys, targetWindow) {
    var inner$ = helper.padInner$;
    var browser = inner$(window)[0].bowser;
    var evtType = (browser.firefox || browser.modernIE) ? 'keypress' : 'keydown';

    var e = new Event(evtType);
    e.keyCode = code;
    e.which = code;
    this._pressModifierKeys(e, modifierKeys);

    targetWindow.dispatchEvent(e);
  },

  CTRL_KEY: 'CTRL',
  ALT_KEY: 'ALT',
  CMD_KEY: 'CMD',
  _pressModifierKeys: function(e, modifierKeys) {
    e.altKey = _.contains(modifierKeys, this.ALT_KEY);
    e.ctrlKey = _.contains(modifierKeys, this.CTRL_KEY);
    e.metaKey = _.contains(modifierKeys, this.CMD_KEY);
  },

}
