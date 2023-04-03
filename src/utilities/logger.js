const {createLogger, format, transports} = require ('winston');
const logConfig = require ('../data/config').logger;

/**
 * @description Custom logger
 * @param {string} [label]
 * @param {string} [filename] (optional)
 */
function Logger(label) {

    const _transports = [];
    _transports.push (new transports.Console ());
    if (process.env.LOG_FILEPATH) {
        _transports.push (new transports.File ({filename: `logs/${process.env.LOG_FILEPATH}`}));
    }

    const logger = createLogger ({
        level: logConfig?.logLevel || 'info',
        format: format.combine (
            format.label ({
                label
            }),
            format.timestamp ({format: 'DD-MM-YYYY HH:mm:ss'}),
            format.printf (({level, message, label, timestamp}) => {
                return `${timestamp} [${level}] ${label} -> ${message}`;
            })
        ),
        transports: _transports
    });

    const getMessage = (prefix, message) => `[${prefix}]: ${message}`;

    this.info = (label, message) => logger.info (getMessage (label, message));
    this.error = (label, message) => logger.error (getMessage (label, message));
    this.debug = (label, message) => logger.debug (getMessage (label, message));
    this.warn = (label, message) => logger.warn (getMessage (label, message));
}

module.exports.Logger = Logger;
