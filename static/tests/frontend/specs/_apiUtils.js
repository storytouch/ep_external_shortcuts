var ep_external_shortcuts_test_helper = ep_external_shortcuts_test_helper || {};
ep_external_shortcuts_test_helper.apiUtils = {
  /**** messages sent to outside ****/
  SHORTCUT_TRIGGERED: 'shortcut_triggered',

  startListeningToApiEvents: function() {
    var self = this;
    this.resetApiData();

    var outboundApiEventsTarget = helper.padChrome$.window.parent;
    outboundApiEventsTarget.addEventListener('message', function(e) {
      if (e.data.type === self.SHORTCUT_TRIGGERED) {
        self.lastShortcutSent = e.data.combo;
      }
    });
  },

  resetApiData: function() {
    this.lastShortcutSent = undefined;
  },

  waitForShortcutToBeSent: function(done) {
    var self = this;
    helper.waitFor(function() {
      return self.getLastShortcutSent();
    }, 2000).done(done);
  },

  getLastShortcutSent: function() {
    return this.lastShortcutSent;
  },

  /**** messages coming from outside ****/
  REGISTER_SHORTCUTS: 'register_shortcuts',

  _simulateEventCall: function(message) {
    ep_script_touches_test_helper.apiUtils._simulateEventCall(message);
  },

  simulateCallToRegisterShortcuts: function(combos) {
    var message = {
      type: this.REGISTER_SHORTCUTS,
      combos: combos,
    };
    this._simulateEventCall(message);
  },
}
