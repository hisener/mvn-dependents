# Maven Dependents

Find modules that depend on your library.

## Motivation

It is painful to make a change on an internal library since anticipating
the impact of the change is not that easy always. So, having a list of
dependent modules/services might be useful.

## Prerequisites

* Maven
* Node.js 8+

## Usage

Firstly, generate a [dot file][0] formatted dependency tree using
`Maven Dependency Plugin`. Setting `appendOutput` parameter to `true` is
critical if you have multiple repositories.

For instance, you can use the following command to find dependencies with
`org.springframework` groupIds:

```bash
mvn dependency:tree -Dincludes="org.springframework:*" \
    -DoutputType=dot \
    -DappendOutput=true \
    -DoutputFile=/tmp/mvn-dependents-workspace/output.dot
```
> __PROTIP:__ Refer [dependency:tree][1] documentation.

> __PROTIP:__ You can change and use [create-dot-file.sh][2] if you have
multiple repositories.

Fill the `whitelist.json` file with your artifacts under `scripts/` folder
to eliminate unnecessary dependencies. In our case, let's add only
`spring-core` and `spring-context` because we do not care about other modules.

```json
[
  "spring-core",
  "spring-context"
]
```

Then, transform the dot file to a json file that can be rendered by user
interface using the following node script:

```bash
npm install # if you have not run before
node scripts/transfrom-dot-file-to-json
```

Finally, start the web application.

```bash
npm install # if you have not run before
npm start
```

> __PROTIP:__ Use `npm build` and serve static files under `build` folder using
> something like [http-server][3].

Then, open [http://localhost:3000/](http://localhost:3000/) to see dependents.

> __PROTIP:__ See [update-data.sh][4] to create an all-in-one script.

![Screenshot](screenshot.png)

## Credits

* [maven-dependency-plugin](https://github.com/apache/maven-dependency-plugin)
* [ant-design](https://github.com/ant-design/ant-design/) for the searchable tree component
* [react-debounce-input](https://github.com/nkbt/react-debounce-input) useful when working with a large data set
* [dotparser](https://github.com/anvaka/dotparser) a dot file parser for node.js

## License

[MIT. Copyright (C)](LICENSE) [Halil İbrahim Şener](http://halilsener.com).

[0]: https://en.wikipedia.org/wiki/DOT_(graph_description_language)
[1]: https://maven.apache.org/plugins/maven-dependency-plugin/tree-mojo.html
[2]: scripts/create-dot-file.sh
[3]: https://www.npmjs.com/package/http-server
[4]: scripts/update-data.sh
