# ep_external_shortcuts
Etherpad plugin to observe shortcuts pressed on the editor, and to send a message to Etherpad content window (when used on iframe) whenever a shortcut is pressed


## Usage

To setup which combos should be observed:

```js
var message = {
  type: 'register_shortcuts',
  combos: ['command+s', 'ctrl+s'],
}
yourEtherpadIFrame.contentWindow.postMessage(message, '*');
```

This plugin uses [Mousetrap](https://craig.is/killing/mice) to observe key combos. Take a look on the [supported keys](https://craig.is/killing/mice#keys) and on the examples for more information about how to register your combos.

To handle whenever a registered combo is pressed:

```js
window.removeEventListener('message', function(e) {
  var type = e.data.type;
  var comboPressed = e.data.combo;
  if (type === 'shortcut_triggered') {
    // do something with your comboPressed
  }
});
```
