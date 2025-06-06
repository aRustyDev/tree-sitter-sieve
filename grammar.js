module.exports = grammar({
    name: "sieve",

    extras: ($) => [/\s/, $.comment],

    word: ($) => $.identifier,

    rules: {
        source_file: ($) => repeat($._statement),

        _statement: ($) =>
            choice(
                $.require_statement,
                $.if_statement,
                $.action_statement,
                $.comment,
            ),

        // Comments
        comment: ($) =>
            choice(seq("#", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),

        // Require statement
        require_statement: ($) =>
            seq("require", choice($.string, $.string_list), ";"),

        // If statement
        if_statement: ($) =>
            seq(
                "if",
                $.test,
                $.block,
                repeat($.elsif_clause),
                optional($.else_clause),
            ),

        elsif_clause: ($) => seq("elsif", $.test, $.block),

        else_clause: ($) => seq("else", $.block),

        // Blocks
        block: ($) => seq("{", repeat($._block_statement), "}"),

        _block_statement: ($) =>
            choice($.action_statement, $.if_statement, $.comment),

        // Tests
        test: ($) => choice($.test_command, $.boolean_test),

        boolean_test: ($) =>
            choice(
                seq("allof", "(", $.test_list, ")"),
                seq("anyof", "(", $.test_list, ")"),
                seq("not", $.test),
            ),

        test_list: ($) => seq($.test, repeat(seq(",", $.test)), optional(",")),

        test_command: ($) => seq($.test_name, repeat($._test_argument)),

        test_name: ($) =>
            choice(
                "address",
                "envelope",
                "exists",
                "false",
                "header",
                "size",
                "true",
                // Extensions
                "body",
                "currentdate",
                "date",
                "environment",
                "mailbox",
                "mailboxexists",
                "regex",
                "relational",
                "spamtest",
                "virustest",
            ),

        _test_argument: ($) =>
            choice($.tagged_argument, $.string, $.string_list, $.number),

        // Actions
        action_statement: ($) => seq($.action_command, ";"),

        action_command: ($) => seq($.action_name, repeat($._action_argument)),

        action_name: ($) =>
            choice(
                "discard",
                "fileinto",
                "keep",
                "redirect",
                "reject",
                "stop",
                // Extensions
                "addflag",
                "removeflag",
                "setflag",
                "vacation",
                "notify",
                "denotify",
                // Proton specific
                "expire",
            ),

        _action_argument: ($) =>
            choice($.tagged_argument, $.string, $.string_list, $.number),

        // Tagged arguments (e.g., :contains, :is, :matches)
        tagged_argument: ($) => seq(":", $.tag_name, optional($.string)),

        tag_name: ($) =>
            choice(
                // Match types
                "is",
                "contains",
                "matches",
                "regex",
                "count",
                "value",
                // Comparators
                "comparator",
                // Address parts
                "localpart",
                "domain",
                "all",
                // Size tags
                "over",
                "under",
                // Copy tag
                "copy",
                // Date/time tags
                "zone",
                "originalzone",
                // Proton extensions
                "create",
                "flags",
                "importance",
                // Other common tags
                "mime",
                "anychild",
                "type",
                "subtype",
                "contenttype",
                "param",
                $.identifier,
            ),

        // Literals
        string: ($) => choice($._quoted_string, $.multiline_string),

        _quoted_string: ($) =>
            seq(
                '"',
                repeat(choice(/[^"\\]/, seq("\\", choice('"', "\\", /./)))),
                '"',
            ),

        multiline_string: ($) =>
            seq(
                "text:",
                optional($.identifier),
                /\r?\n/,
                repeat(/[^\r\n]*\r?\n/),
                ".",
                /\r?\n/,
            ),

        string_list: ($) =>
            seq(
                "[",
                optional(
                    seq($.string, repeat(seq(",", $.string)), optional(",")),
                ),
                "]",
            ),

        number: ($) => /\d+[KMG]?/,

        identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_-]*/,
    },
});
