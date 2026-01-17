export const habitQueries = {
  createHabit: "SELECT * FROM create_habit($1,$2,$3,$4);",
  completeHabit: "SELECT complete_habit($1);",
  deleteHabit: "SELECT delete_habit($1,$2);",
  getHabitById: "SELECT * FROM get_habit_by_id($1,$2);",
  updateHabit: "SELECT * FROM update_habit($1,$2,$3,$4,$5,$6);",
};
