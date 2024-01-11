Change data in `<textarea>` into 2 Dimension array

- `whitespace` or `comma` act to be separate `column`
  - no matters how many `whitespace` for separate `column` it will count just `one white space` or `one comma`
- `new line break` act to be separate `row`
  - no matters how many `new line break` for separate `rows` it will count just `one new line break`
- if each `row` start or end with `whitespace` it will `trim`
- cerversion is `text-based` and convert `number` are include, but if in same column is number and text `(NaN)` combined together it will considered to be `text`.


    E.g.

        1                  1  1
        2 2              2




        3               3b                     3

    or 

        1          1   1
        2 2 2
        3            3b       3 

    or

        1,,,,1,1,,,,
        2         , 2 ,,,,,       2
        3, 3b, 3

    result

        [
         [1, 1, 1]
         [2, 2, 2]
         [3, "3b", 3]
        ]
