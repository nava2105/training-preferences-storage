class TrainingPreferences {
  constructor(TrainingPreferencesDto) {
    this.user_id = TrainingPreferencesDto.user_id;
    this.days_per_week = TrainingPreferencesDto.days_per_week;
    this.hours_per_day = TrainingPreferencesDto.hours_per_day;
    this.availability_start_hour = TrainingPreferencesDto.availability_start_hour;
    this.availability_end_hour = TrainingPreferencesDto.availability_end_hour;
  }
}

module.exports = TrainingPreferences;