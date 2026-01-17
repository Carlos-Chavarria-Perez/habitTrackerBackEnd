export const userQueries = {
    createUser: "SELECT * FROM create_user($1,$2)",

    getUserByUsername:"select user_id,username,password,active from t_users where username=$1",

    getProfile: "SELECT * FROM get_user_profile($1)"


};
