# get

Retrieve and pipe data from the web with this CLI.

Goals:
- Simple to use
- Small and maintanable code base
- Small and maintanable plugins to add new services
- Avoid unnecessary states and perform all operations asynchronously with lazy execution 

Example:

    $ get tickets from agilezen and order by id

- `get` is the name of the executable
- `agilezen` is the plugin
- `tickets` is an action on agilezen
- `order` by is a general action provided by get
- `id` is an attribute in the result
- `from` and `and` are unknown and therefore ignored

This project is not ready for use unless you intend to hack on it.

## License 

(The MIT License)

Copyright (c) 2012 Charlie Rudenstål &lt;charlie4@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.