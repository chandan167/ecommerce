import moment from 'moment';

export class DateUtil {
  static addMinutes(minutes: number) {
    return moment().add(minutes, 'minute').unix();
  }

  static now() {
    return moment().unix();
  }
}
