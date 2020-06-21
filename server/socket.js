const ioMaps = {};

module.exports = function(http) {
  const io = require('socket.io')(http);

  return {
    getChannel(channel) {
      if (!(channel in ioMaps)) {
        console.info(`create socket channel: ${channel}`)
        ioMaps[channel] = io.of(channel);
      }
    
      return ioMaps[channel];
    }
  }
}