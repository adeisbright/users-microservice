import cron from "cron";

const { CronJob } = cron;

/**
 *
 * @param {Function} cb task to run . This should be a function that
 * does something
 * @param {String}} interval duration to run the task
 * @param {String} timezone
 */

const job = (
    cb,
    interval = "* * * * * *",
    timezone = "America/Los_Angeles"
) => {
    new CronJob(interval, cb, null, true, timezone);
};

export default job;
