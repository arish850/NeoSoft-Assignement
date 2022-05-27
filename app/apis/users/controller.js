const userModel = require("./models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../../config/config");



const register = async (req) => {
    try {
        // Get user input
        console.log(req.body)
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            return Promise.reject({ statusCode: 400, status: false, msg: "All input is required", data: {} });
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await userModel.findOne({ email });

        if (oldUser) {
            return Promise.reject({ statusCode: 400, status: false, msg: "User Already Exist. Please Login", data: {} });
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await userModel.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            config.jwt.Secret,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        return Promise.resolve({ statusCode: 200, status: true, msg: "User Created Successfully", data: token, });
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
};

const getAllUsers = async (query, req) => {
    try {

        let condition = {}

        if (!query.pageNo) query.pageNo = 1;
        if (!query.perPage) query.perPage = Number.MAX_SAFE_INTEGER;
        let pageNo = parseInt(query.pageNo)
        let perPage = parseInt(query.perPage)
        let totalSkips = (pageNo - 1) * perPage;
        let totalPages, prevPage, nextPage = 0;
        let sort = query.sort ? JSON.parse(query.sort) : { updatedAt: -1 };
        let limit = perPage > 0 ? perPage : -1;

        if (query.employeeName) condition.employeeName = { $regex: query.employeeName, $options: 'i' };
        if (query.last_name) condition.last_name = { $regex: query.last_name, $options: 'i' };
        if (query.email) condition.email = { $regex: query.email, $options: 'i' };

        let [docs, totalDocs] = await Promise.all([
            userModel.find(condition).select("-password").sort(sort).skip(totalSkips).limit(perPage).lean().exec(),
            userModel.count(condition) //finding docs count
        ]);

        totalPages = Math.ceil(totalDocs / perPage);
        prevPage = pageNo - 1;
        if (totalPages >= Number(pageNo) + 1)
            nextPage = Number(pageNo) + 1;

        if (docs.length) {
            // return Promise.resolve({ statusCode: 200, status: true, msg: ResponseMessages.user.getUsers, data: docs });
            return Promise.resolve({ statusCode: 200, status: true, msg: "Users Details", data: { data: docs, "total": totalDocs, "per_page": perPage, total_pages: totalPages, "current_page_no": pageNo, prev_page: prevPage, next_page: nextPage } });
        } else {
            return Promise.reject({ statusCode: 200, status: false, msg: "Failed To get Users Details", data: docs });
        }

    } catch (err) {
        console.log(err);
        return Promise.reject({ statusCode: 500, status: false, msg: ResponseMessages.internalServerError, err: err, data: {} });
    }
}

module.exports = {
    register,
    getAllUsers
}