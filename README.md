# tree-sitter-sieve
Sieve grammar for tree-sitter

## Minimal Setup Process

- Create grammar.js with your Sieve rules
- Run: `npx tree-sitter generate` (creates `src/` files)
- Create minimal package.json
- Add basic highlights.scm
- Copy Node.js binding boilerplate from any tree-sitter grammar
- Test: `npx tree-sitter test`
- Build: `npx tree-sitter build` (creates Node module)

```
tree-sitter-sieve/
├── grammar.js                 # Main grammar definition
├── src/                       # Generated parser files (auto-generated)
│   ├── parser.c
│   ├── tree_sitter/
│   │   └── parser.h
│   └── node-types.json
├── bindings/                  # Language bindings
│   ├── node/                  # Node.js bindings
│   │   ├── index.js
│   │   └── binding.cc
│   ├── rust/                  # Rust bindings
│   │   ├── lib.rs
│   │   └── build.rs
│   └── python/                # Python bindings (optional)
│       └── tree_sitter_sieve/
├── queries/                   # Syntax highlighting queries
│   ├── highlights.scm         # Syntax highlighting
│   ├── injections.scm         # Language injections
│   ├── locals.scm             # Local scope definitions
│   ├── tags.scm               # Symbol tagging
│   └── textobjects.scm        # Text object definitions
├── test/                      # Test corpus
│   └── corpus/
│       ├── basic.txt          # Basic Sieve tests
│       ├── actions.txt        # Action tests
│       ├── conditionals.txt   # If/elsif/else tests
│       └── extensions.txt     # Extension tests
├── examples/                  # Example Sieve files
│   ├── simple.sieve
│   ├── proton.sieve
│   └── complex.sieve
├── package.json               # Node.js package config
├── binding.gyp                # Node.js native binding
├── Cargo.toml                 # Rust crate config
├── pyproject.toml            # Python package config (optional)
├── .github/                   # CI/CD workflows
│   └── workflows/
│       ├── ci.yml
│       └── release.yml
├── README.md
├── LICENSE
└── .gitignore
```
