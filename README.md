# @sealsystems/mongo-notification

[![CircleCI](https://circleci.com/gh/sealsystems/seal-mongo-notification.svg?style=svg)](https://circleci.com/gh/sealsystems/seal-mongo-notification)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/y05s6mdfll6thx0f?svg=true)](https://ci.appveyor.com/project/Plossys/seal-mongo-notification)

An event emitter and receiver that uses MongoDB capped collections.

## Installation

```shell
$ npm install @sealsystems/mongo-notification
```

## Quick start

First you need to add a reference to @sealsystems/mongo-notification to your application.

```javascript
const mongoNotification = require('@sealsystems/mongo-notification');
```

Then connect to a MongoDB by calling the function `mongoNotification`. Provide an options object and returns a notification event emitter:

```javascript
const notification = await mongoNotification({
  url: 'mongodb://...',
  topic: 'messages',
  writeOnly: false
});
```

The options contain:
- `url` mandatory, a connection string,
- `topic` mandatory, the name of a topic collection
- `writeOnly` optional, the open mode, default: false

## Emit events

Call the `emit` function for actually emitting an event:

```javascript
notification.emit('foo', { foo: 'bar' });
```

Optionally you may specify a callback to get notified when the event has been persisted:

```javascript
notification.emit('foo', { foo: 'bar' }, (err) => {
  // ...
});
```

## Receive events

If you want to receive events send by your application use the `on` function:

```javascript
notification.on('foo', (payload) => {
  // ...
});
```

## Write only mode

If you only want to emit events but not receive any you can set the `writeOnly` option to `true` when connecting.

```javascript
const notification = await mongoNotification({
  ...
  writeOnly: true
});
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ bot
```
