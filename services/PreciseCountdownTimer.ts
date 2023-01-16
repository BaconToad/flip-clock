import moment, { Moment } from 'moment'

export default class PreciseCountdownTimer {

    stopTime: Date;
    msLeft: number;
    interval: number;
    callback: Function;
    timeout: NodeJS.Timeout;

    //TODO add final callback, that would be executed at timer reach zero 
    //TODO add error callback
    //TODO make timer pause/restart posible

    /**
     * @param time desired time interval to countdown
     * @param callback function to execute each tick of a timer
     * @param interval ms, how offten timer will execute callback function, 1000 ms by default
     */
    constructor(seconds: number, callback: Function, interval: number = 1000){
        this.interval = interval;
        this.callback = callback;
        this.stopTime = moment(new Date()).add(seconds, 's').toDate();
        this.msLeft = seconds * 1000;
    }

    /**
     * Starts the timer
     */
    start() : PreciseCountdownTimer{
        console.warn('strat');
        let now = moment();
        this.timeout = setTimeout(() => {
            this.step(now);
        }, this.interval);
        return this;
    }

    stop(){
        clearTimeout(this.timeout);
    }

    getSeconds(){
        return Math.floor(this.msLeft / 1000);
    }

    private step(lastExecDate: Moment){
        let stop = false;
        this.msLeft = this.msLeft - this.interval;
        let secondsLeft = this.msLeft / 1000;
        console.warn('Left:', secondsLeft)
        if (Math.floor(this.stopTime.valueOf() / 1000) != this.msLeft / 1000)
            console.warn('timer inconsistance')
        //exec callback fn
        //console.warn('TimeLeft: ', this.msLeft, secondsLeft);
        this.callback(secondsLeft);
        
        let nextStepDate = moment(lastExecDate).add(this.interval, 'ms');
        if (nextStepDate.toDate() > this.stopTime){
            //if it a last tick, limit next step time to stopTime
            nextStepDate = moment(this.stopTime);
            stop = true;
        }
        let now = moment();
        let diff = Math.abs((nextStepDate - now).valueOf());
        // console.log('diff: ', diff)
        //just in case, make sure that timeout would be grater or equal zero
        let nextTimeout = Math.max(this.interval - diff, 0);
        console.log('next timeout: ', nextTimeout, diff)

        this.timeout = setTimeout(() => {
            if (stop)
                this.callback(secondsLeft);
            else
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