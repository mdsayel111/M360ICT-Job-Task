"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// HOF for send response
const sendResponse = (res, data) => {
    res.status(200).send(data);
};
exports.default = sendResponse;
