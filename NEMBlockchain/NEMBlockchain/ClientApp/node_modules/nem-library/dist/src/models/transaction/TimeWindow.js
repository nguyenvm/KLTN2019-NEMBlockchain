"use strict";
/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 NEM
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const js_joda_1 = require("js-joda");
class TimeWindow {
    /**
     * @param deadline - LocalDateTime
     * @param timeStamp - LocalDateTime
     */
    constructor(timeStamp, deadline) {
        this.deadline = deadline;
        this.timeStamp = timeStamp;
    }
    /**
     * @param deadline
     * @param chronoUnit
     * @returns {TimeWindow}
     */
    static createWithDeadline(receiveTimeStamp, deadline = 2, chronoUnit = js_joda_1.ChronoUnit.HOURS) {
        const currentTimeStamp = (new Date()).getTime();
        let timeStampDateTime = js_joda_1.LocalDateTime.ofInstant(js_joda_1.Instant.ofEpochMilli(currentTimeStamp), js_joda_1.ZoneId.SYSTEM);

        var NEM_EPOCH = Date.UTC(2015, 2, 29, 0, 6, 25, 0);

        let receiveTimeStampToDate = new Date(receiveTimeStamp + NEM_EPOCH);
        timeStampDateTime._time._hour = receiveTimeStampToDate.getHours();
        timeStampDateTime._time._minute = receiveTimeStampToDate.getMinutes();
        timeStampDateTime._time._second = receiveTimeStampToDate.getSeconds();

        // timeStampDateTime._time._minute = new Date().getMinutes() - Number(process.env.REACT_APP_TIME_SYNC);

        const deadlineDateTime = timeStampDateTime.plus(deadline, chronoUnit);
        if (deadline <= 0) {
            throw new Error("deadline should be greater than 0");
        }
        else if (timeStampDateTime.plus(24, js_joda_1.ChronoUnit.HOURS).compareTo(deadlineDateTime) != 1) {
            throw new Error("deadline should be less than 24 hours");
        }
        return new TimeWindow(timeStampDateTime, deadlineDateTime);
    }
    /**
     * @internal
     * @param timestamp
     * @param deadline
     */
    static createFromDTOInfo(timeStamp, deadline) {
        return new TimeWindow(TimeWindow.createLocalDateTimeFromNemDate(timeStamp), TimeWindow.createLocalDateTimeFromNemDate(deadline));
    }
    /**
     * @internal
     * @param dateSeconds
     * @returns {LocalDateTime}
     */
    static createLocalDateTimeFromNemDate(dateSeconds) {
        return js_joda_1.LocalDateTime.ofInstant(js_joda_1.Instant.ofEpochMilli(1000 * Math.round(dateSeconds + TimeWindow.timestampNemesisBlock)), js_joda_1.ZoneId.SYSTEM);
    }
    /**
     * @internal
     */
    deadlineToDTO() {
        return this.deadline.atZone(js_joda_1.ZoneId.SYSTEM).toEpochSecond() - TimeWindow.timestampNemesisBlock;
    }
    /**
     * @internal
     */
    timeStampToDTO() {
        return this.timeStamp.atZone(js_joda_1.ZoneId.SYSTEM).toEpochSecond() - TimeWindow.timestampNemesisBlock;
    }
}
TimeWindow.timestampNemesisBlock = 1427587585;
exports.TimeWindow = TimeWindow;
//# sourceMappingURL=TimeWindow.js.map