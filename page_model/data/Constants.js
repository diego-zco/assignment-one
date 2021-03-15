import dotenv from 'dotenv'
dotenv.config()

export const CREDENTIALS = {
    VALID_USER: {
        USERNAME: process.env.VALID_USERNAME,
        PASSWORD: process.env.GENERIC_PASSWORD
    },
    INVALID_USER: {
        USERNAME: "INVALID_USER",
        PASSWORD: "invalid_password"
    },
    LOCKED_USER: {
        USERNAME: process.env.LOCKED_USERNAME,
        PASSWORD: process.env.GENERIC_PASSWORD
    },
    PROBLEM_USER: {
        USERNAME: process.env.PROBLEM_USERNAME,
        PASSWORD: process.env.GENERIC_PASSWORD
    },
    PERFOMANCE_GLITCH_USER: {
        USERNAME: process.env.PERFORMANCE_GLITCH_USERNAME,
        PASSWORD: process.env.GENERIC_PASSWORD
    }
}

export const USER = {
    USER_ONE: {
        FIRSTNAME: "Test",
        LASTNAME: "User",
        POSTAL_CODE: "34567"
    }
}