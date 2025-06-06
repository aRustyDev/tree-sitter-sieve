try {
    module.exports = require("../../build/Release/tree_sitter_sieve_binding");
} catch (error1) {
    try {
        module.exports = require("../../build/Debug/tree_sitter_sieve_binding");
    } catch (error2) {
        throw error1;
    }
}
