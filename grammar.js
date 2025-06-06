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

    // If statements
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
        "body",
        "currentdate",
        "date",
        "environment",
        "mailbox",
        "mailboxexists",
        "regex",
        "spamtest",
        "virustest",
      ),

    _test_argument: ($) =>
      choice(
        $.tagged_argument_with_value,
        $.tagged_argument_no_value,
        $.string,
        $.string_list,
        $.number,
      ),

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
        "addflag",
        "removeflag",
        "setflag",
        "vacation",
        "notify",
        "denotify",
        "expire",
      ),

    _action_argument: ($) =>
      choice(
        $.tagged_argument_with_value,
        $.tagged_argument_no_value,
        $.string,
        $.string_list,
        $.number,
      ),

    // FIXED: Split tagged arguments into two types
    tagged_argument_with_value: ($) =>
      seq(
        ":",
        choice(
          // Tags that REQUIRE a value
          "comparator",
          "zone",
          "originalzone",
        ),
        $.string,
      ),

    tagged_argument_no_value: ($) =>
      seq(
        ":",
        choice(
          // Tags that DON'T take a value
          "is",
          "contains",
          "matches",
          "regex",
          "localpart",
          "domain",
          "all",
          "over",
          "under",
          "copy",
          "create",
          "flags",
          "importance",
          "mime",
          "anychild",
          "type",
          "subtype",
          "contenttype",
          "param",
          "count",
          "value",
          // Add custom identifier for extensibility
          $.identifier,
        ),
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
        optional(seq($.string, repeat(seq(",", $.string)), optional(","))),
        "]",
      ),

    number: ($) => /\d+[KMG]?/,

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_-]*/,
  },
});
