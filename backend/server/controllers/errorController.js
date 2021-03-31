exports.get404 = (req, res, next) => {
        const error = new Error('not found');
        error.statusCode = 404;
        next(error)
    },
    exports.get500 = (err, req, res, next) => {
        const data = err.data;
        res.status(err.statusCode || 500);
        res.json({
            error: {
                msg: err.msg,
                data: data,
            },
        });
        console.log("ERROR 500");
        console.log(err.data);
    };