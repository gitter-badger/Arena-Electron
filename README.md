# Arena: Electron

[![build status](https://git.exceptionalvoid.com/ExceptionalVoid/Arena-Electron/badges/master/build.svg)](https://git.exceptionalvoid.com/ExceptionalVoid/Arena-Electron/commits/master)
[![coverage report](https://git.exceptionalvoid.com/ExceptionalVoid/Arena-Electron/badges/master/coverage.svg)](https://git.exceptionalvoid.com/ExceptionalVoid/Arena-Electron/commits/master)

A port of [Arena: A Game of Tanks](https://github.com/ExceptionalVoid/Arena), written in ES6 and built using GitHub's [Electron](https://electron.atom.io/)

## Getting Started

To download a development version of the project, simply checkout this repo or download the zipfile.

### Prerequisites

All that is required is [Node.js](https://nodejs.org/en/download/)

Development is currently done using `v8.1.3`

For Debian based Linux distros:

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Installing

Access the repo folder in a terminal and install the development packages

```bash
git clone https://github.com/ExceptionalVoid/Arena-Electron.git
cd Arena-Electron
npm install
```

If there are any errors, open an issue following the Issue section of the [Contribution Guide](CONTRIBUTING.md)

## Running the tests

To run unit tests, simply run

```bash
npm test
```

### Adding New Unit Tests

We use [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) to run our unit tests, and [Istanbul](https://github.com/gotwarlost/istanbul) to generate code coverage reports.

If you add a new class, add a file to the `tests` directory named `test_class`, where 'class' is replaced with the name of the class you wrote.

If you are instead editing an existing file, then add some new test cases to the test file for that class.

We use the `describe` method very heavily to group our tests by the value or set of functions being tested

If there are any methods that cannot be tested, i.e methods that handle drawing on the canvas, then we add `/* istanbul ignore next */` like so:
```
draw /* istanbul ignore next */ (context)
```

> The spaces between the function name, the comment, and the argument list are all necessary

## Contributing

Please read [Contribution Guide](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see our [tags](https://github.com/crnlPanic/Arena-Electron/tags).

## Authors

* **Ciaran Broderick** - *Creator of Arena: A Game of Tanks*

See also the list of [contributors](https://github.com/crnlPanic/Arena-Electron/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
