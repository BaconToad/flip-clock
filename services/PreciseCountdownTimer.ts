import moment from 'moment'

export default class PreciseCountdownTimer {

    stopTime: Date;
    interval: number;
    callback: Function;
    timeout: NodeJS.Timeout;

    //TODO add final callback, that would be executed at timer reach zero 
    //TODO add error callback
    //TODO make timer pause/restart posible

    /**
     * @param time desired time interval to countown
     * @param callback function to execute each tick of a timer
     * @param interval ms, how offten timer will execute callback function, 1000 ms by default
     */
    constructor(time: TimeSpan, callback: Function, interval: number = 1000){
        this.interval = interval;
        this.callback = callback;
        this.stopTime = moment(new Date()).add(time.minutes, 'm').add(time.seconds, 's').toDate();
    }

    /**
     * Starts the timer
     */
    start(){
        let now = new Date();
        this.timeout = setTimeout(() => {
            this.step(now);
        }, this.interval);
    }

    stop() {
        clearTimeout(this.timeout);
    }

    private step(lastExecDate: Date){
        let now = new Date();

        //exec callback fn
        this.callback();

        let nextStepDate = moment(lastExecDate).add(this.interval, 'ms');
        if (nextStepDate.toDate() > this.stopTime){
            //if it a last tick, limit next step time to stopTime
            nextStepDate = moment(this.stopTime);
        }

        let diff = nextStepDate.subtract(now.getDate()).milliseconds();
        //just in case, make sure that timeout would be grater or equal zero
        let nextTimeout = Math.max(this.interval - diff, 0);

        this.timeout = setTimeout(() => {
            this.step(now);
        }, nextTimeout);
    }
}

export class TimeSpan {

    minutes: number;
    seconds: number;

    constructor(minutes: number, seconds: number){
        this.minutes = minutes;
        this.seconds = seconds;
    }
}