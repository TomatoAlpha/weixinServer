var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var token = '5607578eb4521a402dd5ad76';

// 主路由：控制所有路由的进出
router.all('*', function(req, res, next) {
  next();
});

// 用来与
router.get('/', function(req, res, next) {
  try {
    var ticket = [req.query['timestamp'], token, req.query['nonce']].sort().join('');
    ticket = crypto.createHash('sha1').update(ticket).digest('hex');
    if (ticket == req.query['signature']) {
      res.send(req.query['echostr']);
    } else {
      res.send('failed');
    }
  } catch (e) {
    console.log(e);
  }
});

/**
 *  分路由：处理所有分路径的业务
 **/
// router.use('/account', require('../rest/AccountRest'));
// router.use('/industry', require('../rest/IndustryRest'));
// router.use('/orgnization', require('../rest/OrgnizationRest'));
// router.use('/paper', require('../rest/PaperRest'));
// router.use('/client', require('../rest/ClientRest'));

module.exports = router;
