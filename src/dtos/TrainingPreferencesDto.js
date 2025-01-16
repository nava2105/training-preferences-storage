class TrainingPreferencesDto {
  constructor({ user_id, days_per_week, hours_per_day, availability_start_hour, availability_end_hour }) {
    this.user_id = user_id;
    this.days_per_week = days_per_week;
    this.hours_per_day = hours_per_day;
    this.availability_start_hour = availability_start_hour;
    this.availability_end_hour = availability_end_hour;
  }
}

module.exports = TrainingPreferencesDto;