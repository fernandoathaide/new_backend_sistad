var extension = 'js';
if (process.env.NODE_ENV == 'test')
    extension = 'ts';
module.exports = function () { return require("./" + process.env.NODE_ENV + ".env." + extension); };
//# sourceMappingURL=config.js.map