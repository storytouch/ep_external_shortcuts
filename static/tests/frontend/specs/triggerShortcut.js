describe('ep_external_shortcuts - api - triggers shortcut', function() {
  var utils = ep_external_shortcuts_test_helper.utils;
  var apiUtils = ep_external_shortcuts_test_helper.apiUtils;

  before(function (done) {
    utils.createPad(this, function () {
      done();
    });
    this.timeout(60000);
  });

  context('when pad receives a shortcut from manager', function () {
    before(function () {
      utils.resetLastKeyEvent();
      const shortcut = { charCode: 90, ctrlKey: true };
      apiUtils.simulateCallToTriggerShortcut(shortcut);
    });

    it('triggers shortcut in pad', function (done) {
      helper.waitFor(function () {
        var lastKeyEvent = utils.getLastKeyEvent();
        return lastKeyEvent &&
               lastKeyEvent.charCode === 90 &&
               lastKeyEvent.ctrlKey === true;
      }).done(done);
    });
  });
});
