const {createLogger, format, transports} = require ('winston');
const logConfig = require ('../data/config').logger;

/**
 * @description Custom logger
 * @param {string} label
 */
function Logger(label) {

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
        transports: [
            new transports.Console (),
            new transports.File ({filename: 'logs/combined.log'})
        ]
    });

    const getMessage = (label, message) => `[${label}]: ${message}`;

    this.info = (label, message) => logger.info (getMessage (label, message));
    this.error = (label, message) => logger.error (getMessage (label, message));
    this.debug = (label, message) => logger.debug (getMessage (label, message));
    this.warn = (label, message) => logger.warn (getMessage (label, message));
}

module.exports.Logger = Logger;
