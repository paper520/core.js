var env = process.env;
var ADBLOCK = is(env.ADBLOCK);
var CI = is(env.CI);
var COLOR = is(env.npm_config_color);
var SILENT = !!~['silent', 'error', 'warn'].indexOf(env.npm_config_loglevel);

function is(it) {
    return !!it && it !== '0' && it !== 'false';
}

function log(it) {
    console.log(COLOR ? it : it.replace(/\u001B\[\d+m/g, ''));
}

if (!ADBLOCK && !CI && !SILENT) {
    log('\u001B[96m🙌  Thank you for using 🐠 @yelloxing/core.js (\u001B[94m https://github.com/yelloxing/core.js \u001B[96m) as the base JS Library!\u001B[0m\n');
    log('\u001B[96m🚨  Also, the author of 🐠 @yelloxing/core.js (\u001B[94m https://yelloxing.github.io/notebook/ \u001B[96m) is looking for a good time -)\u001B[0m\n');
}
