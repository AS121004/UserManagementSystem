const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


//View Users
exports.view = (req, res) => {
    // res.render('home');


    //Connect to Db
    pool.getConnection((err, connection) => {
        if (err) throw err; //no connection 
        console.log(`Connected as ID ${connection.threadId}`)


        //User connection
        connection.query('SELECT * FROM user', (err, rows) => {
            //When done with connection , release it
            connection.release();

            if (!err) {
                res.render('home', { rows });
            }
            else {
                console.log(err);
            }

            console.log('Data from user table: \n', rows)


        });
    });
};

//find user by search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //no connection 
        console.log(`Connected as ID ${connection.threadId}`)

        let searchTerm = req.body.search;



        //User connection
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            //When done with connection , release it
            connection.release();

            if (!err) {
                res.render('home', { rows });
            }
            else {
                console.log(err);
            }

            console.log('Data from user table: \n', rows)


        });
    });
};

//Add new user

exports.form = (req, res) => {
    res.render('adduser');
}

exports.create = (req, res) => {
    // res.render('adduser');

    const { first_name, last_name, phone, email, comments } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; //no connection 
        console.log(`Connected as ID ${connection.threadId}`)

        // let searchTerm = req.body.search;



        //User connection
        connection.query('INSERT INTO user SET first_name = ? , last_name = ? , phone = ? , email = ? , comments = ?', [first_name, last_name, phone, email, comments], (err, rows) => {
            //When done with connection , release it
            connection.release();

            if (!err) {
                res.render('adduser', { alert: 'User added successfully.' });
            }
            else {
                console.log(err);
            }

            console.log('Data from user table: \n', rows)


        });
    });
}

exports.edit = (req, res) => {
    // res.render('edituser');

    pool.getConnection((err, connection) => {
        if (err) throw err; //no connection 
        console.log(`Connected as ID ${connection.threadId}`)


        //User connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //When done with connection , release it
            connection.release();

            if (!err) {
                res.render('edituser', { rows });
            }
            else {
                console.log(err);
            }

            console.log('Data from user table: \n', rows)


        });
    });
}


exports.update = (req, res) => {
    // res.render('edituser');
    const { first_name, last_name, phone, email, comments } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; //no connection 
        console.log(`Connected as ID ${connection.threadId}`)


        //User connection
        connection.query('UPDATE user SET first_name = ? , last_name = ? , phone = ? , email = ? , comments = ? WHERE id = ?', [first_name, last_name, phone, email, comments, req.params.id], (err, rows) => {
            //When done with connection , release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //no connection 
                    console.log(`Connected as ID ${connection.threadId}`)


                    //User connection
                    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
                        //When done with connection , release it
                        connection.release();

                        if (!err) {
                            res.render('edituser', { rows, alert: `${first_name} has been updated.` });
                        }
                        else {
                            console.log(err);
                        }

                        console.log('Data from user table: \n', rows)


                    });
                });


            }
            else {
                console.log(err);
            }

            console.log('Data from user table: \n', rows)


        });
    });
}


exports.delete = (req, res) => {
    // res.render('edituser');

    pool.getConnection((err, connection) => {
        if (err) throw err; //no connection 
        console.log(`Connected as ID ${connection.threadId}`)


        //User connection
        connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //When done with connection , release it
            connection.release();

            if (!err) {
                // res.render('home', { rows });
                res.redirect('/');
            }
            else {
                console.log(err);
            }

            console.log('Data from user table: \n', rows)


        });
    });

    // pool.getConnection((err, connection) => {
    //     if (err) throw err
    //     connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    //         if (!err) {
    //             // let removedUser = encodeURIComponent('User successeflly removed.');
    //             // res.redirect('/?removed=' + removedUser);
    //             res.redirect('/');
    //         } else {
    //             console.log(err);
    //         }
    //         console.log('The data from beer table are: \n', rows);
    //     });
    // });
};


exports.viewall = (req, res) => {
    // res.render('home');


    //Connect to Db
    pool.getConnection((err, connection) => {
        if (err) throw err; //no connection 
        console.log(`Connected as ID ${connection.threadId}`)


        //User connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //When done with connection , release it
            connection.release();

            if (!err) {
                res.render('viewuser', { rows });
            }
            else {
                console.log(err);
            }

            console.log('Data from user table: \n', rows)


        });
    });
};
