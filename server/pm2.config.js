module.exports = {
    apps: [
        {
            name: "tracey_shop",
            script: "npm",
            args: "run start",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
