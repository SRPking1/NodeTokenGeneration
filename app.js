//import { AccessToken } from 'livekit-server-sdk';
const {AccessToken} = require('livekit-server-sdk')
const express = require('express');

const roomName = 'srp room';
const participantIdentity = 'Bang On';
const participantName = 'srp';

const app2 = express();

const at = new AccessToken('APILdoF5BeTTyBZ', 'qPo0MfakALaaMtbtwr6NXlqOTCcU8LX3T4KJiWmsT2L', {
  identity: participantIdentity,
  name: participantName,
});
at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
const token = at.toJwt();
console.log('access token', token);
app2.use("/",function(req,res)
{
  res.send(`<html><body><h1>${token}</h1></body></html>`)
});

let PORT = process.env.PORT || 5000;
// app2.listen(PORT, () => {
//   console.log(`Server is up and running on ${PORT} ...`);
// });

