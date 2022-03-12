//import { AccessToken } from 'livekit-server-sdk';
const {AccessToken} = require('livekit-server-sdk')
const express = require('express');
const http = require('http');
const { listen } = require('express/lib/application');

// const roomName = 'srp room';
// const participantIdentity = '1234';
// const participantName = 'Anant7';
// const expireTime = "1000";
const appID = 'APILdoF5BeTTyBZ';
const appCertificate = 'qPo0MfakALaaMtbtwr6NXlqOTCcU8LX3T4KJiWmsT2L';
const app2 = express();
const PORT = 5000;

const generateToken = function(req, resp) {
  const _participantIdentity = req.query.participantIdentity;
  const _participantName = req.query.participantName;
  const _expireTime = req.query.expireTime;
  const _roomCreate = req.query.roomCreate || false;
  const _roomJoin = req.query.roomJoin || true;
  const _roomAdmin = req.query.roomAdmin || false;
  const _roomName = req.query.roomName || 'LiveUS';
  const _userCanPublish = req.query.userCanPublish || false;
  const _userCanSubscribe = req.query.userCanSubscribe || false;
  const _canPublishData = req.query.userCanPublish || false;

  const at = new AccessToken(appID, appCertificate, {
    identity: _participantIdentity,
    name: _participantName,
    ttl: _expireTime,
  });

  at.addGrant({ roomCreate: _roomCreate,roomJoin: _roomJoin, roomAdmin: _roomAdmin, room: _roomName, 
    canPublish: _userCanPublish, canSubscribe: _userCanSubscribe, canPublishData: _canPublishData });

  const token = at.toJwt();
  console.log('access token', token);

  resp.header("Access-Control-Allow-Origin", "http://192.168.29.4:" + PORT)
  return resp.json({'token' : token}).send()
  
}

app2.get('/generateToken', generateToken);

http.createServer(app2),listen(app2.get('port'), function(){
  console.log('LiveUs Token Generate Server starts at' + app2.get('port'))
})

 app2.listen(PORT, () => {
      console.log(`Server is up and running on ${PORT} ...`);
 });

