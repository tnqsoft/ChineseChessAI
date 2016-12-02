#!/usr/bin/env node
"use strict";
var State_1 = require('../Strategy/State/State');
// import { Agent } from '../Strategy/Agent/Agent'
// import { GreedyAgent } from '../Strategy/Greedy/GreedyAgent'
// import { EvalFnAgent } from '../Strategy/EvalFn/EvaluationFn'
// import { Piece } from '../Objects/Piece'
var app = require('../server').app;
var debug = require('debug')('server:server');
var http = require('http');
var assert = require('assert');
var port = '3000';
app.set('port', port);
var server = http.createServer(app);
server.listen('3000');
server.on('listening', onListening);
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
// ******************* PARAM ******************* //
var N_MAX_MOVES = 200;
app.put('/compute/', function (request, response) {
    // console.log("-=-=-=-= Server: Compute get Request Received  -=-=-=-=-=-=-");
    var state = request.body;
    if (state.redAgent.pastMoves.length >= N_MAX_MOVES) {
        console.log("-=-=-=-=-= Draw -=-=-=-=-=-");
        response.end(JSON.stringify([]));
        return;
    }
    state = State_1.State.copyFromDict(state);
    var start = new Date().getTime();
    var next = state.nextMove();
    var now = new Date().getTime();
    console.log("Agent { ", state.get_playing_agent().strategy, "} Compute Move Using: ", (now - start), " ms");
    response.end(JSON.stringify(next));
});
//# sourceMappingURL=www.js.map