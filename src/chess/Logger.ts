export enum LogType{
    NONE, INFO, WARN, ERROR, DEBUG
}

export default class Logger{
    static CURRENT_LOG_TYPE: LogType = LogType.NONE;

    static log(message: string, logType: LogType){
        if (logType >= this.CURRENT_LOG_TYPE){
            console.log(`${LogType[logType]}: ${message}`);
        }
    }
}