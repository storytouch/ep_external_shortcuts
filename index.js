exports.eejsBlock_scripts = function (hook_name, args, cb) {
  args.content += '<script src="../static/plugins/ep_external_shortcuts/static/js/lib/mousetrap.min.js"></script>';
  return cb();
}
