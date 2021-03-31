/*
Navicat MySQL Data Transfer

Source Server         : node-server
Source Server Version : 80012
Source Host           : localhost:3306
Source Database       : hc_users

Target Server Type    : MYSQL
Target Server Version : 80012
File Encoding         : 65001

Date: 2021-03-31 17:33:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for hc_users
-- ----------------------------
DROP TABLE IF EXISTS `hc_users`;
CREATE TABLE `hc_users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` varchar(40) NOT NULL DEFAULT '1',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of hc_users
-- ----------------------------
INSERT INTO `hc_users` VALUES ('1', 'hc', '123456', '1', null);
INSERT INTO `hc_users` VALUES ('2', 'hcc', '123456', '1', null);
INSERT INTO `hc_users` VALUES ('3', 'hhh', '123456', '1', null);
INSERT INTO `hc_users` VALUES ('4', 'hc1dsadsad', '123213', '1', null);
INSERT INTO `hc_users` VALUES ('5', 'hc1dsadsad2', '123213', '1', null);
INSERT INTO `hc_users` VALUES ('6', 'hc1dsadsad23', '123213', '1', null);
INSERT INTO `hc_users` VALUES ('7', 'hancha321', '8ad3fac6c6b3528499d347d924443abb', '1', null);
INSERT INTO `hc_users` VALUES ('8', 'hancha3212', 'jy4PXywccGaHgFj6dItGCA==', '1', null);
INSERT INTO `hc_users` VALUES ('9', 'hancha32121', '8ad3fac6c6b3528499d347d924443abb', '1', '2021-02-19 16:39:17');
INSERT INTO `hc_users` VALUES ('10', 'hanchaf1', '8ad3fac6c6b3528499d347d924443abb', '1', '2021-02-18 16:39:00');
INSERT INTO `hc_users` VALUES ('11', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '1', '2021-02-19 14:16:00');
