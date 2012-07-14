# piccanin

content distributer and tracked for use in PPC

## Getting Started
Install the module with: `make init`

```javascript
var piccanin = require('piccanin');
piccanin.begin();
```

## Documentation
### Overview
#### Introduction
#### Messaging
Piccanin uses Hook.io for interprocess/node/cluster communications, messages are published to a common bus under the namespace piccanin and the intended endpoint followed by an optional priority weight and options. Message ID's look like this piccanin::logger [message] [weight] []

By default the message bus runs in memory with a tcp interface as fallback running on: tcp://127.0.0.1:7878

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Ryan Dick  
Licensed under the MIT license.
