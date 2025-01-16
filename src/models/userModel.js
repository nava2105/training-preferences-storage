class User {
  constructor(userDTO) {
    this.user_id = userDTO.user_id;
    this.days_per_week = userDTO.days_per_week;
    this.hours_per_day = userDTO.hours_per_day;
    this.availability_start_hour = userDTO.availability_start_hour;
    this.availability_end_hour = userDTO.availability_end_hour;
  }
}

module.exports = User;