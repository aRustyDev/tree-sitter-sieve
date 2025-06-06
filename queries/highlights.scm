; Keywords and control flow
(require_statement "require" @keyword)
(if_statement "if" @conditional)
(elsif_clause "elsif" @conditional)
(else_clause "else" @conditional)

; Boolean operators
(boolean_test "allof" @operator)
(boolean_test "anyof" @operator)
(boolean_test "not" @operator)

; Test commands
(test_name) @function

; Action commands
(action_name) @function.builtin

; Tagged arguments - UPDATED for new grammar structure
(tagged_argument_with_value ":" @punctuation.delimiter)
(tagged_argument_no_value ":" @punctuation.delimiter)

; Tag names - UPDATED to capture the inline choices
(tagged_argument_with_value
  ":" @punctuation.delimiter
  [
    "comparator"
    "zone"
    "originalzone"
  ] @parameter)

(tagged_argument_no_value
  ":" @punctuation.delimiter
  [
    "is"
    "contains"
    "matches"
    "regex"
    "localpart"
    "domain"
    "all"
    "over"
    "under"
    "copy"
    "create"
    "flags"
    "importance"
    "mime"
    "anychild"
    "type"
    "subtype"
    "contenttype"
    "param"
    "count"
    "value"
    (identifier)
  ] @parameter)

; Strings
(string) @string
(multiline_string) @string

; Numbers
(number) @number

; Comments
(comment) @comment

; Punctuation
";" @punctuation.delimiter
"," @punctuation.delimiter
"(" @punctuation.bracket
")" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket

; Identifiers
(identifier) @variable
