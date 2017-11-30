describe('ep_external_shortcuts - api - listen to registered key shortcuts', function() {
  var utils = ep_external_shortcuts_test_helper.utils;
  var apiUtils = ep_external_shortcuts_test_helper.apiUtils;

  var SHORTCUT_COMBO = 'alt+1';
  var SHORTCUTS = [SHORTCUT_COMBO];
  var pressShortcutOn = function(targetWindow) {
    utils.pressKeyWithModifier('1'.charCodeAt(0), [utils.ALT_KEY], targetWindow);
  }

  var testItListensToShortcutOn = function(targetName, getTargetWindow) {
    context('when focus is on ' + targetName, function() {
      before(function() {
        apiUtils.resetApiData();
        var targetWindow = getTargetWindow();
        pressShortcutOn(targetWindow);
      });

      it('sends an API message with the pressed shortcut combo', function(done) {
        apiUtils.waitForShortcutToBeSent(function() {
          var shortcutCombo = apiUtils.getLastShortcutSent();
          expect(shortcutCombo).to.be(SHORTCUT_COMBO);
          done();
        });
      });
    });
  }

  before(function(done) {
    utils.createPad(this, function() {
      apiUtils.simulateCallToRegisterShortcuts(SHORTCUTS);
      done();
    });
    this.timeout(60000);
  });

  testItListensToShortcutOn('padChrome', function() { return helper.padChrome$.document });
  testItListensToShortcutOn('padOuter' , function() { return helper.padOuter$.document });
  testItListensToShortcutOn('padInner' , function() { return helper.padInner$.document });
});
